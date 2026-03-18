import ArticleCard from './ArticleCard.jsx'

function ArticleList({ articles, emptyMessage, onLikeToggle, busyArticleId, renderActions, showExcerpt = true }) {
  if (!articles.length) {
    return <div className="panel empty-state">{emptyMessage}</div>
  }

  return (
    <div className="list-stack">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          showExcerpt={showExcerpt}
          onLikeToggle={onLikeToggle ? () => onLikeToggle(article) : undefined}
          likeBusy={busyArticleId === article.id}
          actions={renderActions ? renderActions(article) : null}
        />
      ))}
    </div>
  )
}

export default ArticleList
