/**
 * Sidebar Component
 * 
 * Navigation sidebar with tabs for:
 * - Dashboard (overview)
 * - Tasks (task list)
 * - Meal Plan (weekly meals)
 * - Calendar (family calendar)
 * 
 * Responsive: 
 * - Desktop: Always visible
 * - Mobile: Slides in/out, shows overlay
 * 
 * Props:
 * - isOpen: Boolean - sidebar visibility state
 * - activeTab: String - currently active tab
 * - onTabChange: Function - called when tab is clicked
 * - onClose: Function - called to close sidebar (mobile)
 * - translations: Object - translated strings
 */

export default function Sidebar({ 
  isOpen, 
  activeTab, 
  onTabChange, 
  onClose,
  translations 
}) {
  const handleTabClick = (tab) => {
    onTabChange(tab)
    // Auto-close on mobile after selecting
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <aside className={`
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      fixed lg:relative z-30
      w-64 h-full
      bg-white border-r border-gray-200 
      transition-transform duration-300 
      flex flex-col
    `}>
      {/* Header */}
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🔧</span>
            </div>
            <span className="font-bold text-gray-800 text-base lg:text-lg">
              Schellis Tafel
            </span>
          </div>
          
          {/* Close button (mobile only) */}
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 lg:px-4 space-y-2">
        {/* Dashboard Tab */}
        <button 
          onClick={() => handleTabClick('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'dashboard' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">📊</span>
          <span className="font-medium text-sm lg:text-base">
            {translations.dashboard}
          </span>
        </button>
        
        {/* Tasks Tab */}
        <button 
          onClick={() => handleTabClick('tasks')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'tasks' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">✅</span>
          <span className="font-medium text-sm lg:text-base">
            {translations.tasks}
          </span>
        </button>

        {/* Meal Plan Tab */}
        <button 
          onClick={() => handleTabClick('mealPlan')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'mealPlan' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">🍽️</span>
          <span className="font-medium text-sm lg:text-base">
            {translations.mealPlan}
          </span>
        </button>

        {/* Calendar Tab */}
        <button 
          onClick={() => handleTabClick('calendar')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'calendar' 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-xl">📅</span>
          <span className="font-medium text-sm lg:text-base">
            {translations.calendar}
          </span>
        </button>
      </nav>
    </aside>
  )
}
