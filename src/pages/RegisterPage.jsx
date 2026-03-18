import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, navigateTo } from '../utils/app.js'

function RegisterPage() {
  const { register } = useAuth()
  const [form, setForm] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')

    try {
      await register(form)
      navigateTo('/')
    } catch (err) {
      setError(getErrorMessage(err, 'Inscription impossible.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-layout">
      <form className="panel stack-form auth-form" onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        <p className="muted">
          Mot de passe : 8 caractères minimum, une majuscule initiale et un chiffre.
        </p>
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
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label className="field">
          <span>Mot de passe</span>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        {error ? <p className="inline-error">{error}</p> : null}
        <button className="button auth-submit" type="submit" disabled={busy}>
          {busy ? 'Création...' : 'Créer le compte'}
        </button>
        <button className="text-button" type="button" onClick={() => navigateTo('/login')}>
          Retour à la connexion
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
