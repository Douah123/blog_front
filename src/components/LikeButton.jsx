import Icon from './Icon.jsx'

function LikeButton({ liked, count, busy = false, onToggle }) {
  return (
    <button
      className={`button button-secondary${liked ? ' is-liked' : ''}`}
      type="button"
      disabled={busy}
      onClick={onToggle}
    >
      <Icon name="like" />
      {busy ? '...' : liked ? `Aime (${count})` : `J'aime (${count})`}
    </button>
  )
}

export default LikeButton
