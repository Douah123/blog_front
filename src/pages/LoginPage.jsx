import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, navigateTo } from '../utils/app.js'

function LoginPage() {
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')

    try {
      await login({ email: identifier, password })
      navigateTo('/')
    } catch (err) {
      setError(getErrorMessage(err, 'Connexion impossible.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-layout">
      <form className="panel stack-form auth-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <label className="field">
          <span>Email ou nom d’utilisateur</span>
          <input value={identifier} onChange={(event) => setIdentifier(event.target.value)} required />
        </label>
        <label className="field">
          <span>Mot de passe</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? <p className="inline-error">{error}</p> : null}
        <button className="button auth-submit" type="submit" disabled={busy}>
          {busy ? 'Connexion...' : 'Se connecter'}
        </button>
        <button className="text-button" type="button" onClick={() => navigateTo('/register')}>
          Créer un compte
        </button>
      </form>
    </section>
  )
}

export default LoginPage
