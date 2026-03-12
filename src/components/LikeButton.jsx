function LikeButton({ count = 0, onLike }) {
  return <button onClick={onLike}>J&apos;aime ({count})</button>
}

export default LikeButton
