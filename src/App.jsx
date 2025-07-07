import { useState, useEffect } from 'react'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import Clock from './components/Clock'
import { fetchWeatherByCoords, fetchWeatherByCity } from './services/weatherService'
import { getWeatherStyles } from './utils/weatherStyles'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const data = await fetchWeatherByCoords(
              position.coords.latitude,
              position.coords.longitude
            )
            setWeatherData(data)
            setError(null)
          } catch (err) {
            setError(err.message)
            setWeatherData(null)
          } finally {
            setLoading(false)
          }
        },
        (err) => {
          setError(err || 'Please enable location access to see your local weather')
          setLoading(false)
        },
        { timeout: 10000 } // Add timeout for geolocation
      )
    } else {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
    }
  }, [])

  const handleCitySearch = async (city) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchWeatherByCity(city)
      setWeatherData(data)
    } catch (err) {
      setError(err.message)
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const styles = getWeatherStyles(weatherData?.weather?.[0]?.main || 'Clear')

  return (
    <div className={`fixed inset-0 flex flex-col ${styles.background} transition-colors duration-500`}>
      <div className=" overflow-y-auto">
        <div className='max-w-md mx-auto w-full min-h-screen py-6 px-5'>
          <h1 className={`text-3xl font-bold text-center ${styles.text} mb-3 tracking-tight`}>
            Weather Dashboard
          </h1>
          <Clock />

          <SearchBar onSearch={handleCitySearch} />

          <WeatherCard
            weatherData={weatherData}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  )
}

export default App
