/**
 * Task utility functions
 */

/**
 * Get priority color classes
 * @param {number} priority - Priority level (1-4)
 * @returns {string} Tailwind CSS classes
 */
export const getPriorityColor = (priority) => {
  switch(priority) {
    case 4: return 'bg-red-50 border-red-200 text-red-700'
    case 3: return 'bg-orange-50 border-orange-200 text-orange-700'
    case 2: return 'bg-blue-50 border-blue-200 text-blue-700'
    default: return 'bg-gray-50 border-gray-200 text-gray-700'
  }
}

/**
 * Fetch tasks (mock for now, will be replaced with API)
 * @returns {Promise<array>} Array of task objects
 */
export const fetchTasks = async () => {
  // Mock data for now - replace with real API call
  const mockTasks = [
    { id: 1, content: 'Build dashboard', completed: false, priority: 4 },
    { id: 2, content: 'Deploy to Vercel', completed: true, priority: 3 },
    { id: 3, content: 'Add more features', completed: false, priority: 2 },
  ]
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTasks)
    }, 500)
  })
}
