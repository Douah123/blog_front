import { useEffect, useState } from 'react'
import { getArticleById, updateArticle } from '../api/articleApi.js'
import ArticleForm from '../components/ArticleForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, navigateTo } from '../utils/app.js'

function EditArticlePage({ params }) {
  const { token } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    getArticleById(token, params.articleId)
      .then((response) => {
        if (active) {
          setArticle(response.article)
        }
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, "Chargement de l’article impossible."))
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [params.articleId, token])

  async function handleSubmit(values) {
    setBusy(true)
    setError('')

    try {
      await updateArticle(token, params.articleId, values)
      navigateTo(`/articles/${params.articleId}`)
    } catch (err) {
      setError(getErrorMessage(err, 'Modification impossible.'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Edition</p>
          <h1>Modifier l’article</h1>
        </div>
      </div>
      {error ? <p className="inline-error">{error}</p> : null}
      {loading ? <div className="panel">Chargement...</div> : null}
      {!loading && article ? (
        <div className="panel">
          <ArticleForm initialValues={article} onSubmit={handleSubmit} submitLabel="Mettre à jour" busy={busy} />
        </div>
      ) : null}
    </section>
  )
}

export default EditArticlePage
