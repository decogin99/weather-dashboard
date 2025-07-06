import { getWeatherStyles } from '../utils/weatherStyles'

const WeatherCard = ({ weatherData, loading, error }) => {
    const styles = getWeatherStyles(weatherData?.weather?.[0]?.main || 'Clear')

    if (loading) {
        return (
            <div className="animate-pulse bg-white/20 backdrop-blur-md rounded-3xl p-8 text-center text-white">
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Loading weather data...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-500/20 backdrop-blur-md rounded-3xl p-8 text-center text-white shadow-lg">
                <span className="text-4xl mb-4 block">⚠️</span>
                <p className="text-lg">{error}</p>
            </div>
        )
    }

    if (!weatherData) return null

    return (
        <div className={`rounded-3xl ${styles.card} shadow-xl hover:shadow-2xl transition-all duration-300`}>
            {/* Location and Time Section */}
            <div className="p-5 border-b border-white/10">
                <h2 className={`text-3xl font-medium ${styles.text} opacity-90 flex items-center justify-center gap-2`}>
                    <span>📍</span>
                    {weatherData.name}, {weatherData.sys.country}
                </h2>
            </div>

            {/* Main Weather Section */}
            <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-6 mb-4">
                    <span className="text-7xl">{styles.icon}</span>
                    <div>
                        <h1 className={`text-6xl font-bold ${styles.text} mb-2`}>
                            {Math.round(weatherData.main.temp)}°
                        </h1>
                        <p className={`text-3xl ${styles.text} font-light`}>
                            {weatherData.weather[0].main}
                        </p>
                    </div>
                </div>

                <div className={`text-lg ${styles.text} opacity-80 mb-6`}>
                    <p>Feels like {Math.round(weatherData.main.feels_like)}°</p>
                    <p>{weatherData.weather[0].description}</p>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <DetailCard
                        icon="💧"
                        label="Humidity"
                        value={`${weatherData.main.humidity}%`}
                        styles={styles}
                    />
                    <DetailCard
                        icon="🌪️"
                        label="Wind Speed"
                        value={`${Math.round(weatherData.wind.speed)} m/s`}
                        styles={styles}
                    />
                    <DetailCard
                        icon="🌡️"
                        label="Max Temp"
                        value={`${Math.round(weatherData.main.temp_max)}°`}
                        styles={styles}
                    />
                    <DetailCard
                        icon="🌡️"
                        label="Min Temp"
                        value={`${Math.round(weatherData.main.temp_min)}°`}
                        styles={styles}
                    />
                    <DetailCard
                        icon="🌅"
                        label="Sunrise"
                        value={new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        styles={styles}
                    />
                    <DetailCard
                        icon="🌇"
                        label="Sunset"
                        value={new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        styles={styles}
                    />
                </div>
            </div>
        </div>
    )
}

const DetailCard = ({ icon, label, value, styles }) => (
    <div className="bg-white/10 rounded-xl p-3 text-center">
        <span className="text-2xl mb-1 block">{icon}</span>
        <span className={`block ${styles.text} opacity-75 text-sm mb-1`}>{label}</span>
        <span className={`text-lg font-semibold ${styles.text}`}>{value}</span>
    </div>
)

export default WeatherCard