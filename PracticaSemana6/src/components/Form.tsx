import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Form() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "El nombre es obligatorio";
    if (!form.email.trim()) errs.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Email no válido";
    if (!form.phone.trim()) errs.phone = "El teléfono es obligatorio";
    else if (!/^\d{7,15}$/.test(form.phone))
      errs.phone = "Teléfono debe tener entre 7 y 15 dígitos";
    if (!form.message.trim()) errs.message = "El mensaje es obligatorio";
    else if (form.message.trim().length < 10)
      errs.message = "El mensaje debe tener al menos 10 caracteres";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>¡Formulario enviado con éxito!</h2>
          <div className="success-data">
            <p><strong>Nombre:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Teléfono:</strong> {form.phone}</p>
            <p><strong>Mensaje:</strong> {form.message}</p>
          </div>
          <button className="btn btn-primary" onClick={handleReset}>
            Enviar otro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page form-page">
      <h1>Formulario de Contacto</h1>
      <p className="page-desc">
        Complete todos los campos para enviar su consulta.
      </p>

      <form className="professional-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Nombre completo</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Juan Pérez"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="juan@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="123456789"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="field-error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Escriba su mensaje aquí (mín. 10 caracteres)"
            value={form.message}
            onChange={handleChange}
            className={errors.message ? "input-error" : ""}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
}
