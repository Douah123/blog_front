function FriendCard({ friend }) {
  return (
    <article>
      <h3>{friend?.name ?? 'Ami'}</h3>
      <p>{friend?.status ?? 'Statut indisponible'}</p>
    </article>
  )
}

export default FriendCard
