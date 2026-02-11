import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Fetch tasks from ToDoist
    fetchTasks()

    return () => clearInterval(timer)
  }, [])

  const fetchTasks = async () => {
    try {
      // For now, we'll use mock data. We'll add real API integration later
      // In production, this would call your backend endpoint that securely uses the API key
      const mockTasks = [
        { id: 1, content: 'Build dashboard', completed: false, priority: 4 },
        { id: 2, content: 'Deploy to Vercel', completed: false, priority: 3 },
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
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('de-DE', { 
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Dashboard 🔧</h1>
          <p className="text-gray-300 text-lg">{formatDate(currentTime)}</p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Time Widget */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">⏰ Zeit</h2>
            <div className="text-6xl font-bold text-white font-mono">
              {formatTime(currentTime)}
            </div>
          </div>

          {/* Tasks Widget */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">📋 Aufgaben</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : tasks.length === 0 ? (
              <p className="text-gray-300 text-center py-8">Keine Aufgaben gefunden</p>
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

          {/* Weather Widget (Placeholder) */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-semibold text-white mb-4">🌤️ Wetter</h2>
            <div className="text-center py-8">
              <div className="text-6xl mb-2">☀️</div>
              <div className="text-3xl font-bold text-white mb-2">22°C</div>
              <div className="text-gray-300">Sonnig</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">📊 Statistiken</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{tasks.length}</div>
                <div className="text-sm text-gray-300">Gesamt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {tasks.filter(t => t.completed).length}
                </div>
                <div className="text-sm text-gray-300">Erledigt</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {tasks.filter(t => !t.completed).length}
                </div>
                <div className="text-sm text-gray-300">Offen</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-400 text-sm">
          <p>Powered by Friday 🔧 | Built with React + Vite + Tailwind</p>
        </footer>
      </div>
    </div>
  )
}

export default App
