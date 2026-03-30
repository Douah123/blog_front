import { useEffect, useState } from 'react'
import { getMyChats } from '../api/messageApi.js'
import { getUnreadCount } from '../api/notificationApi.js'
import { getFriendRequests } from '../api/userApi.js'
import { useAuth } from '../context/AuthContext.jsx'
import {
  getErrorMessage,
  getSeenMessageConversationIds,
  navigateTo,
  parseHashLocation,
} from '../utils/app.js'
import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'

function NavLink({ href, label, badge, icon }) {
  const [pathname, setPathname] = useState(() => parseHashLocation().pathname)
  const isActive = pathname === href

  useEffect(() => {
    function handleHashChange() {
      setPathname(parseHashLocation().pathname)
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <a className={`nav-link${isActive ? ' is-active' : ''}`} href={`#${href}`}>
      <span className="nav-link__main">
        <Icon name={icon} />
        <span>{label}</span>
      </span>
      {badge > 0 ? <span className="nav-badge">{badge}</span> : null}
    </a>
  )
}

function Navbar() {
  const { isAuthenticated, user, token, logout } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)
  const [messagesCount, setMessagesCount] = useState(0)
  const [requestsCount, setRequestsCount] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated || !token) {
      return
    }

    let active = true

    const applyCounts = (notificationsResponse, chatsResponse, requestsResponse) => {
      if (!active) {
        return
      }

      const chatItems = chatsResponse.items ?? []
      const seenConversationIds = new Set(getSeenMessageConversationIds(user?.id))

      setUnreadCount(notificationsResponse.unread_count ?? 0)
      setMessagesCount(
        chatItems.filter((chat) => !seenConversationIds.has(String(chat.user_id))).length,
      )
      setRequestsCount(requestsResponse.pagination?.total ?? requestsResponse.items?.length ?? 0)
    }

    function refreshSidebarCounts() {
      Promise.all([
        getUnreadCount(token),
        getMyChats(token, { page: 1, per_page: 50 }),
        getFriendRequests(token, { page: 1, per_page: 1 }),
      ])
        .then(([notificationsResponse, chatsResponse, requestsResponse]) =>
          applyCounts(notificationsResponse, chatsResponse, requestsResponse),
        )
        .catch((err) => {
          if (active) {
            setError(getErrorMessage(err))
          }
        })
    }

    refreshSidebarCounts()
    const intervalId = window.setInterval(refreshSidebarCounts, 15000)

    window.addEventListener('messages-seen-updated', refreshSidebarCounts)
    window.addEventListener('friend-requests-updated', refreshSidebarCounts)
    window.addEventListener('notifications-updated', refreshSidebarCounts)

    return () => {
      active = false
      window.clearInterval(intervalId)
      window.removeEventListener('messages-seen-updated', refreshSidebarCounts)
      window.removeEventListener('friend-requests-updated', refreshSidebarCounts)
      window.removeEventListener('notifications-updated', refreshSidebarCounts)
    }
  }, [isAuthenticated, token, user?.id])

  async function handleLogout() {
    await logout()
    navigateTo('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <button className="brand-link" type="button" onClick={() => navigateTo(isAuthenticated ? '/' : '/login')}>
          <Icon name="article" />
          <span>Bloggo</span>
        </button>
        <p className="brand-subtitle">Blog personnel, lecture et echanges dans une interface calme et lisible.</p>
      </div>

      {isAuthenticated ? (
        <>
          <nav className="sidebar-nav">
            <NavLink href="/" label="Accueil" icon="home" />
            <NavLink href="/my-articles" label="Mes articles" icon="article" />
            <NavLink href="/users" label="Utilisateurs" icon="users" />
            <NavLink href="/friends" label="Amis" icon="friends" />
            <NavLink href="/friend-requests" label="Demandes" icon="requests" badge={requestsCount} />
            <NavLink href="/messages" label="Messages" icon="message" badge={messagesCount} />
            <NavLink href="/notifications" label="Notifications" icon="bell" badge={unreadCount} />
          </nav>

          <div className="sidebar-user panel">
            <div className="sidebar-profile">
              <Avatar user={user} size="lg" />
              <div>
                <strong>{user?.fullname || user?.username}</strong>
                <p className="muted">@{user?.username}</p>
                <p className="muted">Espace personnel</p>
              </div>
            </div>
            <button className="button button-ghost" type="button" onClick={() => navigateTo('/profile/edit')}>
              Modifier le profil
            </button>
            <button className="button button-secondary" type="button" onClick={handleLogout}>
              <Icon name="logout" />
              Deconnexion
            </button>
          </div>
        </>
      ) : null}

      {error ? <p className="inline-error">{error}</p> : null}
    </aside>
  )
}

export default Navbar
