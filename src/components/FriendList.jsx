import FriendCard from './FriendCard.jsx'

function FriendList({ friends, onRemove, onBlock, onUnblock }) {
  if (!friends.length) {
    return <div className="panel empty-state">Votre liste d'amis est vide.</div>
  }

  return (
    <div className="list-stack">
      {friends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          onRemove={onRemove}
          onBlock={onBlock}
          onUnblock={onUnblock}
        />
      ))}
    </div>
  )
}

export default FriendList
