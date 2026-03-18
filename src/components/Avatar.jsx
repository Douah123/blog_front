import { resolveApiUrl } from '../api/axios.js'

function Avatar({ user, size = 'md' }) {
  const label = user?.fullname || user?.username || 'U'
  const initial = label.charAt(0).toUpperCase()
  const src = user?.avatar_url ? resolveApiUrl(user.avatar_url) : ''

  return src ? (
    <img className={`avatar avatar-${size}`} src={src} alt={label} />
  ) : (
    <span className={`avatar avatar-${size} avatar-fallback`} aria-hidden="true">
      {initial}
    </span>
  )
}

export default Avatar
