import { useState } from 'react'

function MessageInput({ onSend, disabled = false }) {
  const [content, setContent] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSend(content).then(() => setContent(''))
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <textarea
        rows="3"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Écrire un message"
        disabled={disabled}
        required
      />
      <button className="button" type="submit" disabled={disabled}>
        Envoyer
      </button>
    </form>
  )
}

export default MessageInput
