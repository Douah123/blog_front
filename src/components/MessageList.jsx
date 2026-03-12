function MessageList({ messages = [] }) {
  return (
    <section>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </section>
  )
}

export default MessageList
