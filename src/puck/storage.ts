import type { Data } from '@measured/puck'

const STORAGE_KEY = 'sellerate:puck:data:v1'

function makeId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function ensureIdsInContent(content: any[] | undefined) {
  if (!Array.isArray(content)) return content
  return content.map((node, index) => {
    const props = (node?.props ?? {}) as Record<string, unknown>
    const id = typeof props.id === 'string' && props.id.length > 0 ? props.id : `${node?.type ?? 'Block'}-${index}-${makeId()}`
    return {
      ...node,
      props: {
        ...props,
        id,
      },
    }
  })
}

function normalizePuckData(data: any): Data | null {
  if (!data || typeof data !== 'object') return null

  const normalized: any = {
    ...data,
    root: data.root ?? { props: {} },
    content: ensureIdsInContent(data.content),
  }

  if (normalized.root && typeof normalized.root === 'object' && !('props' in normalized.root)) {
    normalized.root = { ...normalized.root, props: {} }
  }
  if (normalized.root && typeof normalized.root === 'object' && normalized.root.props == null) {
    normalized.root = { ...normalized.root, props: {} }
  }

  if (normalized.zones && typeof normalized.zones === 'object') {
    const zones: Record<string, any> = {}
    for (const [zoneKey, zoneValue] of Object.entries(normalized.zones)) {
      zones[zoneKey] = ensureIdsInContent(zoneValue as any[])
    }
    normalized.zones = zones
  }

  return normalized as Data
}

export function loadPuckData(): Data | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    const normalized = normalizePuckData(parsed)
    if (normalized) {
      // Speichere zurück, damit künftige Loads sauber sind
      savePuckData(normalized)
    }
    return normalized
  } catch {
    return null
  }
}

export function savePuckData(data: Data) {
  try {
    const normalized = normalizePuckData(data) ?? data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  } catch {
    // ignore
  }
}

export function clearPuckData() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}


