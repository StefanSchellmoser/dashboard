import WeatherWidget from './WeatherWidget'
import TasksStatsWidget from './TasksStatsWidget'
import { getMemberColor, getMonthName } from '../../utils/calendarUtils'
import { formatTime, getTodaysMeals, getUpcomingEvents } from '../../utils/helpers'
import { getCurrentDayOfWeek } from '../../utils/mealPlanUtils'

/**
 * DashboardView Component
 * Main dashboard overview with:
 * - Hero card with time and task summary
 * - Stats grid (weather + task stats)
 * - Today's meals
 * - Upcoming events
 * 
 * @param {object} props - Component props
 * @param {Date} props.currentTime - Current time
 * @param {array} props.tasks - Array of task objects
 * @param {object} props.mealPlan - Weekly meal plan
 * @param {array} props.familyEvents - Array of event objects
 * @param {object} props.t - Translations object
 * @param {string} props.language - Current language
 */
export default function DashboardView({
  currentTime,
  tasks,
  mealPlan,
  familyEvents,
  t,
  language
}) {
  const currentDay = getCurrentDayOfWeek()
  const todaysMeals = getTodaysMeals(mealPlan, currentDay)
  const upcomingEvents = getUpcomingEvents(familyEvents)

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 lg:p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              {formatTime(currentTime, language)}
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
        <WeatherWidget t={t} language={language} />
        <TasksStatsWidget tasks={tasks} t={t} />
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
                      <div className="text-xs font-bold">{getMonthName(event.month, language).substring(0, 3)}</div>
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
