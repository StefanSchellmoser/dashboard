/**
 * TasksStatsWidget Component
 * Displays three stat cards for task overview:
 * - Total tasks
 * - Completed tasks
 * - Open tasks
 * 
 * @param {object} props - Component props
 * @param {array} props.tasks - Array of task objects
 * @param {object} props.t - Translations object
 */
export default function TasksStatsWidget({ tasks, t }) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const openTasks = tasks.filter(task => !task.completed).length
  const completionPercentage = Math.round((completedTasks / Math.max(totalTasks, 1)) * 100)

  return (
    <>
      {/* Total Tasks */}
      <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-600">{t.total}</h3>
          <span className="px-2 lg:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            {t.today}
          </span>
        </div>
        <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
          {totalTasks}
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
          {completedTasks}
        </div>
        <div className="text-xs lg:text-sm text-gray-500">
          {completionPercentage}% {t.completed.toLowerCase()}
        </div>
        <div className="mt-3 lg:mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${completionPercentage}%` }}
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
          {openTasks}
        </div>
        <div className="text-xs lg:text-sm text-gray-500">
          {t.tasks} {t.open.toLowerCase()}
        </div>
        <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 text-xs">⏱</span>
            <span className="text-gray-500">{t.today}</span>
          </div>
        </div>
      </div>
    </>
  )
}
