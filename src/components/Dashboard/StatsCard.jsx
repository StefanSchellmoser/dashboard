/**
 * StatsCard Component
 * 
 * Displays a single statistic card with:
 * - Title
 * - Badge/tag
 * - Main metric value
 * - Description
 * - Optional footer with trend
 * 
 * Used in the Dashboard overview for displaying metrics like:
 * - Total tasks
 * - Completed tasks
 * - Open tasks
 * - Weather info
 * 
 * Props:
 * - title: String - Card title (e.g., "Weather", "Total")
 * - badge: String - Badge text (e.g., "Today", "Rosenheim")
 * - badgeColor: String - Tailwind color classes for badge
 * - value: String/Number - Main metric (e.g., "3", "22°C")
 * - valueColor: String - Tailwind text color for value
 * - description: String - Supporting text
 * - footer: Object (optional) - { text, color, icon }
 * - children: React nodes (optional) - Custom content
 */

export default function StatsCard({ 
  title, 
  badge, 
  badgeColor = 'bg-blue-50 text-blue-600',
  value,
  valueColor = 'text-gray-800',
  description,
  footer,
  children
}) {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
      {/* Header with title and badge */}
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h3 className="text-xs lg:text-sm font-semibold text-gray-600">
          {title}
        </h3>
        {badge && (
          <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Custom content or default value display */}
      {children || (
        <>
          <div className={`text-3xl lg:text-4xl font-bold ${valueColor} mb-1`}>
            {value}
          </div>
          <div className="text-xs lg:text-sm text-gray-500">
            {description}
          </div>
        </>
      )}

      {/* Optional footer */}
      {footer && (
        <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            {footer.icon && <span>{footer.icon}</span>}
            <span className={`font-medium ${footer.color}`}>
              {footer.text}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
