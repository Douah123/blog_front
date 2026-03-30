import { useEffect, useState } from 'react'
import { updateMyProfile, uploadMyAvatar } from '../api/userApi.js'
import Avatar from '../components/Avatar.jsx'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../utils/app.js'

function EditProfilePage() {
  const { user, token, refreshProfile } = useAuth()
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setForm((current) => ({
      ...current,
      username: user?.username ?? '',
      fullname: user?.fullname ?? '',
      email: user?.email ?? '',
    }))
  }, [user?.email, user?.fullname, user?.username])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleAvatarChange(event) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      await uploadMyAvatar(token, file)
      await refreshProfile()
      setSuccess('Photo de profil mise a jour.')
    } catch (err) {
      setError(getErrorMessage(err, "Mise a jour de l'avatar impossible."))
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!form.username.trim() || !form.fullname.trim() || !form.email.trim()) {
      setError('Username, nom complet et email sont obligatoires.')
      return
    }

    const isUpdatingPassword =
      Boolean(form.currentPassword) || Boolean(form.newPassword) || Boolean(form.confirmPassword)

    if (isUpdatingPassword && (!form.currentPassword || !form.newPassword || !form.confirmPassword)) {
      setError("Pour changer le mot de passe, renseignez l'ancien, le nouveau et la confirmation.")
      return
    }

    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    const payload = {
      username: form.username.trim(),
      fullname: form.fullname.trim(),
      email: form.email.trim(),
    }

    if (isUpdatingPassword) {
      payload.current_password = form.currentPassword
      payload.new_password = form.newPassword
      payload.confirm_password = form.confirmPassword
    }

    setBusy(true)

    try {
      await updateMyProfile(token, payload)
      await refreshProfile()
      setForm((current) => ({
        ...current,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
      setSuccess('Profil mis a jour avec succes.')
    } catch (err) {
      setError(getErrorMessage(err, 'Modification du profil impossible.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Profil</p>
          <h1>Modifier le profil</h1>
          <p className="muted">Mettez a jour votre photo, vos informations et votre mot de passe au meme endroit.</p>
        </div>
      </div>

      {error ? <p className="inline-error">{error}</p> : null}
      {success ? <p className="inline-success">{success}</p> : null}

      <div className="profile-edit-grid">
        <section className="panel profile-summary-panel">
          <div className="profile-summary-card">
            <Avatar user={user} size="lg" />
            <div className="profile-summary-copy">
              <h2>{user?.fullname || user?.username}</h2>
              <p className="muted">@{user?.username}</p>
              <p className="muted">{user?.email}</p>
            </div>
          </div>

          <label className="button button-ghost upload-button profile-upload-button">
            <Icon name="upload" />
            {uploading ? 'Envoi...' : 'Changer la photo'}
            <input type="file" accept="image/*" onChange={handleAvatarChange} disabled={uploading} />
          </label>
        </section>

        <form className="panel stack-form" onSubmit={handleSubmit} autoComplete="off">
          <label className="field">
            <span>Username</span>
            <input name="username" value={form.username} onChange={handleChange} required />
          </label>

          <label className="field">
            <span>Nom complet</span>
            <input name="fullname" value={form.fullname} onChange={handleChange} required />
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" required />
          </label>

          <label className="field">
            <span>Ancien mot de passe</span>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Obligatoire si vous changez le mot de passe"
              autoComplete="current-password"
            />
          </label>

          <label className="field">
            <span>Nouveau mot de passe</span>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Laisser vide pour conserver l'actuel"
              autoComplete="new-password"
            />
          </label>

          <label className="field">
            <span>Confirmer le mot de passe</span>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="A renseigner seulement si vous changez le mot de passe"
              autoComplete="new-password"
            />
          </label>

          <p className="muted">Mot de passe : 8 caracteres minimum, une majuscule initiale et un chiffre.</p>

          <button className="button" type="submit" disabled={busy || uploading}>
            {busy ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default EditProfilePage
