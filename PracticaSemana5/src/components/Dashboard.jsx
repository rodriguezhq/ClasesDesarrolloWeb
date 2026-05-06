import MetricCard from "./MetricCard"


export default function Dashboard({ children }) {
    // Datos estructurados - Props pasadas a MetricCard
    const metrics = [
        {
            id: 1,
            title: 'Total Users',
            value: '12,543',
            icon: '👥',
            trend: 12.5,
            color: 'blue'
        },
        {
            id: 2,
            title: 'Revenue',
            value: '$45,230',
            icon: '💰',
            trend: 8.2,
            color: 'green'
        },
        {
            id: 3,
            title: 'Orders',
            value: '2,834',
            icon: '📦',
            trend: -2.4,
            color: 'purple'
        },
        {
            id: 4,
            title: 'Growth',
            value: '+24.5%',
            icon: '📈',
            trend: 15.3,
            color: 'orange'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">📊 Dashboard Analytics</h1>
                            <p className="text-slate-400 text-lg">Bienvenido a tu panel de control</p>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-400 text-sm">
                                {new Date().toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Metrics Grid */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-full"></span>
                        Métricas Principales
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {metrics.map(metric => (
                            <MetricCard
                                key={metric.id}
                                title={metric.title}
                                value={metric.value}
                                icon={metric.icon}
                                trend={metric.trend}
                                color={metric.color}
                            />
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 my-12"></div>

                {/* Children Content - Contenido Anidado */}
                {children && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="w-1 h-8 bg-gradient-to-b from-green-400 to-emerald-600 rounded-full"></span>
                            Información Adicional
                        </h2>
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-xl p-8 shadow-xl">
                            {children}
                        </div>
                    </div>
                )}

                {/* Footer Stats */}
                <div className="mt-16 pt-12 border-t border-slate-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800/80 transition-all">
                            <p className="text-slate-400 text-sm mb-2">Última actualización</p>
                            <p className="text-white text-lg font-semibold">
                                {new Date().toLocaleTimeString('es-ES')}
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800/80 transition-all">
                            <p className="text-slate-400 text-sm mb-2">Estado del Sistema</p>
                            <p className="text-green-400 text-lg font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                En línea
                            </p>
                        </div>
                        <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 hover:bg-slate-800/80 transition-all">
                            <p className="text-slate-400 text-sm mb-2">Versión</p>
                            <p className="text-white text-lg font-semibold">v1.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}