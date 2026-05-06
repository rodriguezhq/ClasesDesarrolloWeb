
export default function MetricCard({ title, value, icon, trend = null, color = 'blue' }) {
    // Colores disponibles para las tarjetas
    const colorClasses = {
        blue: 'from-blue-50 to-blue-100 border-blue-200',
        green: 'from-green-50 to-green-100 border-green-200',
        purple: 'from-purple-50 to-purple-100 border-purple-200',
        orange: 'from-orange-50 to-orange-100 border-orange-200',
        red: 'from-red-50 to-red-100 border-red-200',
        indigo: 'from-indigo-50 to-indigo-100 border-indigo-200'
    }

    const trendColor = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600'

    return (
        <div className={`metric-card bg-gradient-to-br ${colorClasses[color]} border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6`}>
            {/* Header con ícono y tendencia */}
            <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{icon}</div>
                {trend !== null && (
                    <span className={`text-sm font-semibold ${trendColor}`}>
                        {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend)}%
                    </span>
                )}
            </div>

            {/* Contenido principal */}
            <div className="space-y-1">
                <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            </div>

            {/* Línea decorativa */}
            <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
        </div>
    )
}