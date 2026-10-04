import ExpenseItem from './ExpenseItem.jsx'

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">📭</p>
        <p className="empty-title">No expenses yet</p>
        <p className="empty-subtitle">
          Add your first expense using the form above!
        </p>
      </div>
    )
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="expense-list-wrapper">
      <div className="filtered-total">
        <span>Showing {expenses.length} expense{expenses.length !== 1 ? 's' : ''}</span>
        <span className="filtered-amount">
          Total: ${total.toFixed(2)}
        </span>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default ExpenseList
