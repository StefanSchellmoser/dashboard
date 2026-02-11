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
    dashboard: 'Dashboard',
    mealPlan: 'Essensplan',
    calendar: 'Familienkalender',
    breakfast: 'Frühstück',
    lunch: 'Mittagessen',
    dinner: 'Abendessen',
    monday: 'Montag',
    tuesday: 'Dienstag',
    wednesday: 'Mittwoch',
    thursday: 'Donnerstag',
    friday: 'Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
    schelli: 'Schelli',
    kathy: 'Kathy',
    virginia: 'Virginia',
    noEvents: 'Keine Termine',
    addEvent: 'Termin hinzufügen',
    eventTitle: 'Titel',
    eventTime: 'Uhrzeit',
    eventDate: 'Datum',
    eventPerson: 'Person',
    cancel: 'Abbrechen',
    save: 'Speichern',
    upcomingEvents: 'Kommende Termine',
    todaysMeals: 'Heutiger Essensplan',
    noEventsToday: 'Keine Termine heute'
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
    dashboard: 'Dashboard',
    mealPlan: 'Meal Plan',
    calendar: 'Family Calendar',
    breakfast: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    schelli: 'Schelli',
    kathy: 'Kathy',
    virginia: 'Virginia',
    noEvents: 'No events',
    addEvent: 'Add Event',
    eventTitle: 'Title',
    eventTime: 'Time',
    eventDate: 'Date',
    eventPerson: 'Person',
    cancel: 'Cancel',
    save: 'Save',
    upcomingEvents: 'Upcoming Events',
    todaysMeals: "Today's Meals",
    noEventsToday: 'No events today'
  }
}

// Healthy meal database
const mealDatabase = {
  de: {
    breakfast: [
      { name: 'Haferflocken mit Beeren', emoji: '🥣', calories: 320 },
      { name: 'Vollkorn-Toast mit Avocado', emoji: '🥑', calories: 280 },
      { name: 'Griechischer Joghurt mit Nüssen', emoji: '🥛', calories: 250 },
      { name: 'Smoothie Bowl', emoji: '🍓', calories: 290 },
      { name: 'Rührei mit Gemüse', emoji: '🍳', calories: 310 },
      { name: 'Vollkorn-Müsli', emoji: '🥣', calories: 300 },
      { name: 'Chia-Pudding', emoji: '🥥', calories: 270 }
    ],
    lunch: [
      { name: 'Quinoa-Salat mit Feta', emoji: '🥗', calories: 420 },
      { name: 'Gegrilltes Hähnchen mit Gemüse', emoji: '🍗', calories: 450 },
      { name: 'Lachs mit Süßkartoffeln', emoji: '🐟', calories: 480 },
      { name: 'Veggie Bowl mit Hummus', emoji: '🥙', calories: 390 },
      { name: 'Vollkorn-Pasta mit Tomaten', emoji: '🍝', calories: 430 },
      { name: 'Linsensuppe', emoji: '🍲', calories: 380 },
      { name: 'Gebratener Reis mit Tofu', emoji: '🍚', calories: 410 }
    ],
    dinner: [
      { name: 'Gemüsepfanne mit Reis', emoji: '🥘', calories: 380 },
      { name: 'Gebackener Lachs mit Brokkoli', emoji: '🐟', calories: 420 },
      { name: 'Hähnchen-Curry', emoji: '🍛', calories: 450 },
      { name: 'Gemüsesuppe', emoji: '🥣', calories: 280 },
      { name: 'Gefüllte Paprika', emoji: '🫑', calories: 350 },
      { name: 'Thunfisch-Salat', emoji: '🥗', calories: 320 },
      { name: 'Linsen-Dal', emoji: '🍲', calories: 360 }
    ]
  },
  en: {
    breakfast: [
      { name: 'Oatmeal with Berries', emoji: '🥣', calories: 320 },
      { name: 'Whole Grain Toast with Avocado', emoji: '🥑', calories: 280 },
      { name: 'Greek Yogurt with Nuts', emoji: '🥛', calories: 250 },
      { name: 'Smoothie Bowl', emoji: '🍓', calories: 290 },
      { name: 'Scrambled Eggs with Veggies', emoji: '🍳', calories: 310 },
      { name: 'Whole Grain Cereal', emoji: '🥣', calories: 300 },
      { name: 'Chia Pudding', emoji: '🥥', calories: 270 }
    ],
    lunch: [
      { name: 'Quinoa Salad with Feta', emoji: '🥗', calories: 420 },
      { name: 'Grilled Chicken with Vegetables', emoji: '🍗', calories: 450 },
      { name: 'Salmon with Sweet Potatoes', emoji: '🐟', calories: 480 },
      { name: 'Veggie Bowl with Hummus', emoji: '🥙', calories: 390 },
      { name: 'Whole Grain Pasta with Tomato', emoji: '🍝', calories: 430 },
      { name: 'Lentil Soup', emoji: '🍲', calories: 380 },
      { name: 'Fried Rice with Tofu', emoji: '🍚', calories: 410 }
    ],
    dinner: [
      { name: 'Vegetable Stir-Fry with Rice', emoji: '🥘', calories: 380 },
      { name: 'Baked Salmon with Broccoli', emoji: '🐟', calories: 420 },
      { name: 'Chicken Curry', emoji: '🍛', calories: 450 },
      { name: 'Vegetable Soup', emoji: '🥣', calories: 280 },
      { name: 'Stuffed Peppers', emoji: '🫑', calories: 350 },
      { name: 'Tuna Salad', emoji: '🥗', calories: 320 },
      { name: 'Lentil Dal', emoji: '🍲', calories: 360 }
    ]
  }
}

