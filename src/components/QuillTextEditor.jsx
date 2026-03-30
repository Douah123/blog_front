import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

function normalizeText(value) {
  return (value ?? '').replace(/\r\n/g, '\n')
}

function QuillTextEditor({ value, onChange, placeholder = '', disabled = false, minHeight = 220 }) {
  const containerRef = useRef(null)
  const quillRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || quillRef.current) {
      return undefined
    }

    containerRef.current.innerHTML = ''
    const editorHost = document.createElement('div')
    containerRef.current.appendChild(editorHost)

    const quill = new Quill(editorHost, {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'link'],
          ['clean'],
        ],
      },
    })

    quill.container.style.minHeight = `${minHeight}px`
    quill.container.style.height = 'auto'
    quill.root.style.minHeight = `${minHeight}px`
    quillRef.current = quill
    quill.setText(normalizeText(value))
    quill.enable(!disabled)

    const handleTextChange = () => {
      const nextValue = quill.getText().replace(/\n$/, '')
      onChange?.(nextValue)
    }

    quill.on('text-change', handleTextChange)

    return () => {
      quill.off('text-change', handleTextChange)
      quillRef.current = null
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  useEffect(() => {
    if (!quillRef.current) {
      return
    }

    const currentValue = quillRef.current.getText().replace(/\n$/, '')
    const nextValue = normalizeText(value)
    if (currentValue !== nextValue) {
      quillRef.current.setText(nextValue)
    }
  }, [value])

  useEffect(() => {
    if (!quillRef.current) {
      return
    }

    quillRef.current.enable(!disabled)
  }, [disabled])

  return <div className="quill-editor-field" ref={containerRef} />
}

export default QuillTextEditor
