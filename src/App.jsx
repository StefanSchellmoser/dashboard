import { useState, useEffect } from 'react'
import './App.css'

// Translations
const translations = {
  de: {
    title: 'Schellis Tafel',
    greeting: 'Willkommen zurück, Schelli',
    time: 'Zeit',
    tasks: 'Aufgaben',
    weather: 'Wetter',
    stats: 'Statistiken',
    total: 'Gesamt',
    completed: 'Erledigt',
    open: 'Offen',
    noTasks: 'Keine Aufgaben',
    today: 'Heute',
    thisWeek: 'Diese Woche',
    dashboard: 'Dashboard'
  },
  en: {
    title: "Schelli's Board",
    greeting: 'Welcome back, Schelli',
    time: 'Time',
    tasks: 'Tasks',
    weather: 'Weather',
    stats: 'Statistics',
    total: 'Total',
    completed: 'Completed',
    open: 'Open',
    noTasks: 'No tasks',
    today: 'Today',
    thisWeek: 'This Week',
    dashboard: 'Dashboard'
  }
}

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [language, setLanguage] = useState('de')
  const [sidebarOpen, setSidebarOpen] = useState(false) // Closed by default on mobile

  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    fetchTasks()
    fetchWeather()

    // Open sidebar by default on desktop
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true)
    }

    return () => clearInterval(timer)
  }, [])

  const fetchWeather = async () => {
    try {
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
      case 4: return 'bg-red-50 border-red-200 text-red-700'
      case 3: return 'bg-orange-50 border-orange-200 text-orange-700'
      case 2: return 'bg-blue-50 border-blue-200 text-blue-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getWeatherIcon = (weatherCode) => {
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

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'de' ? 'en' : 'de')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        fixed lg:relative z-30
        w-64 h-full
        bg-white border-r border-gray-200 
        transition-transform duration-300 
        flex flex-col
      `}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🔧</span>
              </div>
              <span className="font-bold text-gray-800 text-base lg:text-lg">Schellis Tafel</span>
            </div>
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 lg:px-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <span className="text-xl">📊</span>
            <span className="font-medium text-sm lg:text-base">{t.dashboard}</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <span className="text-xl">✅</span>
            <span className="font-medium text-sm lg:text-base">{t.tasks}</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <span className="text-xl">🌤️</span>
            <span className="font-medium text-sm lg:text-base">{t.weather}</span>
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <span className="text-xl">📈</span>
            <span className="font-medium text-sm lg:text-base">{t.stats}</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              ☰
            </button>
            <div>
              <h1 className="text-lg lg:text-2xl font-bold text-gray-800">{t.greeting}</h1>
              <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">{formatDate(currentTime)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-xs lg:text-sm font-medium"
            >
              {language === 'de' ? '🇩🇪' : '🇬🇧'}
            </button>
            
            <button className="relative p-2 rounded-lg hover:bg-gray-100 hidden sm:block">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-8 space-y-4 lg:space-y-6">
          {/* Hero Card */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  {formatTime(currentTime)}
                </h2>
                <p className="text-blue-100 text-sm lg:text-base">
                  {tasks.filter(t => !t.completed).length} {t.open.toLowerCase()} · {tasks.filter(t => t.completed).length} {t.completed.toLowerCase()}
                </p>
              </div>
              <div className="w-16 h-16 lg:w-24 lg:h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl lg:text-6xl backdrop-blur-sm">
                ⏰
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Weather Card */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.weather}</h3>
                <span className="px-2 lg:px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-medium">
                  Rosenheim
                </span>
              </div>
              {weatherLoading ? (
                <div className="flex items-center justify-center h-20 lg:h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
                </div>
              ) : weather ? (
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl mb-2">{getWeatherIcon(weather.weathercode)}</div>
                  <div className="text-2xl lg:text-3xl font-bold text-gray-800 mb-1">
                    {Math.round(weather.temperature)}°C
                  </div>
                  <div className="text-xs lg:text-sm text-gray-500">
                    {getWeatherDescription(weather.weathercode)}
                  </div>
                  <div className="mt-2 lg:mt-3 pt-2 lg:pt-3 border-t border-gray-100 text-xs text-gray-500">
                    💨 {Math.round(weather.windspeed)} km/h
                  </div>
                </div>
              ) : null}
            </div>

            {/* Total Tasks */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.total}</h3>
                <span className="px-2 lg:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                  {t.today}
                </span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
                {tasks.length}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                {t.tasks}
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-600 font-medium">↗ +2</span>
                  <span className="text-gray-500">{t.thisWeek}</span>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.completed}</h3>
                <span className="px-2 lg:px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                  ✓
                </span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-1">
                {tasks.filter(t => t.completed).length}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                {Math.round((tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100)}% {t.completed.toLowerCase()}
              </div>
              <div className="mt-3 lg:mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${(tasks.filter(t => t.completed).length / Math.max(tasks.length, 1)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Open */}
            <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3 lg:mb-4">
                <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.open}</h3>
                <span className="px-2 lg:px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium">
                  ⏳
                </span>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-1">
                {tasks.filter(t => !t.completed).length}
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                {t.tasks} {t.open.toLowerCase()}
              </div>
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-orange-600 font-medium">● Aktiv</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <h2 className="text-base lg:text-lg font-bold text-gray-800">{t.tasks}</h2>
            </div>
            <div className="p-4 lg:p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : tasks.length === 0 ? (
                <p className="text-center text-gray-500 py-8 text-sm lg:text-base">{t.noTasks}</p>
              ) : (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      className={`p-3 lg:p-4 rounded-xl border ${getPriorityColor(task.priority)} transition-all hover:shadow-md`}
                    >
                      <div className="flex items-center gap-3 lg:gap-4">
                        <input 
                          type="checkbox" 
                          checked={task.completed}
                          className="w-4 h-4 lg:w-5 lg:h-5 rounded cursor-pointer accent-blue-500 flex-shrink-0"
                          readOnly
                        />
                        <span className={`flex-1 text-sm lg:text-base font-medium ${task.completed ? 'line-through opacity-60' : ''}`}>
                          {task.content}
                        </span>
                        {task.priority === 4 && (
                          <span className="px-2 lg:px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium whitespace-nowrap">
                            🔥 <span className="hidden sm:inline">Urgent</span>
                          </span>
                        )}
                        {task.priority === 3 && (
                          <span className="px-2 lg:px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium whitespace-nowrap">
                            ⚡ <span className="hidden sm:inline">High</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
