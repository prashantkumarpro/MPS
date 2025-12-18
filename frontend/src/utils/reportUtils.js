// 🥇 Position text (1st, 2nd, 3rd...)
export function getPositionText (position) {
  if (!position) return ''

  const j = position % 10
  const k = position % 100

  if (j === 1 && k !== 11) return position + 'st'
  if (j === 2 && k !== 12) return position + 'nd'
  if (j === 3 && k !== 13) return position + 'rd'
  return position + 'th'
}

// 🟥 Fail mark highlight
export function getMarkCellClass (mark) {
  if (mark === null || mark < 15) {
    return 'bg-red-200 text-red-800 font-semibold'
  }
  return ''
}

// 🔤 Normalize class
function normalizeClass (studentClass) {
  const cls = String(studentClass).toUpperCase()

  // 🔹 UKG sections → UKG
  if (cls.startsWith('UKG')) return 'UKG'

  // 🔹 LKG sections → LKG (future-proof)
  if (cls.startsWith('LKG')) return 'LKG'

  return cls
}

// 🧠 Class helpers
function isNursery (cls) {
  return cls === 'NURSERY'
}

function isPg (cls) {
  return cls === 'PG'
}

function isKg (cls) {
  return ['LKG', 'UKG'].includes(cls)
}

function isPrimary (cls) {
  return ['I', 'II', 'III', 'IV', 'V', 'VI'].includes(cls)
}

// 📘 Get subjects based on class
export function getSubjectRows (report, studentClass) {
  const cls = normalizeClass(studentClass)

  // 🔹 Nursery
  if (isNursery(cls)) {
    return [
      ['ENGLISH', report.english, 50],
      ['MATH', report.math, 50],
      ['HINDI', report.hindi, 50],
      ['TABLE', report.table, 50],
      ['RHYMES', report.rhymes, 50],
      ['ART/EVS', report.art, 'GRADE']
    ]
  }

  // 🔹 PG
  if (isPg(cls)) {
    return [
      ['ENGLISH', report.english, 50],
      ['MATH', report.math, 50],
      ['HINDI', report.hindi, 50],
      ['TABLE', report.table, 50],
      ['RHYMES', report.rhymes, 50],
      ['ART/EVS', report.art, 'GRADE']
    ]
  }

  // 🔹 LKG & UKG
  if (isKg(cls)) {
    return [
      ['ENGLISH', report.english, 50],
      ['MATH', report.math, 50],
      ['HINDI', report.hindi, 50],
      ['TABLE', report.table, 50],
      ['RHYMES', report.rhymes, 50],
      ['GENERAL KNOWLEDGE', report.gk, 50],
      ['ART/EVS', report.art, 'GRADE']
    ]
  }

  // 🔹 Class I – VI
  if (isPrimary(cls)) {
    return [
      ['ENGLISH', report.english, 50],
      ['MATH', report.math, 50],
      ['HINDI', report.hindi, 50],
      ['SCIENCE', report.science, 50],
      ['SOCIAL STUDIES', report.socialStudies, 50],
      ['GENERAL KNOWLEDGE', report.gk, 50],
      ['ART/EVS', report.art, 'GRADE']
    ]
  }

  return []
}

// 📊 Total full marks logic
export function getTotalFullMarks (studentClass) {
  const cls = normalizeClass(studentClass)
  return cls === 'NURSERY' ? 250 : 300
}
