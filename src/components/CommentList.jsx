import { useState } from 'react'
import { formatDate } from '../utils/app.js'

function CommentItem({ comment, currentUserId, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(comment.content)

  function handleSave() {
    onUpdate(comment.id, draft).then(() => setIsEditing(false))
  }

  return (
    <article className="comment-item">
      <header className="comment-item__header">
        <div>
          <strong>{comment.author_fullname || comment.author_username || 'Utilisateur'}</strong>
          <p className="muted">{formatDate(comment.created_at)}</p>
        </div>
        {currentUserId === comment.user_id ? (
          <div className="inline-actions">
            <button className="text-button" type="button" onClick={() => setIsEditing((value) => !value)}>
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
            <button className="text-button danger" type="button" onClick={() => onDelete(comment.id)}>
              Supprimer
            </button>
          </div>
        ) : null}
      </header>

      {isEditing ? (
        <div className="stack-form compact-form">
          <textarea rows="4" value={draft} onChange={(event) => setDraft(event.target.value)} />
          <button className="button button-secondary" type="button" onClick={handleSave}>
            Enregistrer
          </button>
        </div>
      ) : (
        <p className="comment-content">{comment.content}</p>
      )}
    </article>
  )
}

function CommentList({ comments, currentUserId, onUpdate, onDelete }) {
  if (!comments.length) {
    return <div className="empty-state subtle">Aucun commentaire pour le moment.</div>
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default CommentList
