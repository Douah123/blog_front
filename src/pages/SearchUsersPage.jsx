import { useState } from 'react'
import { searchUsers, sendFriendRequest } from '../api/userApi.js'
import UserCard from '../components/UserCard.jsx'
import UserSearch from '../components/UserSearch.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../utils/app.js'

function SearchUsersPage() {
  const { token } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [busy, setBusy] = useState(false)
  const [requestingUserId, setRequestingUserId] = useState(null)
  const [requestedUserIds, setRequestedUserIds] = useState([])
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  async function handleSearch(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setInfo('')

    try {
      const response = await searchUsers(token, query, { page: 1, per_page: 20 })
      setResults(response.items ?? [])
      setRequestedUserIds([])
    } catch (err) {
      setError(getErrorMessage(err, 'Recherche impossible.'))
    } finally {
      setBusy(false)
    }
  }

  async function handleRequest(userId) {
    setError('')
    setInfo('')
    setRequestingUserId(userId)

    try {
      const response = await sendFriendRequest(token, userId)
      setInfo(response.message || 'Invitation envoyée.')
      setRequestedUserIds((current) => [...new Set([...current, userId])])
    } catch (err) {
      setError(getErrorMessage(err, "Envoi de la demande impossible."))
    } finally {
      setRequestingUserId(null)
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Réseau</p>
          <h1>Rechercher des utilisateurs</h1>
        </div>
      </div>
      <div className="panel">
        <UserSearch value={query} onChange={setQuery} onSubmit={handleSearch} busy={busy} />
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {info ? <p className="inline-success">{info}</p> : null}
      <div className="list-stack">
        {results.map((item) => (
          <UserCard
            key={item.id}
            user={item}
            actions={
              <button
                className="button button-secondary"
                type="button"
                onClick={() => handleRequest(item.id)}
                disabled={requestingUserId === item.id || requestedUserIds.includes(item.id)}
              >
                {requestingUserId === item.id
                  ? 'Envoi...'
                  : requestedUserIds.includes(item.id)
                    ? 'Ajouté'
                    : 'Ajouter'}
              </button>
            }
          />
        ))}
      </div>
    </section>
  )
}

export default SearchUsersPage
