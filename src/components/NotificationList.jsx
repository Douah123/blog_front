import { formatDate } from '../utils/app.js'

function NotificationList({ notifications, onRead }) {
  if (!notifications.length) {
    return <div className="panel empty-state">Aucune notification.</div>
  }

  return (
    <div className="list-stack">
      {notifications.map((notification) => (
        <article key={notification.id} className={`panel notification-card${notification.is_read ? '' : ' is-unread'}`}>
          <div>
            <h3>{notification.title}</h3>
            <p>{notification.message}</p>
            <p className="muted">{formatDate(notification.created_at)}</p>
          </div>
          {!notification.is_read ? (
            <button className="button button-secondary" type="button" onClick={() => onRead(notification.id)}>
              Marquer comme lue
            </button>
          ) : null}
        </article>
      ))}
    </div>
  )
}

export default NotificationList
