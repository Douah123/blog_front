function FriendRequestList({ requests = [] }) {
  return (
    <section>
      <h2>Demandes d'amis</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>{request.name}</li>
        ))}
      </ul>
    </section>
  )
}

export default FriendRequestList
