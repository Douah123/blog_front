import { useState } from 'react'
import { formatDate } from '../utils/app.js'
import CommentForm from './CommentForm.jsx'

function CommentItem({
  comment,
  currentUserId,
  onUpdate,
  onDelete,
  onReply,
  replyBusyId,
  depth = 0,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isReplying, setIsReplying] = useState(false)
  const [draft, setDraft] = useState(comment.content)
  const hasReplies = Array.isArray(comment.replies) && comment.replies.length > 0

  function handleSave() {
    onUpdate(comment.id, draft).then(() => setIsEditing(false))
  }

  function handleReplySubmit(content, reset) {
    onReply(comment.id, content).then(() => {
      reset()
      setIsReplying(false)
    })
  }

  return (
    <article className={`comment-item${depth > 0 ? ' is-reply' : ''}`}>
      <div className="comment-item__content">
        <header className="comment-item__header">
          <div>
            <strong>{comment.author_fullname || comment.author_username || 'Utilisateur'}</strong>
            <p className="muted comment-meta">{formatDate(comment.created_at)}</p>
          </div>
          <div className="inline-actions">
            <button className="text-button" type="button" onClick={() => setIsReplying((value) => !value)}>
              {isReplying ? 'Annuler' : 'Repondre'}
            </button>
            {currentUserId === comment.user_id ? (
              <>
                <button className="text-button" type="button" onClick={() => setIsEditing((value) => !value)}>
                  {isEditing ? 'Annuler' : 'Modifier'}
                </button>
                <button className="text-button danger" type="button" onClick={() => onDelete(comment.id)}>
                  Supprimer
                </button>
              </>
            ) : null}
          </div>
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

        {isReplying ? (
          <CommentForm
            className="comment-reply-form"
            onSubmit={handleReplySubmit}
            busy={replyBusyId === comment.id}
            submitLabel="Repondre"
            label="Votre reponse"
            placeholder="Ecrire une reponse"
            rows={3}
          />
        ) : null}
      </div>

      {hasReplies ? (
        <div className="comment-children">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onReply={onReply}
              replyBusyId={replyBusyId}
              depth={depth + 1}
            />
          ))}
        </div>
      ) : null}
    </article>
  )
}

function CommentList({ comments, currentUserId, onUpdate, onDelete, onReply, replyBusyId }) {
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
          onReply={onReply}
          replyBusyId={replyBusyId}
        />
      ))}
    </div>
  )
}

export default CommentList
