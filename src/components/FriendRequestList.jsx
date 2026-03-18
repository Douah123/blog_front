import Avatar from './Avatar.jsx'

function FriendRequestList({ requests, onAccept, onReject }) {
  if (!requests.length) {
    return <div className="panel empty-state">Aucune demande en attente.</div>
  }

  return (
    <div className="list-stack">
      {requests.map((request) => (
        <article key={request.id} className="panel user-card">
          <div className="user-identity">
            <Avatar user={request} />
            <div>
              <h3>{request.fullname}</h3>
              <p className="muted">@{request.username}</p>
            </div>
          </div>
          <div className="inline-actions">
            <button className="button button-secondary" type="button" onClick={() => onAccept(request.requester_id)}>
              Accepter
            </button>
            <button className="button button-ghost" type="button" onClick={() => onReject(request.requester_id)}>
              Refuser
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

export default FriendRequestList
