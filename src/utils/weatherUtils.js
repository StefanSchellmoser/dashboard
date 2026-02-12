/**
 * Weather utility functions
 */

/**
 * Get weather icon emoji based on weather code
 * @param {number} weatherCode - Open-Meteo weather code
 * @returns {string} Weather emoji
 */
export const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) return '☀️'
  if (weatherCode <= 3) return '⛅'
  if (weatherCode <= 48) return '🌫️'
  if (weatherCode <= 67) return '🌧️'
  if (weatherCode <= 77) return '🌨️'
  if (weatherCode <= 82) return '🌧️'
  if (weatherCode <= 86) return '🌨️'
  return '⛈️'
}

/**
 * Get weather description based on weather code and language
 * @param {number} weatherCode - Open-Meteo weather code
 * @param {string} language - Language code ('de' or 'en')
 * @returns {string} Weather description
 */
export const getWeatherDescription = (weatherCode, language) => {
  const descriptions = {
    de: {
      0: 'Klar', 1: 'Überwiegend klar', 2: 'Teilweise bewölkt', 3: 'Bewölkt',
      45: 'Nebelig', 48: 'Nebel', 51: 'Leichter Nieselregen',
      61: 'Leichter Regen', 63: 'Regen', 65: 'Starker Regen',
      71: 'Leichter Schneefall', 73: 'Schneefall', 75: 'Starker Schneefall',
      95: 'Gewitter'
    },
    en: {
      0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Cloudy',
      45: 'Foggy', 48: 'Fog', 51: 'Light drizzle',
      61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
      71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
      95: 'Thunderstorm'
    }
  }
  
  const desc = descriptions[language]
  return desc[weatherCode] || (language === 'de' ? 'Unbekannt' : 'Unknown')
}

/**
 * Fetch weather data from Open-Meteo API for Rosenheim
 * @returns {Promise<object>} Weather data
 */
export const fetchWeather = async () => {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=47.8561&longitude=12.1233&current_weather=true&timezone=Europe/Berlin'
  )
  const data = await response.json()
  return data.current_weather
}
