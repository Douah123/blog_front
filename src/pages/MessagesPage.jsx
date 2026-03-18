import { useEffect, useState } from 'react'
import { getConversation, getMyChats, sendMessage } from '../api/messageApi.js'
import MessageInput from '../components/MessageInput.jsx'
import MessageList from '../components/MessageList.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getErrorMessage, markMessageConversationSeen, navigateTo } from '../utils/app.js'
import Avatar from '../components/Avatar.jsx'

function MessagesPage({ searchParams }) {
  const { token, user } = useAuth()
  const [chats, setChats] = useState([])
  const [messages, setMessages] = useState([])
  const [loadingChats, setLoadingChats] = useState(true)
  const [loadingMessages, setLoadingMessages] = useState(Boolean(searchParams.get('user')))
  const [error, setError] = useState('')
  const selectedUserId = searchParams.get('user')
  const selectedName = searchParams.get('name')

  const selectedChat = selectedUserId
    ? chats.find((item) => String(item.user_id) === String(selectedUserId)) || null
    : null

  useEffect(() => {
    let active = true

    getMyChats(token, { page: 1, per_page: 50 })
      .then((response) => {
        if (active) {
          setChats(response.items ?? [])
        }
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Chargement des conversations impossible.'))
        }
      })
      .finally(() => {
        if (active) {
          setLoadingChats(false)
        }
      })

    return () => {
      active = false
    }
  }, [token])

  useEffect(() => {
    if (!selectedUserId) {
      return
    }

    markMessageConversationSeen(user?.id, selectedUserId)
  }, [selectedUserId, user?.id])

  useEffect(() => {
    if (!selectedUserId) {
      return
    }

    let active = true

    getConversation(token, selectedUserId, { page: 1, per_page: 50 })
      .then((response) => {
        if (active) {
          setMessages(response.items ?? [])
        }
      })
      .catch((err) => {
        if (active) {
          setError(getErrorMessage(err, 'Chargement de la conversation impossible.'))
        }
      })
      .finally(() => {
        if (active) {
          setLoadingMessages(false)
        }
      })

    return () => {
      active = false
    }
  }, [selectedUserId, token])

  async function handleSend(content) {
    if (!selectedUserId) {
      return
    }

    try {
      const response = await sendMessage(token, { receiver_id: selectedUserId, content })
      setMessages((current) => [...current, response.data])
      setChats((current) => {
        const others = current.filter((item) => String(item.user_id) !== String(selectedUserId))
        return [
          {
            user_id: Number(selectedUserId),
            username: selectedChat?.username || selectedName || '',
            fullname: selectedChat?.fullname || selectedName || '',
            last_message: response.data.content,
            last_message_at: response.data.created_at,
          },
          ...others,
        ]
      })
    } catch (err) {
      setError(getErrorMessage(err, "Envoi du message impossible."))
    }
  }

  function openConversation(chatUserId, chatLabel) {
    setLoadingMessages(true)
    navigateTo(`/messages?user=${chatUserId}&name=${encodeURIComponent(chatLabel)}`)
  }

  return (
    <section className="messages-layout">
      <aside className="panel messages-sidebar">
        <div className="section-heading">
          <h1>Messages</h1>
        </div>
        {loadingChats ? <p className="muted">Chargement...</p> : null}
        <div className="list-stack">
          {chats.map((chat) => (
            <button
              key={chat.user_id}
              className={`conversation-link${String(chat.user_id) === String(selectedUserId) ? ' is-active' : ''}`}
              type="button"
              onClick={() => openConversation(chat.user_id, chat.fullname || chat.username)}
            >
              <span className="conversation-link__content">
                <Avatar user={chat} />
                <span className="conversation-link__text">
                  <strong>{chat.fullname || chat.username}</strong>
                  <span>{chat.last_message}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>

      <section className="panel messages-panel">
        {error ? <p className="inline-error">{error}</p> : null}
        {!selectedUserId ? <p className="muted">Sélectionnez une conversation pour commencer.</p> : null}
        {selectedUserId ? (
          <>
            <div className="section-heading">
              <span className="conversation-heading">
                <Avatar user={selectedChat || { fullname: selectedName, username: selectedName }} />
                <h2>{selectedChat?.fullname || selectedName || selectedChat?.username || 'Conversation'}</h2>
              </span>
            </div>
            {loadingMessages ? <p className="muted">Chargement de la conversation...</p> : <MessageList messages={messages} currentUserId={user?.id} />}
            <MessageInput onSend={handleSend} disabled={loadingMessages} />
          </>
        ) : null}
      </section>
    </section>
  )
}

export default MessagesPage
