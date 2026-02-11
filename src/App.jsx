import { useState, useEffect } from 'react'
import './App.css'

// Translations
const translations = {
  de: {
    dashboard: 'Dashboard',
    time: 'Zeit',
    tasks: 'Aufgaben',
    weather: 'Wetter',
    stats: 'Statistiken',
    total: 'Gesamt',
    completed: 'Erledigt',
    open: 'Offen',
    noTasks: 'Keine Aufgaben gefunden',
    loading: 'Lädt...',
    poweredBy: 'Powered by Friday 🔧 | Built with React + Vite + Tailwind'
  },
  en: {
    dashboard: 'Dashboard',
    time: 'Time',
    tasks: 'Tasks',
    weather: 'Weather',
    stats: 'Statistics',
    total: 'Total',
    completed: 'Completed',
    open: 'Open',
    noTasks: 'No tasks found',
    loading: 'Loading...',
    poweredBy: 'Powered by Friday 🔧 | Built with React + Vite + Tailwind'
  }
}

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [language, setLanguage] = useState('de')

  const t = translations[language]

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Fetch tasks and weather
    fetchTasks()
    fetchWeather()

    return () => clearInterval(timer)
  }, [])

  const fetchWeather = async () => {
    try {
      // Rosenheim coordinates: 47.8561° N, 12.1233° E
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=47.8561&longitude=12.1233&current_weather=true&timezone=Europe/Berlin'
      )
      const data = await response.json()
      setWeather(data.current_weather)
      setWeatherLoading(false)
    } catch (error) {
      console.error('Error fetching weather:', error)
      setWeatherLoading(false)
    }
  }

  const fetchTasks = async () => {
    try {
      // Mock data for now - we'll add real ToDoist integration later
      const mockTasks = [
        { id: 1, content: 'Build dashboard', completed: false, priority: 4 },
        { id: 2, content: 'Deploy to Vercel', completed: true, priority: 3 },
        { id: 3, content: 'Add more features', completed: false, priority: 2 },
      ]
      
      setTimeout(() => {
        setTasks(mockTasks)
        setLoading(false)
      }, 500)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 4: return 'bg-red-100 border-red-300 text-red-800'
      case 3: return 'bg-orange-100 border-orange-300 text-orange-800'
      case 2: return 'bg-blue-100 border-blue-300 text-blue-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getWeatherIcon = (weatherCode) => {
    // WMO Weather interpretation codes
    if (weatherCode === 0) return '☀️'
    if (weatherCode <= 3) return '⛅'
    if (weatherCode <= 48) return '🌫️'
    if (weatherCode <= 67) return '🌧️'
    if (weatherCode <= 77) return '🌨️'
    if (weatherCode <= 82) return '🌧️'
    if (weatherCode <= 86) return '🌨️'
    return '⛈️'
  }

  const getWeatherDescription = (weatherCode) => {
    const descriptions = {
      de: {
        0: 'Klar',
        1: 'Überwiegend klar',
        2: 'Teilweise bewölkt',
        3: 'Bewölkt',
        45: 'Nebelig',
        48: 'Nebel',
        51: 'Leichter Nieselregen',
        61: 'Leichter Regen',
        63: 'Regen',
        65: 'Starker Regen',
        71: 'Leichter Schneefall',
        73: 'Schneefall',
        75: 'Starker Schneefall',
        95: 'Gewitter'
      },
      en: {
        0: 'Clear',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Cloudy',
        45: 'Foggy',
        48: 'Fog',
        51: 'Light drizzle',
        61: 'Light rain',
        63: 'Rain',
        65: 'Heavy rain',
        71: 'Light snow',
        73: 'Snow',
        75: 'Heavy snow',
        95: 'Thunderstorm'
      }
    }
    
    const desc = descriptions[language]
    return desc[weatherCode] || (language === 'de' ? 'Unbekannt' : 'Unknown')
  }

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'de' ? 'en' : 'de')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">{t.dashboard} 🔧</h1>
            <p className="text-gray-300 text-lg">{formatDate(currentTime)}</p>
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            {language === 'de' ? '🇩🇪 DE' : '🇬🇧 EN'}
          </button>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Time Widget */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">⏰ {t.time}</h2>
            <div className="text-6xl font-bold text-white font-mono">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Tasks Widget */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">📋 {t.tasks}</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : tasks.length === 0 ? (
              <p className="text-gray-300 text-center py-8">{t.noTasks}</p>
            ) : (
              <div className="space-y-3">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-lg border-2 ${getPriorityColor(task.priority)} backdrop-blur-sm transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        className="mt-1 w-5 h-5 rounded cursor-pointer"
                        readOnly
                      />
                      <span className={`flex-1 ${task.completed ? 'line-through opacity-60' : ''}`}>
                        {task.content}
                      </span>
                      {task.priority === 4 && <span className="text-xl">🔥</span>}
                      {task.priority === 3 && <span className="text-xl">⚡</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Weather Widget */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">🌤️ {t.weather}</h2>
            {weatherLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : weather ? (
              <div className="text-center py-4">
                <div className="text-6xl mb-2">{getWeatherIcon(weather.weathercode)}</div>
                <div className="text-3xl font-bold text-white mb-2">
                  {Math.round(weather.temperature)}°C
                </div>
                <div className="text-gray-300 mb-2">
                  {getWeatherDescription(weather.weathercode)}
                </div>
                <div className="text-sm text-gray-400">
                  Rosenheim
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  💨 {Math.round(weather.windspeed)} km/h
                </div>
              </div>
            ) : (
              <p className="text-gray-300 text-center py-8">{t.loading}</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">📊 {t.stats}</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{tasks.length}</div>
                <div className="text-sm text-gray-300">{t.total}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-gray-300">{t.completed}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {tasks.filter(t => !t.completed).length}
                </div>
                <div className="text-sm text-gray-300">{t.open}</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>{t.poweredBy}</p>
        </footer>
      </div>
    </div>
  )
}

export default App
