function NotificationList({ notifications = [] }) {
  return (
    <section>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </section>
  )
}

export default NotificationList
