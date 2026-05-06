import { useState } from 'react'
import Dashboard from './components/Dashboard'

function App() {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <>
      <Dashboard>
        {/* Contenido anidado dentro del Dashboard - Ejemplo de children */}
        <div className="space-y-6">
          {/* Tabs de navegación */}
          <div className="flex gap-4 border-b border-slate-600">
            <button
              onClick={() => setActiveSection('overview')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeSection === 'overview'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 Resumen
            </button>
            <button
              onClick={() => setActiveSection('details')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeSection === 'details'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🔍 Detalles
            </button>
            <button
              onClick={() => setActiveSection('reports')}
              className={`pb-3 px-4 font-semibold transition-all ${
                activeSection === 'reports'
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Reportes
            </button>
          </div>

          {/* Contenido dinámico según la sección activa */}
          {activeSection === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Resumen General</h3>
              <p className="text-slate-300 leading-relaxed">
                Este es un ejemplo de contenido anidado (children) dentro del componente Dashboard.
                Demostramos cómo usar el patrón de props y children para crear componentes flexibles.
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-slate-300 text-sm">
                  ✨ El Dashboard orquesta múltiples MetricCards y renderiza contenido personalizado.
                </p>
              </div>
            </div>
          )}

          {activeSection === 'details' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Detalles del Sistema</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Patrón de Props: Datos estructurados pasados a MetricCard
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Patrón de Children: Contenido flexible anidado en Dashboard
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Componentes Reutilizables: MetricCard con múltiples variantes
                </li>
              </ul>
            </div>
          )}

          {activeSection === 'reports' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Reportes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Métrica A</p>
                  <p className="text-white text-2xl font-bold">95.2%</p>
                </div>
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-400 text-sm mb-2">Métrica B</p>
                  <p className="text-white text-2xl font-bold">87.5%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Dashboard>
    </>
  )
}

export default App
