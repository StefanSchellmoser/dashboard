/**
 * General helper functions
 */

/**
 * Format time for display
 * @param {Date} date - Date object
 * @param {string} language - Language code ('de' or 'en')
 * @returns {string} Formatted time string
 */
export const formatTime = (date, language) => {
  return date.toLocaleTimeString(language === 'de' ? 'de-DE' : 'en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Format date for display
 * @param {Date} date - Date object
 * @param {string} language - Language code ('de' or 'en')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, language) => {
  return date.toLocaleDateString(language === 'de' ? 'de-DE' : 'en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

/**
 * Get upcoming events (next 5)
 * @param {array} familyEvents - Array of event objects
 * @returns {array} Sorted upcoming events
 */
export const getUpcomingEvents = (familyEvents) => {
  const now = new Date()
  return familyEvents
    .filter(e => {
      const eventDate = new Date(e.year, e.month, e.date)
      return eventDate >= now
    })
    .sort((a, b) => {
      const dateA = new Date(a.year, a.month, a.date)
      const dateB = new Date(b.year, b.month, b.date)
      if (dateA.getTime() === dateB.getTime()) {
        return a.time.localeCompare(b.time)
      }
      return dateA - dateB
    })
    .slice(0, 5)
}

/**
 * Get today's meals from meal plan
 * @param {object} mealPlan - Weekly meal plan object
 * @param {string} currentDay - Current day of week
 * @returns {object|null} Today's meals or null
 */
export const getTodaysMeals = (mealPlan, currentDay) => {
  return mealPlan ? mealPlan[currentDay] : null
}
