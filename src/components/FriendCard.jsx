import { navigateTo } from '../utils/app.js'
import Avatar from './Avatar.jsx'

function FriendCard({ friend, onRemove, onBlock, onUnblock }) {
  const isBlocked = Boolean(friend.status === 'blocked' || friend.is_blocked)

  return (
    <article className="panel user-card">
      <div className="user-identity">
        <Avatar user={friend} />
        <div>
          <h3>{friend.fullname}</h3>
          <p className="muted">@{friend.username}</p>
          {isBlocked ? <p className="muted">Utilisateur bloqué</p> : null}
        </div>
      </div>
      <div className="inline-actions">
        <button
          className="button button-secondary"
          type="button"
          disabled={isBlocked}
          onClick={() =>
            navigateTo(
              `/messages?user=${friend.id}&name=${encodeURIComponent(friend.fullname || friend.username)}`,
            )
          }
        >
          Message
        </button>
        {!isBlocked ? (
          <>
            <button className="button button-ghost" type="button" onClick={() => onRemove(friend.id)}>
              Retirer
            </button>
            <button className="text-button danger" type="button" onClick={() => onBlock(friend.id)}>
              Bloquer
            </button>
          </>
        ) : (
          <button className="button button-ghost" type="button" onClick={() => onUnblock(friend.id)}>
            Débloquer
          </button>
        )}
      </div>
    </article>
  )
}

export default FriendCard
