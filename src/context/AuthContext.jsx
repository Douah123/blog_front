/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { getProfile, login as loginRequest, logout as logoutRequest, register as registerRequest } from '../api/authApi.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'blog_front_session'

function readSession() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    return rawValue ? JSON.parse(rawValue) : null
  } catch {
    return null
  }
}

function writeSession(session) {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function AuthProvider({ children }) {
  const storedSession = typeof window === 'undefined' ? null : readSession()
  const [user, setUser] = useState(storedSession?.user ?? null)
  const [token, setToken] = useState(storedSession?.token ?? '')
  const [isInitializing, setIsInitializing] = useState(Boolean(storedSession?.token))

  useEffect(() => {
    if (!token) {
      return
    }

    let active = true

    getProfile(token)
      .then((response) => {
        if (!active) {
          return
        }

        setUser(response.user)
        writeSession({ token, user: response.user })
      })
      .catch(() => {
        if (!active) {
          return
        }

        setUser(null)
        setToken('')
        writeSession(null)
      })
      .finally(() => {
        if (active) {
          setIsInitializing(false)
        }
      })

    return () => {
      active = false
    }
  }, [token])

  async function login(credentials) {
    const response = await loginRequest(credentials)
    setUser(response.user)
    setToken(response.access_token)
    writeSession({ token: response.access_token, user: response.user })
    return response.user
  }

  async function register(payload) {
    const response = await registerRequest(payload)
    setUser(response.user)
    setToken(response.access_token)
    writeSession({ token: response.access_token, user: response.user })
    return response.user
  }

  async function refreshProfile() {
    if (!token) {
      return null
    }

    const response = await getProfile(token)
    setUser(response.user)
    writeSession({ token, user: response.user })
    return response.user
  }

  async function logout() {
    const currentToken = token
    setUser(null)
    setToken('')
    writeSession(null)

    if (currentToken) {
      try {
        await logoutRequest(currentToken)
      } catch {
        // JWT logout is handled client-side in this app.
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(user && token),
        isInitializing,
        login,
        register,
        refreshProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
