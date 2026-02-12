/**
 * Header Component
 * 
 * Displays the top navigation bar with:
 * - Hamburger menu (mobile only)
 * - Greeting and current date
 * - Language toggle
 * - Notification bell
 * - User avatar
 * 
 * Props:
 * - currentTime: Date object for displaying current date
 * - language: Current language ('de' or 'en')
 * - onToggleLanguage: Function to toggle language
 * - onToggleSidebar: Function to open/close sidebar (mobile)
 * - formatDate: Function to format date based on language
 * - translations: Object with translated strings
 */

export default function Header({ 
  currentTime, 
  language, 
  onToggleLanguage, 
  onToggleSidebar,
  formatDate,
  translations 
}) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        
        <div>
          <h1 className="text-lg lg:text-2xl font-bold text-gray-800">
            {translations.greeting}
          </h1>
          <p className="text-xs lg:text-sm text-gray-500 hidden sm:block">
            {formatDate(currentTime)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Language toggle */}
        <button 
          onClick={onToggleLanguage}
          className="px-2 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-xs lg:text-sm font-medium"
          aria-label="Toggle language"
        >
          {language === 'de' ? '🇩🇪' : '🇬🇧'}
        </button>
        
        {/* Notification bell */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 hidden sm:block"
          aria-label="Notifications"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        
        {/* User avatar */}
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
          S
        </div>
      </div>
    </header>
  )
}
