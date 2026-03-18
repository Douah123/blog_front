function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.pages <= 1) {
    return null
  }

  return (
    <div className="pagination">
      <button
        className="button button-secondary"
        type="button"
        disabled={pagination.page <= 1}
        onClick={() => onPageChange(pagination.page - 1)}
      >
        Precedent
      </button>
      <span className="pagination-label">
        Page {pagination.page} sur {pagination.pages}
      </span>
      <button
        className="button button-secondary"
        type="button"
        disabled={pagination.page >= pagination.pages}
        onClick={() => onPageChange(pagination.page + 1)}
      >
        Suivant
      </button>
    </div>
  )
}

export default Pagination
