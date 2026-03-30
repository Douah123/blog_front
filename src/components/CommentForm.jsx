import { useState } from 'react'

function CommentForm({
  onSubmit,
  busy = false,
  initialValue = '',
  submitLabel = 'Publier',
  label = 'Commentaire',
  placeholder = 'Ajouter un commentaire',
  rows = 4,
  className = '',
}) {
  const [content, setContent] = useState(initialValue)

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit?.(content, () => setContent(''))
  }

  return (
    <form className={`stack-form compact-form ${className}`.trim()} onSubmit={handleSubmit}>
      <label className="field">
        <span>{label}</span>
        <textarea
          rows={rows}
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder={placeholder}
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
