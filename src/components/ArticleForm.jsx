function ArticleForm({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    onSubmit?.({
      title: formData.get('title'),
      content: formData.get('content'),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Titre" />
      <textarea name="content" placeholder="Contenu" />
      <button type="submit">Enregistrer</button>
    </form>
  )
}

export default ArticleForm
