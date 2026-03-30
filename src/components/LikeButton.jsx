import Icon from './Icon.jsx'

function LikeButton({ liked, count, busy = false, onToggle }) {
  return (
    <button
      className={`btn ${liked ? 'btn-dark' : 'btn-outline-secondary'} d-inline-flex align-items-center gap-2 rounded-pill px-3 py-2`}
      type="button"
      disabled={busy}
      onClick={onToggle}
    >
      <Icon name="like" />
      {busy ? '...' : count}
    </button>
  )
}

export default LikeButton
