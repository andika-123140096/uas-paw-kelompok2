export function initTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
      return
    }
    if (stored === 'light') {
      document.documentElement.classList.remove('dark')
      return
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
    }
  } catch (e) { /* ignore */ }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light') } catch (e) {}
  return isDark
}

export function getTheme() {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
