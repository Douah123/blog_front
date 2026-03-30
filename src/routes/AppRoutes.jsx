import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { matchRoute, navigateTo, parseHashLocation } from '../utils/app.js'
import DashboardPage from '../pages/DashboardPage.jsx'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage.jsx'
import MyArticlesPage from '../pages/MyArticlesPage.jsx'
import CreateArticlePage from '../pages/CreateArticlePage.jsx'
import EditArticlePage from '../pages/EditArticlePage.jsx'
import ArticleDetailsPage from '../pages/ArticleDetailsPage.jsx'
import SearchUsersPage from '../pages/SearchUsersPage.jsx'
import FriendRequestsPage from '../pages/FriendRequestsPage.jsx'
import FriendsPage from '../pages/FriendsPage.jsx'
import MessagesPage from '../pages/MessagesPage.jsx'
import NotificationsPage from '../pages/NotificationsPage.jsx'
import EditProfilePage from '../pages/EditProfilePage.jsx'

const routes = [
  { pattern: '/', component: DashboardPage, protected: true },
  { pattern: '/login', component: LoginPage, guestOnly: true },
  { pattern: '/register', component: RegisterPage, guestOnly: true },
  { pattern: '/my-articles', component: MyArticlesPage, protected: true },
  { pattern: '/articles/new', component: CreateArticlePage, protected: true },
  { pattern: '/articles/:articleId/edit', component: EditArticlePage, protected: true },
  { pattern: '/articles/:articleId', component: ArticleDetailsPage, protected: true },
  { pattern: '/users', component: SearchUsersPage, protected: true },
  { pattern: '/friend-requests', component: FriendRequestsPage, protected: true },
  { pattern: '/friends', component: FriendsPage, protected: true },
  { pattern: '/messages', component: MessagesPage, protected: true },
  { pattern: '/notifications', component: NotificationsPage, protected: true },
  { pattern: '/profile/edit', component: EditProfilePage, protected: true },
]

function getCurrentRoute() {
  const location = parseHashLocation()

  for (const route of routes) {
    const params = matchRoute(location.pathname, route.pattern)
    if (params) {
      return { route, params, ...location }
    }
  }

  return { route: null, params: {}, ...location }
}

function AppRoutes() {
  const { isAuthenticated, isInitializing } = useAuth()
  const [currentRoute, setCurrentRoute] = useState(() => getCurrentRoute())

  useEffect(() => {
    function handleHashChange() {
      setCurrentRoute(getCurrentRoute())
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (isInitializing) {
      return
    }

    if (!currentRoute.route) {
      navigateTo(isAuthenticated ? '/' : '/login')
      return
    }

    if (currentRoute.route.protected && !isAuthenticated) {
      navigateTo('/login')
      return
    }

    if (currentRoute.route.guestOnly && isAuthenticated) {
      navigateTo('/')
    }
  }, [currentRoute.route, isAuthenticated, isInitializing])

  if (isInitializing) {
    return (
      <main className="page-shell">
        <section className="panel centered-panel">
          <p className="muted">Chargement de votre espace...</p>
        </section>
      </main>
    )
  }

  if (!currentRoute.route) {
    return null
  }

  const RouteComponent = currentRoute.route.component

  return (
    <main className="page-shell">
      <RouteComponent params={currentRoute.params} searchParams={currentRoute.searchParams} />
    </main>
  )
}

export default AppRoutes
