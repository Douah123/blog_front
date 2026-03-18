import { useState } from 'react'

function CommentForm({ onSubmit, busy = false, initialValue = '', submitLabel = 'Publier' }) {
  const [content, setContent] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(content, () => setContent(''))
  }

  return (
    <form className="stack-form compact-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Commentaire</span>
        <textarea
          rows="4"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Ajouter un commentaire"
          required
        />
      </label>
      <button className="button" type="submit" disabled={busy}>
        {busy ? 'Envoi...' : submitLabel}
      </button>
    </form>
  )
}

export default CommentForm
