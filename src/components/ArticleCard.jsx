function ArticleCard({ article }) {
  return (
    <article>
      <h3>{article?.title ?? 'Article'}</h3>
      <p>{article?.content ?? "Contenu de l'article."}</p>
    </article>
  )
}

export default ArticleCard
