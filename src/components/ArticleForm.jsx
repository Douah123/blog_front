import { useState } from 'react'
import QuillTextEditor from './QuillTextEditor.jsx'

const defaultValues = {
  title: '',
  content: '',
  is_public: true,
  allow_comments: true,
}

function ArticleForm({ initialValues, onSubmit, submitLabel = 'Enregistrer', busy = false }) {
  const [values, setValues] = useState({ ...defaultValues, ...initialValues })
  const [contentError, setContentError] = useState('')

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setValues((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!values.content.trim()) {
      setContentError('Le contenu est requis.')
      return
    }

    setContentError('')
    onSubmit?.(values)
  }

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Titre</span>
        <input
          name="title"
          maxLength="200"
          value={values.title}
          onChange={handleChange}
          placeholder="Un titre clair et sobre"
          required
        />
      </label>

      <label className="field">
        <span>Contenu</span>
        <QuillTextEditor
          value={values.content}
          onChange={(content) => {
            setValues((current) => ({ ...current, content }))
            if (contentError && content.trim()) {
              setContentError('')
            }
          }}
          placeholder="Votre article..."
          minHeight={260}
        />
      </label>
      {contentError ? <p className="inline-error">{contentError}</p> : null}

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="is_public"
          checked={values.is_public}
          onChange={handleChange}
        />
        <span>Article public</span>
      </label>

      <label className="checkbox-field">
        <input
          type="checkbox"
          name="allow_comments"
          checked={values.allow_comments}
          onChange={handleChange}
        />
        <span>Autoriser les commentaires</span>
      </label>

      <button className="button" type="submit" disabled={busy}>
        {busy ? 'Envoi...' : submitLabel}
      </button>
    </form>
  )
}

export default ArticleForm
