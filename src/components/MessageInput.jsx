function MessageInput({ onSend }) {
  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    onSend?.(formData.get('message'))
    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="message" placeholder="Votre message" />
      <button type="submit">Envoyer</button>
    </form>
  )
}

export default MessageInput