// Sample family events
const initialFamilyEvents = (language) => {
  const events = {
    de: [
      { date: 11, month: 1, year: 2026, member: 'schelli', event: 'Meeting mit Team', time: '14:00' },
      { date: 11, month: 1, year: 2026, member: 'kathy', event: 'Yoga-Kurs', time: '18:00' },
      { date: 12, month: 1, year: 2026, member: 'virginia', event: 'Schulfest', time: '15:00' },
      { date: 13, month: 1, year: 2026, member: 'schelli', event: 'Zahnarzt', time: '10:00' },
      { date: 14, month: 1, year: 2026, member: 'kathy', event: 'Buchclub', time: '19:00' },
      { date: 15, month: 1, year: 2026, member: 'virginia', event: 'Ballett-Probe', time: '16:00' },
      { date: 15, month: 1, year: 2026, member: 'schelli', event: 'Familienessen', time: '19:00' },
      { date: 18, month: 1, year: 2026, member: 'kathy', event: 'Friseur', time: '14:30' },
      { date: 21, month: 1, year: 2026, member: 'virginia', event: 'Geburtstag Anna', time: '15:00' },
      { date: 25, month: 1, year: 2026, member: 'schelli', event: 'Projekt-Deadline', time: '17:00' },
      { date: 28, month: 1, year: 2026, member: 'kathy', event: 'Elternabend', time: '18:30' }
    ],
    en: [
      { date: 11, month: 1, year: 2026, member: 'schelli', event: 'Team Meeting', time: '14:00' },
      { date: 11, month: 1, year: 2026, member: 'kathy', event: 'Yoga Class', time: '18:00' },
      { date: 12, month: 1, year: 2026, member: 'virginia', event: 'School Festival', time: '15:00' },
      { date: 13, month: 1, year: 2026, member: 'schelli', event: 'Dentist', time: '10:00' },
      { date: 14, month: 1, year: 2026, member: 'kathy', event: 'Book Club', time: '19:00' },
      { date: 15, month: 1, year: 2026, member: 'virginia', event: 'Ballet Rehearsal', time: '16:00' },
      { date: 15, month: 1, year: 2026, member: 'schelli', event: 'Family Dinner', time: '19:00' },
      { date: 18, month: 1, year: 2026, member: 'kathy', event: 'Hairdresser', time: '14:30' },
      { date: 21, month: 1, year: 2026, member: 'virginia', event: "Anna's Birthday", time: '15:00' },
      { date: 25, month: 1, year: 2026, member: 'schelli', event: 'Project Deadline', time: '17:00' },
      { date: 28, month: 1, year: 2026, member: 'kathy', event: 'Parent Evening', time: '18:30' }
    ]
  }
  return events[language]
}

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [language, setLanguage] = useState('de')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mealPlan, setMealPlan] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [familyEvents, setFamilyEvents] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [showEventForm, setShowEventForm] = useState(false)
  const [newEvent, setNewEvent] = useState({
    date: 1,
    member: 'schelli',
    event: '',
    time: '12:00'
  })

  const t = translations[language]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    fetchTasks()
    fetchWeather()
    generateWeeklyMealPlan()
    setFamilyEvents(initialFamilyEvents(language))

    if (window.innerWidth >= 1024) {
      setSidebarOpen(true)
    }

    return () => clearInterval(timer)
  }, [language])

  const generateWeeklyMealPlan = () => {
    const meals = mealDatabase[language]
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    
    const now = new Date()
    const startOfYear = new Date(now.getFullYear(), 0, 1)
    const weekNumber = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7)
    
    const plan = {}
    days.forEach((day, index) => {
      const seed = weekNumber + index
      plan[day] = {
        breakfast: meals.breakfast[seed % meals.breakfast.length],
        lunch: meals.lunch[(seed + 1) % meals.lunch.length],
        dinner: meals.dinner[(seed + 2) % meals.dinner.length]
      }
    })
    
    setMealPlan(plan)
  }

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

  const getDaysInMonth = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    return { firstDay, daysInMonth }
  }

  const getMonthName = (month) => {
    const months = language === 'de' 
      ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return months[month]
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    setCurrentMonth(new Date().getMonth())
    setCurrentYear(new Date().getFullYear())
  }

  const openEventForm = (day) => {
    setNewEvent({
      date: day,
      member: 'schelli',
      event: '',
      time: '12:00'
    })
    setShowEventForm(true)
  }

  const addEvent = () => {
    const event = {
      ...newEvent,
      month: currentMonth,
      year: currentYear,
      id: Date.now()
    }
    setFamilyEvents([...familyEvents, event])
    setShowEventForm(false)
    setNewEvent({
      date: 1,
      member: 'schelli',
      event: '',
      time: '12:00'
    })
  }

  const getUpcomingEvents = () => {
    const now = new Date()
    return familyEvents
      .filter(e => {
        const eventDate = new Date(e.year, e.month, e.date)
        return eventDate >= now
      })
      .sort((a, b) => {
        const dateA = new Date(a.year, a.month, a.date)
        const dateB = new Date(b.year, b.month, b.date)
        if (dateA.getTime() === dateB.getTime()) {
          return a.time.localeCompare(b.time)
        }
        return dateA - dateB
      })
      .slice(0, 5)
  }

  const getTodaysMeals = () => {
    const dayOfWeek = getCurrentDayOfWeek()
    return mealPlan ? mealPlan[dayOfWeek] : null
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

  const getCurrentDayOfWeek = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    return days[new Date().getDay()]
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

  const getMemberColor = (member) => {
    const colors = {
      schelli: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' },
      kathy: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', dot: 'bg-pink-500' },
      virginia: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', dot: 'bg-purple-500' }
    }
    return colors[member]
  }

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'de' ? 'en' : 'de')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const renderDashboard = () => {
    const todaysMeals = getTodaysMeals()
    const upcomingEvents = getUpcomingEvents()

    return (
      <div className="space-y-4 lg:space-y-6">
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

        {/* Today's Meals */}
        {todaysMeals && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base lg:text-lg font-bold text-gray-800">{t.todaysMeals}</h2>
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{todaysMeals.breakfast.emoji}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{t.breakfast}</h3>
                      <p className="text-xs text-gray-500">{todaysMeals.breakfast.calories} kcal</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{todaysMeals.breakfast.name}</p>
                </div>
                
                <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{todaysMeals.lunch.emoji}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{t.lunch}</h3>
                      <p className="text-xs text-gray-500">{todaysMeals.lunch.calories} kcal</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{todaysMeals.lunch.name}</p>
                </div>
                
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{todaysMeals.dinner.emoji}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700">{t.dinner}</h3>
                      <p className="text-xs text-gray-500">{todaysMeals.dinner.calories} kcal</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800">{todaysMeals.dinner.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-bold text-gray-800">{t.upcomingEvents}</h2>
              <span className="text-2xl">📅</span>
            </div>
          </div>
          <div className="p-4 lg:p-6">
            {upcomingEvents.length === 0 ? (
              <p className="text-center text-gray-500 py-8">{t.noEventsToday}</p>
            ) : (
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => {
                  const colors = getMemberColor(event.member)
                  return (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 border border-gray-200">
                      <div className={`${colors.bg} ${colors.text} w-16 h-16 rounded-xl flex flex-col items-center justify-center flex-shrink-0`}>
                        <div className="text-xs font-bold">{getMonthName(event.month).substring(0, 3)}</div>
                        <div className="text-2xl font-bold">{event.date}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
                          <span className={`text-sm font-medium ${colors.text}`}>{t[event.member]}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm font-medium text-gray-700">{event.time}</span>
                        </div>
                        <p className="text-base font-semibold text-gray-800">{event.event}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderTasks = () => (
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
  )

  const renderMealPlan = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base lg:text-lg font-bold text-gray-800">{t.mealPlan}</h2>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">{t.thisWeek}</p>
          </div>
          <span className="text-3xl">🍽️</span>
        </div>
      </div>
      <div className="p-4 lg:p-6">
        {mealPlan && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-3 lg:gap-4">
            {Object.keys(mealPlan).map(day => {
              const isToday = day === getCurrentDayOfWeek()
              return (
                <div 
                  key={day}
                  className={`p-3 lg:p-4 rounded-xl border-2 ${
                    isToday 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  } transition-all hover:shadow-md`}
                >
                  <h3 className={`text-xs lg:text-sm font-bold mb-3 ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {isToday && '● '}{t[day]}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{mealPlan[day].breakfast.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-600">{t.breakfast}</p>
                        <p className="text-xs text-gray-800 line-clamp-2">{mealPlan[day].breakfast.name}</p>
                        <p className="text-xs text-gray-500">{mealPlan[day].breakfast.calories} kcal</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{mealPlan[day].lunch.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-600">{t.lunch}</p>
                        <p className="text-xs text-gray-800 line-clamp-2">{mealPlan[day].lunch.name}</p>
                        <p className="text-xs text-gray-500">{mealPlan[day].lunch.calories} kcal</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{mealPlan[day].dinner.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-600">{t.dinner}</p>
                        <p className="text-xs text-gray-800 line-clamp-2">{mealPlan[day].dinner.name}</p>
                        <p className="text-xs text-gray-500">{mealPlan[day].dinner.calories} kcal</p>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-700">
                        {mealPlan[day].breakfast.calories + mealPlan[day].lunch.calories + mealPlan[day].dinner.calories} kcal/Tag
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )

  const renderCalendar = () => {
    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth, currentYear)
    const today = new Date().getDate()
    const isCurrentMonth = currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()
    const emptyDays = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 })
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={goToPreviousMonth}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
              >
                ◀
              </button>
              <button
                onClick={goToNextMonth}
                className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
              >
                ▶
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                {t.today}
              </button>
            </div>
            <div>
              <h2 className="text-base lg:text-lg font-bold text-gray-800 text-right">{getMonthName(currentMonth)} {currentYear}</h2>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">{t.schelli}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-gray-600">{t.kathy}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-gray-600">{t.virginia}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 lg:p-6">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600 p-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {days.map(day => {
              const dayEvents = familyEvents
                .filter(e => e.date === day && e.month === currentMonth && e.year === currentYear)
                .sort((a, b) => a.time.localeCompare(b.time))
              const isToday = day === today && isCurrentMonth
              
              return (
                <div 
                  key={day}
                  onClick={() => openEventForm(day)}
                  className={`aspect-square p-2 rounded-lg border cursor-pointer ${
                    isToday 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  } hover:shadow-md transition-all`}
                >
                  <div className={`text-sm font-semibold mb-1 ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.map((event, idx) => {
                      const colors = getMemberColor(event.member)
                      return (
                        <div 
                          key={idx}
                          className={`${colors.bg} ${colors.text} text-xs px-1.5 py-0.5 rounded`}
                        >
                          <div className="font-semibold truncate">{event.time}</div>
                          <div className="truncate">{event.event}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Add Event Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                {t.addEvent} - {newEvent.date}. {getMonthName(currentMonth)} {currentYear}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventTitle}</label>
                  <input
                    type="text"
                    value={newEvent.event}
                    onChange={(e) => setNewEvent({...newEvent, event: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={language === 'de' ? 'Titel eingeben...' : 'Enter title...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventPerson}</label>
                  <select
                    value={newEvent.member}
                    onChange={(e) => setNewEvent({...newEvent, member: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="schelli">{t.schelli}</option>
                    <option value="kathy">{t.kathy}</option>
                    <option value="virginia">{t.virginia}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventTime}</label>
                  <input
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEventForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={addEvent}
                  disabled={!newEvent.event}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
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
          <button 
            onClick={() => { setActiveTab('dashboard'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'dashboard' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">📊</span>
            <span className="font-medium text-sm lg:text-base">{t.dashboard}</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab('tasks'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'tasks' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">✅</span>
            <span className="font-medium text-sm lg:text-base">{t.tasks}</span>
          </button>

          <button 
            onClick={() => { setActiveTab('mealPlan'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'mealPlan' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">🍽️</span>
            <span className="font-medium text-sm lg:text-base">{t.mealPlan}</span>
          </button>

          <button 
            onClick={() => { setActiveTab('calendar'); if (window.innerWidth < 1024) setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'calendar' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">📅</span>
            <span className="font-medium text-sm lg:text-base">{t.calendar}</span>
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
        <div className="p-4 lg:p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'tasks' && renderTasks()}
          {activeTab === 'mealPlan' && renderMealPlan()}
          {activeTab === 'calendar' && renderCalendar()}
        </div>
      </main>
    </div>
  )
}

export default App
