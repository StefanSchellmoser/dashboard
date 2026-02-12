import { mealDatabase } from '../data/mealDatabase'

/**
 * Generate weekly meal plan based on current week number
 * Uses deterministic selection so same week always gets same meals
 * @param {string} language - Language code ('de' or 'en')
 * @returns {object} Weekly meal plan object
 */
export const generateWeeklyMealPlan = (language) => {
  const meals = mealDatabase[language]
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  
  // Calculate week number of the year
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
  
  return plan
}
