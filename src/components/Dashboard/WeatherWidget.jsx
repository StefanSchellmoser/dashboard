import { useState, useEffect } from 'react'
import { fetchWeather, getWeatherIcon, getWeatherDescription } from '../../utils/weatherUtils'

/**
 * Weather Widget Component
 * Displays current weather for Rosenheim
 * @param {object} props - Component props
 * @param {object} props.t - Translations object
 * @param {string} props.language - Current language
 */
export default function WeatherWidget({ t, language }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWeather()
  }, [])

  const loadWeather = async () => {
    try {
      const weatherData = await fetchWeather()
      setWeather(weatherData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.weather}</h3>
        <span className="px-2 lg:px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-medium">
          🌡️
        </span>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center h-20 lg:h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
        </div>
      ) : weather ? (
        <div className="text-center">
          <div className="text-4xl lg:text-5xl mb-2">
            {getWeatherIcon(weather.weathercode)}
          </div>
          <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-xs lg:text-sm text-gray-500">
            {getWeatherDescription(weather.weathercode, language)}
          </div>
          <div className="mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-gray-100 text-xs text-gray-500">
            💨 {Math.round(weather.windspeed)} km/h
          </div>
        </div>
      ) : null}
    </div>
  )
}
