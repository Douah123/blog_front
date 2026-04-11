import { useEffect, useState } from 'react'
import { acceptFriendRequest, getFriendRequests, rejectFriendRequest } from '../api/userApi.js'
import FriendRequestList from '../components/FriendRequestList.jsx'
import Pagination from '../components/Pagination.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, notifyFriendRequestsUpdated } from '../utils/app.js'

function FriendRequestsPage() {
  const { token } = useAuth()
  const [requests, setRequests] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    function loadRequests() {
      getFriendRequests(token, { page, per_page: 10 })
        .then((response) => {
          if (active) {
            setRequests(response.items ?? [])
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
    }

    loadRequests()
    const intervalId = window.setInterval(loadRequests, 15000)

    return () => {
      active = false
      window.clearInterval(intervalId)
    }
  }, [page, token])

  async function handleAccept(requesterId) {
    try {
      await acceptFriendRequest(token, requesterId)
      setRequests((current) => current.filter((request) => request.requester_id !== requesterId))
      setPagination((current) =>
        current ? { ...current, total: Math.max((current.total ?? 1) - 1, 0) } : current,
      )
      notifyFriendRequestsUpdated()
    } catch (err) {
      setError(getErrorMessage(err, 'Acceptation impossible.'))
    }
  }

  async function handleReject(requesterId) {
    try {
      await rejectFriendRequest(token, requesterId)
      setRequests((current) => current.filter((request) => request.requester_id !== requesterId))
      setPagination((current) =>
        current ? { ...current, total: Math.max((current.total ?? 1) - 1, 0) } : current,
      )
      notifyFriendRequestsUpdated()
    } catch (err) {
      setError(getErrorMessage(err, 'Refus impossible.'))
    }
  }

  function handlePageChange(nextPage) {
    setError('')
    setPage(nextPage)
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Relations</p>
          <h1>Demandes d’amis</h1>
        </div>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {loading && requests.length === 0 ? <div className="panel">Chargement...</div> : <FriendRequestList requests={requests} onAccept={handleAccept} onReject={handleReject} />}
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </section>
  )
}

export default FriendRequestsPage
