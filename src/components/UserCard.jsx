function UserCard({ user }) {
  return (
    <article>
      <h3>{user?.name ?? 'Utilisateur'}</h3>
      <p>{user?.email ?? 'Email indisponible'}</p>
    </article>
  )
}

export default UserCard
