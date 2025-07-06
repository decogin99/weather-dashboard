const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchWeatherByCoords = async (lat, lon) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        )
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.')
            }
            throw new Error(`Weather API Error: ${response.status}`)
        }
        const data = await response.json()
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'Error fetching weather data')
        }
        return data
    } catch (error) {
        if (!navigator.onLine) {
            throw new Error('No internet connection. Please check your network.')
        }
        console.error('Error fetching weather:', error)
        throw new Error(error.message || 'Unable to fetch weather data. Please try again later.')
    }
}

export const fetchWeatherByCity = async (city) => {
    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.')
            }
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.')
            }
            throw new Error(`Weather API Error: ${response.status}`)
        }
        const data = await response.json()
        if (data.cod && data.cod !== 200) {
            throw new Error(data.message || 'Error fetching weather data')
        }
        return data
    } catch (error) {
        if (!navigator.onLine) {
            throw new Error('No internet connection. Please check your network.')
        }
        console.error('Error fetching weather:', error)
        throw new Error(error.message || 'Unable to fetch weather data. Please try again later.')
    }
}