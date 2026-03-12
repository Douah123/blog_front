function CommentList({ comments = [] }) {
  return (
    <section>
      <h3>Commentaires</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </section>
  )
}

export default CommentList
