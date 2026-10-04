const CATEGORY_COLORS = {
  Food: 'bg-food',
  Transportation: 'bg-transport',
  Entertainment: 'bg-entertainment',
  Shopping: 'bg-shopping',
  Bills: 'bg-bills',
  Health: 'bg-health',
  Education: 'bg-education',
  Other: 'bg-other'
}

const CATEGORY_ICONS = {
  Food: '🍔',
  Transportation: '🚗',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Bills: '📄',
  Health: '💊',
  Education: '📚',
  Other: '📌'
}

function ExpenseItem({ expense, onDelete }) {
  const colorClass = CATEGORY_COLORS[expense.category] || 'bg-other'
  const icon = CATEGORY_ICONS[expense.category] || '📌'

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <li className="expense-item">
      <div className={`category-badge ${colorClass}`}>
        <span className="category-icon">{icon}</span>
      </div>
      <div className="expense-details">
        <div className="expense-description">{expense.description}</div>
        <div className="expense-meta">
          <span className="expense-category">{expense.category}</span>
          <span className="expense-date">{formatDate(expense.date)}</span>
        </div>
      </div>
      <div className="expense-right">
        <div className="expense-amount">${expense.amount.toFixed(2)}</div>
        <button
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
          aria-label="Delete expense"
          title="Delete expense"
        >
          ✕
        </button>
      </div>
    </li>
  )
}

export default ExpenseItem
