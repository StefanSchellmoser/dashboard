import { getPriorityColor } from '../../utils/taskUtils'

/**
 * TasksView Component
 * Displays list of tasks with priority indicators
 * 
 * @param {object} props - Component props
 * @param {array} props.tasks - Array of task objects
 * @param {boolean} props.loading - Loading state
 * @param {object} props.t - Translations object
 */
export default function TasksView({ tasks, loading, t }) {
  return (
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
}
