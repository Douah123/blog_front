import { useState } from 'react'
import { createArticle } from '../api/articleApi.js'
import ArticleForm from '../components/ArticleForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, navigateTo } from '../utils/app.js'

function CreateArticlePage() {
  const { token } = useAuth()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(values) {
    setBusy(true)
    setError('')

    try {
      const response = await createArticle(token, values)
      navigateTo(`/articles/${response.article.id}`)
    } catch (err) {
      setError(getErrorMessage(err, 'Creation impossible.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Redaction</p>
          <h1>Nouvel article</h1>
          <p className="muted">Une mise en page simple pour rediger sans distraction.</p>
        </div>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      <div className="panel">
        <ArticleForm onSubmit={handleSubmit} submitLabel="Publier" busy={busy} />
      </div>
    </section>
  )
}

export default CreateArticlePage
