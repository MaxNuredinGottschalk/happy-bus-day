// Tiny hash router: http://localhost:5173/#/e5  — lets everyone open any screen directly.
import { useSyncExternalStore } from 'react'

export function go(path: string) { window.location.hash = '#/' + path }
export function currentPath(): string { return window.location.hash.replace(/^#\/?/, '') || '' }

export function usePath(): string {
  return useSyncExternalStore(
    (cb) => { window.addEventListener('hashchange', cb); return () => window.removeEventListener('hashchange', cb) },
    currentPath,
  )
}
