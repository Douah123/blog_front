import { useEffect, useState } from 'react'
import { getArticleById } from '../api/articleApi.js'
import { createComment, deleteComment, getCommentsByArticle, updateComment } from '../api/commentApi.js'
import { getArticleLikes, likeArticle, unlikeArticle } from '../api/likeApi.js'
import ArticleCard from '../components/ArticleCard.jsx'
import CommentForm from '../components/CommentForm.jsx'
import CommentList from '../components/CommentList.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage } from '../utils/app.js'

function countComments(items) {
  return items.reduce((total, item) => total + 1 + countComments(item.replies ?? []), 0)
}

function ArticleDetailsPage({ params }) {
  const { token, user } = useAuth()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentBusy, setCommentBusy] = useState(false)
  const [replyBusyId, setReplyBusyId] = useState(null)
  const [likeBusy, setLikeBusy] = useState(false)
  const [error, setError] = useState('')

  async function refreshComments() {
    const commentsResponse = await getCommentsByArticle(token, params.articleId, { page: 1, per_page: 50 })
    const nextComments = commentsResponse.items ?? []
    setComments(nextComments)
    setArticle((current) =>
      current
        ? {
            ...current,
            comments_count: countComments(nextComments),
          }
        : current,
    )
    return nextComments
  }

  useEffect(() => {
    let active = true

    Promise.all([
      getArticleById(token, params.articleId),
      getCommentsByArticle(token, params.articleId, { page: 1, per_page: 50 }),
      getArticleLikes(token, params.articleId, { page: 1, per_page: 50 }),
    ])
      .then(([articleResponse, commentsResponse, likesResponse]) => {
        if (!active) {
          return
        }

        const nextComments = commentsResponse.items ?? []
        setArticle({
          ...articleResponse.article,
          comments_count: countComments(nextComments),
        })
        setComments(nextComments)
        setLikes(likesResponse.likes ?? [])
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Chargement impossible.'))
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

  async function handleCommentSubmit(content, reset) {
    setCommentBusy(true)
    setError('')

    try {
      await createComment(token, { article_id: params.articleId, content })
      await refreshComments()
      reset()
    } catch (err) {
      setError(getErrorMessage(err, 'Commentaire impossible.'))
    } finally {
      setCommentBusy(false)
    }
  }

  async function handleReplySubmit(parentCommentId, content) {
    setReplyBusyId(parentCommentId)
    setError('')

    try {
      await createComment(token, {
        article_id: params.articleId,
        content,
        parent_comment_id: parentCommentId,
      })
      await refreshComments()
    } catch (err) {
      setError(getErrorMessage(err, 'Reponse impossible.'))
      throw err
    } finally {
      setReplyBusyId(null)
    }
  }

  async function handleCommentUpdate(commentId, content) {
    try {
      await updateComment(token, commentId, { content })
      await refreshComments()
    } catch (err) {
      setError(getErrorMessage(err, 'Modification du commentaire impossible.'))
      throw err
    }
  }

  async function handleCommentDelete(commentId) {
    try {
      await deleteComment(token, commentId)
      await refreshComments()
    } catch (err) {
      setError(getErrorMessage(err, 'Suppression du commentaire impossible.'))
    }
  }

  async function handleLikeToggle() {
    if (!article) {
      return
    }

    setLikeBusy(true)
    setError('')

    try {
      if (article.liked_by_current_user) {
        await unlikeArticle(token, article.id)
        setArticle((current) => ({
          ...current,
          liked_by_current_user: false,
          likes_count: Math.max((current.likes_count ?? 1) - 1, 0),
        }))
        setLikes((current) => current.filter((item) => item.user_id !== user.id))
      } else {
        await likeArticle(token, article.id)
        const likesResponse = await getArticleLikes(token, article.id, { page: 1, per_page: 50 })
        setArticle((current) => ({
          ...current,
          liked_by_current_user: true,
          likes_count: likesResponse.likes_count ?? (current.likes_count ?? 0) + 1,
        }))
        setLikes(likesResponse.likes ?? [])
      }
    } catch (err) {
      setError(getErrorMessage(err, "Action sur le like impossible."))
    } finally {
      setLikeBusy(false)
    }
  }

  return (
    <section className="page-grid">
      {error ? <p className="inline-error">{error}</p> : null}
      {loading ? <div className="panel">Chargement de l'article...</div> : null}

      {!loading && article ? (
        <>
          <ArticleCard article={article} showExcerpt={false} onLikeToggle={handleLikeToggle} likeBusy={likeBusy} />

          <section className="panel">
            <div className="section-heading">
              <h2>Lecteurs ayant aime</h2>
              <span className="muted">{likes.length} personnes</span>
            </div>
            {likes.length ? (
              <div className="tag-list">
                {likes.map((like) => (
                  <span key={like.id} className="tag">
                    {like.fullname || like.username}
                  </span>
                ))}
              </div>
            ) : (
              <p className="muted">Aucun like pour le moment.</p>
            )}
          </section>

          <section className="panel">
            <div className="section-heading">
              <h2>Commentaires</h2>
              <span className="muted">{article.comments_count ?? countComments(comments)} messages</span>
            </div>
            <CommentList
              comments={comments}
              currentUserId={user?.id}
              onUpdate={handleCommentUpdate}
              onDelete={handleCommentDelete}
              onReply={handleReplySubmit}
              replyBusyId={replyBusyId}
            />
            {article.allow_comments ? (
              <CommentForm onSubmit={handleCommentSubmit} busy={commentBusy} />
            ) : (
              <p className="muted">Les commentaires sont fermes sur cet article.</p>
            )}
          </section>
        </>
      ) : null}
    </section>
  )
}

export default ArticleDetailsPage
