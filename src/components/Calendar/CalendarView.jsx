import { getDaysInMonth, getMonthName, getMemberColor } from '../../utils/calendarUtils'

/**
 * CalendarView Component
 * Displays monthly calendar with family events
 * Supports navigation, event creation, and color-coded member events
 * 
 * @param {object} props - Component props
 * @param {number} props.currentMonth - Current month (0-11)
 * @param {number} props.currentYear - Current year
 * @param {array} props.familyEvents - Array of event objects
 * @param {object} props.t - Translations object
 * @param {string} props.language - Current language
 * @param {function} props.onPreviousMonth - Navigate to previous month
 * @param {function} props.onNextMonth - Navigate to next month
 * @param {function} props.onToday - Navigate to today
 * @param {function} props.onOpenEventForm - Open event creation form
 * @param {boolean} props.showEventForm - Show event form modal
 * @param {object} props.newEvent - New event data
 * @param {function} props.onEventChange - Handle event data changes
 * @param {function} props.onSaveEvent - Save new event
 * @param {function} props.onCloseEventForm - Close event form
 */
export default function CalendarView({
  currentMonth,
  currentYear,
  familyEvents,
  t,
  language,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onOpenEventForm,
  showEventForm,
  newEvent,
  onEventChange,
  onSaveEvent,
  onCloseEventForm
}) {
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
              onClick={onPreviousMonth}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
            >
              ◀
            </button>
            <button
              onClick={onNextMonth}
              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors text-xl font-bold"
            >
              ▶
            </button>
            <button
              onClick={onToday}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              {t.today}
            </button>
          </div>
          <div>
            <h2 className="text-base lg:text-lg font-bold text-gray-800 text-right">
              {getMonthName(currentMonth, language)} {currentYear}
            </h2>
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
                onClick={() => onOpenEventForm(day)}
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
              {t.addEvent} - {newEvent.date}. {getMonthName(currentMonth, language)} {currentYear}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventTitle}</label>
                <input
                  type="text"
                  value={newEvent.event}
                  onChange={(e) => onEventChange({...newEvent, event: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={language === 'de' ? 'Titel eingeben...' : 'Enter title...'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.eventPerson}</label>
                <select
                  value={newEvent.member}
                  onChange={(e) => onEventChange({...newEvent, member: e.target.value})}
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
                  onChange={(e) => onEventChange({...newEvent, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onCloseEventForm}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                {t.cancel}
              </button>
              <button
                onClick={onSaveEvent}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
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
