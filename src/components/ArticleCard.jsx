function ArticleCard({ article }) {
  return (
    <article>
      <h3>{article?.title ?? 'Article'}</h3>
      
    </article>
  )
}

export default ArticleCard
