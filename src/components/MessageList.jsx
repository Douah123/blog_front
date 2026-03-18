import { formatDate } from '../utils/app.js'

function MessageList({ messages, currentUserId }) {
  if (!messages.length) {
    return <div className="empty-state subtle">Aucun message dans cette conversation.</div>
  }

  return (
    <div className="message-list">
      {messages.map((message) => (
        <article
          key={message.id}
          className={`message-bubble${message.sender_id === currentUserId ? ' is-own' : ''}`}
        >
          <p>{message.content}</p>
          <span>{formatDate(message.created_at)}</span>
        </article>
      ))}
    </div>
  )
}

export default MessageList
