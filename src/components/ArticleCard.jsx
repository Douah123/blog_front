import LikeButton from './LikeButton.jsx'
import Icon from './Icon.jsx'
import { excerpt, formatDate, navigateTo } from '../utils/app.js'

function ArticleCard({ article, showExcerpt = true, onLikeToggle, likeBusy = false, actions }) {
  return (
    <article className="article-card panel">
      <div className="article-card__header">
        <div>
          <button
            className="article-title-link"
            type="button"
            onClick={() => navigateTo(`/articles/${article.id}`)}
          >
            {article.title}
          </button>
          <p className="article-meta">
            {article.author_fullname || article.author_username || 'Auteur inconnu'} | {formatDate(article.created_at)}
          </p>
        </div>
        <span className={`status-badge${article.is_public ? '' : ' is-muted'}`}>
          {article.is_public ? 'Public' : 'Privé'}
        </span>
      </div>

      <p className="article-body">{showExcerpt ? excerpt(article.content) : article.content}</p>

      <div className="article-card__footer">
        <div className="article-stats">
          <LikeButton
            liked={Boolean(article.liked_by_current_user)}
            count={article.likes_count ?? 0}
            busy={likeBusy}
            onToggle={onLikeToggle}
          />
          <button
            className="text-button icon-text-button"
            type="button"
            onClick={() => navigateTo(`/articles/${article.id}`)}
          >
            <Icon name="comment" />
            {article.comments_count ?? 0} commentaires
          </button>
        </div>

        <div className="article-actions">
          <button
            className="button button-ghost"
            type="button"
            onClick={() => navigateTo(`/articles/${article.id}`)}
          >
            <Icon name="comment" />
            {article.allow_comments ? 'Commenter' : 'Voir'}
          </button>
          {actions}
        </div>
      </div>
    </article>
  )
}

export default ArticleCard
