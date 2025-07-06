export const getWeatherStyles = (condition) => {
    const styles = {
        Sunny: {
            background: 'bg-gradient-to-br from-yellow-400 to-orange-500',
            text: 'text-white',
            card: 'bg-white/20 backdrop-blur-md',
            icon: '☀️'
        },
        Cloudy: {
            background: 'bg-gradient-to-br from-gray-400 to-blue-300',
            text: 'text-white',
            card: 'bg-white/20 backdrop-blur-md',
            icon: '☁️'
        },
        Rainy: {
            background: 'bg-gradient-to-br from-blue-600 to-blue-900',
            text: 'text-white',
            card: 'bg-white/20 backdrop-blur-md',
            icon: '🌧️'
        },
        Clear: {
            background: 'bg-gradient-to-br from-blue-400 to-indigo-500',
            text: 'text-white',
            card: 'bg-white/20 backdrop-blur-md',
            icon: '✨'
        },
        default: {
            background: 'bg-gradient-to-br from-blue-500 to-purple-600',
            text: 'text-white',
            card: 'bg-white/20 backdrop-blur-md',
            icon: '🌤️'
        }
    }

    return styles[condition] || styles.default
}