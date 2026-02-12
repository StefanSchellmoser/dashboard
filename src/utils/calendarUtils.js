/**
 * Calendar utility functions
 */

/**
 * Get number of days in month and first day of week
 * @param {number} month - Month (0-11)
 * @param {number} year - Year
 * @returns {object} Object with firstDay and daysInMonth
 */
export const getDaysInMonth = (month, year) => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  return { firstDay, daysInMonth }
}

/**
 * Get localized month name
 * @param {number} month - Month (0-11)
 * @param {string} language - Language code ('de' or 'en')
 * @returns {string} Month name
 */
export const getMonthName = (month, language) => {
  const months = language === 'de' 
    ? ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[month]
}

/**
 * Get color scheme for family member
 * @param {string} member - Member name ('schelli', 'kathy', 'virginia')
 * @returns {object} Object with color classes
 */
export const getMemberColor = (member) => {
  const colors = {
    schelli: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300', dot: 'bg-blue-500' },
    kathy: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300', dot: 'bg-pink-500' },
    virginia: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300', dot: 'bg-purple-500' }
  }
  return colors[member]
}
