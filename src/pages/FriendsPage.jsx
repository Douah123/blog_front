import { useEffect, useState } from 'react'
import { blockUser, getFriends, removeFriend, unblockUser } from '../api/userApi.js'
import FriendList from '../components/FriendList.jsx'
import Pagination from '../components/Pagination.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../utils/app.js'

function FriendsPage() {
  const { token } = useAuth()
  const [friends, setFriends] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getFriends(token, { page, per_page: 10 })
      .then((response) => {
        if (active) {
          setFriends(response.items ?? [])
          setPagination(response.pagination ?? null)
        }
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Chargement des amis impossible.'))
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

  async function handleRemove(friendId) {
    setError('')

    try {
      await removeFriend(token, friendId)
      setFriends((current) => current.filter((friend) => friend.id !== friendId))
    } catch (err) {
      const message = getErrorMessage(err, 'Suppression impossible.')

      if (message.includes("Aucune relation d'amitié trouvée")) {
        setFriends((current) => current.filter((friend) => friend.id !== friendId))
        return
      }

      setError(message)
    }
  }

  async function handleBlock(friendId) {
    try {
      await blockUser(token, friendId)
      setFriends((current) =>
        current.map((friend) =>
          friend.id === friendId
            ? { ...friend, status: 'blocked', is_blocked: true }
            : friend,
        ),
      )
    } catch (err) {
      setError(getErrorMessage(err, 'Blocage impossible.'))
    }
  }

  async function handleUnblock(friendId) {
    try {
      await unblockUser(token, friendId)
      setFriends((current) =>
        current.map((friend) =>
          friend.id === friendId
            ? { ...friend, status: 'accepted', is_blocked: false }
            : friend,
        ),
      )
    } catch (err) {
      setError(getErrorMessage(err, 'Déblocage impossible.'))
    }
  }

  function handlePageChange(nextPage) {
    setLoading(true)
    setPage(nextPage)
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Réseau</p>
          <h1>Mes amis</h1>
        </div>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {loading ? (
        <div className="panel">Chargement...</div>
      ) : (
        <FriendList
          friends={friends}
          onRemove={handleRemove}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
        />
      )}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </section>
  )
}

export default FriendsPage
