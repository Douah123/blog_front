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
        <div className="auth-header">
          <p className="eyebrow">Inscription</p>
          <h2>Creer votre espace</h2>
          <p className="auth-note">Un compte simple pour publier, echanger et suivre votre cercle.</p>
        </div>
        <p className="muted">Mot de passe : 8 caracteres minimum, une majuscule initiale et un chiffre.</p>
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
          {busy ? 'Creation...' : 'Creer le compte'}
        </button>
        <button className="text-button" type="button" onClick={() => navigateTo('/login')}>
          Retour a la connexion
        </button>
      </form>
    </section>
  )
}

export default RegisterPage
