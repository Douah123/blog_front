function CommentForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    onSubmit?.({ content: formData.get('content') })
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea name="content" placeholder="Ajouter un commentaire" />
      <button type="submit">Commenter</button>
    </form>
  )
}

export default CommentForm
