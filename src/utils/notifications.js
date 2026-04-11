function readFromSources(sources, keys) {
  for (const source of sources) {
    if (!source || typeof source !== 'object') {
      continue
    }

    for (const key of keys) {
      const value = source[key]
      if (value !== undefined && value !== null && value !== '') {
        return value
      }
    }
  }

  return null
}

export function getNotificationArticleId(notification) {
  const directValue = readFromSources([notification], [
    'article_id',
    'articleId',
    'target_article_id',
    'targetArticleId',
    'resource_id',
    'resourceId',
    'target_id',
    'targetId',
  ])

  const nestedValue = readFromSources(
    [
      notification?.article,
      notification?.data,
      notification?.metadata,
      notification?.payload,
      notification?.target,
      notification?.resource,
    ],
    [
      'article_id',
      'articleId',
      'target_article_id',
      'targetArticleId',
      'resource_id',
      'resourceId',
      'target_id',
      'targetId',
      'id',
    ],
  )

  const value = directValue ?? nestedValue

  if (value === null) {
    return null
  }

  const normalizedValue = String(value)
  return normalizedValue ? normalizedValue : null
}

export function getNotificationArticleTitle(notification) {
  const directValue = readFromSources([notification], [
    'article_title',
    'articleTitle',
    'target_article_title',
    'targetArticleTitle',
    'resource_title',
    'resourceTitle',
  ])

  const nestedValue = readFromSources(
    [
      notification?.article,
      notification?.data,
      notification?.metadata,
      notification?.payload,
      notification?.target,
      notification?.resource,
    ],
    [
      'article_title',
      'articleTitle',
      'target_article_title',
      'targetArticleTitle',
      'resource_title',
      'resourceTitle',
      'title',
      'name',
    ],
  )

  const value = directValue ?? nestedValue

  if (typeof value !== 'string') {
    return null
  }

  const normalizedValue = value.trim()
  return normalizedValue ? normalizedValue : null
}
