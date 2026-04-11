import { formatDate, navigateTo } from '../utils/app.js'
import { getNotificationArticleId, getNotificationArticleTitle } from '../utils/notifications.js'

function NotificationList({ notifications, onRead }) {
  if (!notifications.length) {
    return <div className="panel empty-state">Aucune notification.</div>
  }

  return (
    <div className="list-stack">
      {notifications.map((notification) => {
        const articleId = notification.resolved_article_id ?? getNotificationArticleId(notification)
        const articleTitle = notification.resolved_article_title ?? getNotificationArticleTitle(notification)

        return (
          <article key={notification.id} className={`panel notification-card${notification.is_read ? '' : ' is-unread'}`}>
            <div className="notification-card__content">
              <div>
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                {articleTitle ? (
                  <button
                    className="notification-article"
                    type="button"
                    onClick={() => articleId && navigateTo(`/articles/${articleId}`)}
                    disabled={!articleId}
                  >
                    <span className="notification-article__label">Article concerné</span>
                    <strong>{articleTitle}</strong>
                  </button>
                ) : null}
                <p className="muted">{formatDate(notification.created_at)}</p>
              </div>
            </div>
            <div className="notification-card__actions">
              {articleId ? (
                <button className="button-ghost notification-action-button" type="button" onClick={() => navigateTo(`/articles/${articleId}`)}>
                  Voir l'article
                </button>
              ) : null}
              {!notification.is_read ? (
                <button className="button-secondary notification-action-button" type="button" onClick={() => onRead(notification.id)}>
                  Marquer comme lue
                </button>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default NotificationList
