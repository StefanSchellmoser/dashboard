import { getCurrentDayOfWeek } from '../../utils/mealPlanUtils'

/**
 * MealPlanView Component
 * Displays weekly meal plan with daily breakfast, lunch, and dinner
 * Highlights current day
 * 
 * @param {object} props - Component props
 * @param {object} props.mealPlan - Weekly meal plan object
 * @param {object} props.t - Translations object
 */
export default function MealPlanView({ mealPlan, t }) {
  const currentDay = getCurrentDayOfWeek()

  return (
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
              const isToday = day === currentDay
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
}
