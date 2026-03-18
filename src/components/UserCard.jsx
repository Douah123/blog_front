import Avatar from './Avatar.jsx'

function UserCard({ user, actions }) {
  return (
    <article className="panel user-card">
      <div className="user-identity">
        <Avatar user={user} />
        <div>
          <h3>{user.fullname}</h3>
          <p className="muted">@{user.username}</p>
        </div>
      </div>
      <div className="inline-actions">{actions}</div>
    </article>
  )
}

export default UserCard
