import ArticleCard from './ArticleCard.jsx'

function ArticleList({ articles = [] }) {
  return (
    <section>
      <h2>Articles</h2>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  )
}

export default ArticleList
