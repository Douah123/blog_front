function UserSearch({ onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSearch?.(formData.get('query'))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="query" placeholder="Rechercher un utilisateur" />
      <button type="submit">Rechercher</button>
    </form>
  )
}

export default UserSearch
