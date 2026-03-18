export function getErrorMessage(error, fallback = 'Une erreur est survenue.') {
  return error?.message || fallback
}

export function formatDate(value) {
  if (!value) {
    return 'Date indisponible'
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Date indisponible'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}

export function excerpt(content, limit = 220) {
  if (!content) {
    return ''
  }

  if (content.length <= limit) {
    return content
  }

  return `${content.slice(0, limit).trim()}...`
}

export function parseHashLocation() {
  const hash = window.location.hash.replace(/^#/, '') || '/'
  const [pathname, queryString = ''] = hash.split('?')
  return {
    pathname: pathname || '/',
    searchParams: new URLSearchParams(queryString),
  }
}

export function navigateTo(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`
}

export function matchRoute(pathname, pattern) {
  const pathParts = pathname.split('/').filter(Boolean)
  const patternParts = pattern.split('/').filter(Boolean)

  if (pathParts.length !== patternParts.length) {
    return null
  }

  const params = {}

  for (let index = 0; index < patternParts.length; index += 1) {
    const patternPart = patternParts[index]
    const pathPart = pathParts[index]

    if (patternPart.startsWith(':')) {
      params[patternPart.slice(1)] = decodeURIComponent(pathPart)
      continue
    }

    if (patternPart !== pathPart) {
      return null
    }
  }

  return params
}

function getSeenMessagesStorageKey(userId) {
  return `bloggo_seen_messages_${userId}`
}

export function getSeenMessageConversationIds(userId) {
  if (!userId || typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(getSeenMessagesStorageKey(userId))
    const parsed = rawValue ? JSON.parse(rawValue) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function markMessageConversationSeen(userId, conversationUserId) {
  if (!userId || !conversationUserId || typeof window === 'undefined') {
    return
  }

  const currentIds = new Set(getSeenMessageConversationIds(userId))
  currentIds.add(String(conversationUserId))
  window.localStorage.setItem(
    getSeenMessagesStorageKey(userId),
    JSON.stringify(Array.from(currentIds)),
  )
  window.dispatchEvent(new CustomEvent('messages-seen-updated'))
}

export function notifyFriendRequestsUpdated() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent('friend-requests-updated'))
}

export function notifyNotificationsUpdated() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new CustomEvent('notifications-updated'))
}
