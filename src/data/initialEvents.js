/**
 * Sample family events for calendar initialization
 * Returns initial events based on language
 */
export const initialFamilyEvents = (language) => {
  const events = {
    de: [
      { date: 11, month: 1, year: 2026, member: 'schelli', event: 'Meeting mit Team', time: '14:00' },
      { date: 11, month: 1, year: 2026, member: 'kathy', event: 'Yoga-Kurs', time: '18:00' },
      { date: 12, month: 1, year: 2026, member: 'virginia', event: 'Schulfest', time: '15:00' },
      { date: 13, month: 1, year: 2026, member: 'schelli', event: 'Zahnarzt', time: '10:00' },
      { date: 14, month: 1, year: 2026, member: 'kathy', event: 'Buchclub', time: '19:00' },
      { date: 15, month: 1, year: 2026, member: 'virginia', event: 'Ballett-Probe', time: '16:00' },
      { date: 15, month: 1, year: 2026, member: 'schelli', event: 'Familienessen', time: '19:00' },
      { date: 18, month: 1, year: 2026, member: 'kathy', event: 'Friseur', time: '14:30' },
      { date: 21, month: 1, year: 2026, member: 'virginia', event: 'Geburtstag Anna', time: '15:00' },
      { date: 25, month: 1, year: 2026, member: 'schelli', event: 'Projekt-Deadline', time: '17:00' },
      { date: 28, month: 1, year: 2026, member: 'kathy', event: 'Elternabend', time: '18:30' }
    ],
    en: [
      { date: 11, month: 1, year: 2026, member: 'schelli', event: 'Team Meeting', time: '14:00' },
      { date: 11, month: 1, year: 2026, member: 'kathy', event: 'Yoga Class', time: '18:00' },
      { date: 12, month: 1, year: 2026, member: 'virginia', event: 'School Festival', time: '15:00' },
      { date: 13, month: 1, year: 2026, member: 'schelli', event: 'Dentist', time: '10:00' },
      { date: 14, month: 1, year: 2026, member: 'kathy', event: 'Book Club', time: '19:00' },
      { date: 15, month: 1, year: 2026, member: 'virginia', event: 'Ballet Rehearsal', time: '16:00' },
      { date: 15, month: 1, year: 2026, member: 'schelli', event: 'Family Dinner', time: '19:00' },
      { date: 18, month: 1, year: 2026, member: 'kathy', event: 'Hairdresser', time: '14:30' },
      { date: 21, month: 1, year: 2026, member: 'virginia', event: "Anna's Birthday", time: '15:00' },
      { date: 25, month: 1, year: 2026, member: 'schelli', event: 'Project Deadline', time: '17:00' },
      { date: 28, month: 1, year: 2026, member: 'kathy', event: 'Parent Evening', time: '18:30' }
    ]
  }
  return events[language]
}
