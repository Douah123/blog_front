import { useEffect, useState } from 'react'
import { deleteArticle, getMyArticles } from '../api/articleApi.js'
import { likeArticle, unlikeArticle } from '../api/likeApi.js'
import ArticleList from '../components/ArticleList.jsx'
import Pagination from '../components/Pagination.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, navigateTo } from '../utils/app.js'

function MyArticlesPage() {
  const { token } = useAuth()
  const [articles, setArticles] = useState([])
  const [pagination, setPagination] = useState(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyArticleId, setBusyArticleId] = useState(null)

  useEffect(() => {
    let active = true
    setError('')

    getMyArticles(token, { page, per_page: 10 })
      .then((response) => {
        if (!active) {
          return
        }

        setArticles(response.items ?? [])
        setPagination(response.pagination ?? null)
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Impossible de charger vos articles.'))
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
  }, [page, token])

  async function handleDelete(articleId) {
    try {
      await deleteArticle(token, articleId)
      setArticles((current) => current.filter((article) => article.id !== articleId))
    } catch (err) {
      setError(getErrorMessage(err, 'Suppression impossible.'))
    }
  }

  async function handleLikeToggle(article) {
    setBusyArticleId(article.id)
    try {
      if (article.liked_by_current_user) {
        await unlikeArticle(token, article.id)
        setArticles((current) =>
          current.map((item) =>
            item.id === article.id
              ? { ...item, liked_by_current_user: false, likes_count: Math.max((item.likes_count ?? 1) - 1, 0) }
              : item,
          ),
        )
      } else {
        await likeArticle(token, article.id)
        setArticles((current) =>
          current.map((item) =>
            item.id === article.id
              ? { ...item, liked_by_current_user: true, likes_count: (item.likes_count ?? 0) + 1 }
              : item,
          ),
        )
      }
    } catch (err) {
      setError(getErrorMessage(err, "Action sur le like impossible."))
    } finally {
      setBusyArticleId(null)
    }
  }

  return (
    <section className="page-grid">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Publication</p>
          <h1>Mes articles</h1>
          <p className="muted">Retrouvez vos publications privees comme publiques dans une presentation plus nette.</p>
        </div>
        <button className="button" type="button" onClick={() => navigateTo('/articles/new')}>
          Nouvel article
        </button>
      </div>

      {error ? <p className="inline-error">{error}</p> : null}
      {loading && articles.length === 0 ? <div className="panel">Chargement...</div> : null}

      {!loading || articles.length > 0 ? (
        <>
          <ArticleList
            articles={articles}
            emptyMessage="Vous n'avez encore publie aucun article."
            onLikeToggle={handleLikeToggle}
            busyArticleId={busyArticleId}
            renderActions={(article) => (
              <>
                <button className="button button-secondary" type="button" onClick={() => navigateTo(`/articles/${article.id}/edit`)}>
                  Modifier
                </button>
                <button className="button button-ghost" type="button" onClick={() => handleDelete(article.id)}>
                  Supprimer
                </button>
              </>
            )}
          />
          <Pagination pagination={pagination} onPageChange={setPage} />
        </>
      ) : null}
    </section>
  )
}

export default MyArticlesPage
