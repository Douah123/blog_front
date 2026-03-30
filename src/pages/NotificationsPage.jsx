import { useEffect, useState } from 'react'
import { getNotifications, markAllNotificationsRead, markNotificationRead } from '../api/notificationApi.js'
import NotificationList from '../components/NotificationList.jsx'
import Pagination from '../components/Pagination.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, notifyNotificationsUpdated } from '../utils/app.js'

function NotificationsPage() {
  const { token } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getNotifications(token, { page, per_page: 10 })
      .then((response) => {
        if (active) {
          setNotifications(response.items ?? [])
          setPagination(response.pagination ?? null)
        }
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Chargement impossible.'))
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [page, token])

  async function handleRead(notificationId) {
    try {
      await markNotificationRead(token, notificationId)
      setNotifications((current) =>
        current.map((item) => (item.id === notificationId ? { ...item, is_read: true } : item)),
      )
      notifyNotificationsUpdated()
    } catch (err) {
      setError(getErrorMessage(err, 'Operation impossible.'))
    }
  }

  async function handleReadAll() {
    try {
      await markAllNotificationsRead(token)
      setNotifications((current) => current.map((item) => ({ ...item, is_read: true })))
      notifyNotificationsUpdated()
    } catch (err) {
      setError(getErrorMessage(err, 'Operation impossible.'))
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Suivi</p>
          <h1>Notifications</h1>
          <p className="muted">Un panneau plus lisible pour les activites recentes.</p>
        </div>
        <button className="button button-secondary" type="button" onClick={handleReadAll}>
          Tout marquer comme lu
        </button>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {loading ? <div className="panel">Chargement...</div> : <NotificationList notifications={notifications} onRead={handleRead} />}
      <Pagination pagination={pagination} onPageChange={setPage} />
    </section>
  )
}

export default NotificationsPage
