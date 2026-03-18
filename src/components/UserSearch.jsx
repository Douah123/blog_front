function UserSearch({ value, onChange, onSubmit, busy = false }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Rechercher par username ou nom complet"
      />
      <button className="button" type="submit" disabled={busy}>
        {busy ? 'Recherche...' : 'Rechercher'}
      </button>
    </form>
  )
}

export default UserSearch
