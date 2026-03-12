import FriendCard from './FriendCard.jsx'

function FriendList({ friends = [] }) {
  return (
    <section>
      <h2>Liste d'amis</h2>
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} />
      ))}
    </section>
  )
}

export default FriendList
