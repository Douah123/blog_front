function Pagination({ page = 1, totalPages = 1, onPrevious, onNext }) {
  return (
    <nav aria-label="Pagination">
      <button onClick={onPrevious} disabled={page <= 1} type="button">
        Precedent
      </button>
      <span>
        Page {page} / {totalPages}
      </span>
      <button onClick={onNext} disabled={page >= totalPages} type="button">
        Suivant
      </button>
    </nav>
  )
}

export default Pagination
