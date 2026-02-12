import { useState, useEffect } from 'react'
import './App.css'

// Import data and constants
import { translations } from './constants/translations'
import { initialFamilyEvents } from './data/initialEvents'

// Import utilities
import { fetchTasks } from './utils/taskUtils'
import { generateWeeklyMealPlan } from './utils/mealPlanUtils'

// Import components
import Header from './components/Common/Header'
import Sidebar from './components/Common/Sidebar'
import DashboardView from './components/Dashboard/DashboardView'
import TasksView from './components/Tasks/TasksView'
import MealPlanView from './components/MealPlan/MealPlanView'
import CalendarView from './components/Calendar/CalendarView'

/**
 * Main App Component
 * Handles state management and routing between views
 */
function App() {
  // UI State
  const [language, setLanguage] = useState('de')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Data State
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mealPlan, setMealPlan] = useState(null)
  const [familyEvents, setFamilyEvents] = useState([])
  
  // Calendar State
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

  // Initialize app data
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Load initial data
    loadTasks()
    setMealPlan(generateWeeklyMealPlan(language))
    setFamilyEvents(initialFamilyEvents(language))

    // Open sidebar on desktop
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true)
    }

    return () => clearInterval(timer)
  }, [])

  // Reload data when language changes
  useEffect(() => {
    setMealPlan(generateWeeklyMealPlan(language))
    setFamilyEvents(initialFamilyEvents(language))
  }, [language])

  // Load tasks
  const loadTasks = async () => {
    try {
      const tasksData = await fetchTasks()
      setTasks(tasksData)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      setLoading(false)
    }
  }

  // UI Handlers
  const toggleLanguage = () => {
    setLanguage(lang => lang === 'de' ? 'en' : 'de')
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Calendar Handlers
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

  const closeEventForm = () => {
    setShowEventForm(false)
    setNewEvent({
      date: 1,
      member: 'schelli',
      event: '',
      time: '12:00'
    })
  }

  const saveEvent = () => {
    if (newEvent.event.trim()) {
      const event = {
        ...newEvent,
        month: currentMonth,
        year: currentYear
      }
      setFamilyEvents([...familyEvents, event])
      closeEventForm()
    }
  }

  // Render active view
  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksView tasks={tasks} loading={loading} t={t} />
      
      case 'mealPlan':
        return <MealPlanView mealPlan={mealPlan} t={t} />
      
      case 'calendar':
        return (
          <CalendarView
            currentMonth={currentMonth}
            currentYear={currentYear}
            familyEvents={familyEvents}
            t={t}
            language={language}
            onPreviousMonth={goToPreviousMonth}
            onNextMonth={goToNextMonth}
            onToday={goToToday}
            onOpenEventForm={openEventForm}
            showEventForm={showEventForm}
            newEvent={newEvent}
            onEventChange={setNewEvent}
            onSaveEvent={saveEvent}
            onCloseEventForm={closeEventForm}
          />
        )
      
      case 'dashboard':
      default:
        return (
          <DashboardView
            currentTime={currentTime}
            tasks={tasks}
            mealPlan={mealPlan}
            familyEvents={familyEvents}
            t={t}
            language={language}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onToggleSidebar={toggleSidebar}
        t={t}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          language={language}
          onToggleLanguage={toggleLanguage}
          onToggleSidebar={toggleSidebar}
          t={t}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App
