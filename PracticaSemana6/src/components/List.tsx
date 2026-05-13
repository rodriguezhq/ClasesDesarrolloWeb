import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../services/api";

type Status = "loading" | "error" | "success";

export default function List() {
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setStatus("loading");
        const response = await getProducts(8);
        setData(response.products);
        setStatus("success");
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "CanceledError") {
          setError("Error al cargar los productos. Intenta de nuevo más tarde.");
          setStatus("error");
        }
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, []);

  if (status === "loading") {
    return (
      <div className="page">
        <div className="loading-container">
          <div className="spinner" />
          <p>Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="page">
        <div className="error-container">
          <span className="error-icon">⚠️</span>
          <p className="error-msg">{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page list-page">
      <h1>Productos</h1>
      <p className="page-desc">{data.length} productos cargados desde la API</p>
      <div className="product-grid">
        {data.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-img"
            />
            <div className="product-body">
              <span className="product-category">{product.category}</span>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-desc">{product.description.slice(0, 80)}...</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
