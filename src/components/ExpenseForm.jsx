import { useState } from 'react'

const CATEGORIES = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Health',
  'Education',
  'Other'
]

function ExpenseForm({ onAdd }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!description.trim()) newErrors.description = 'Description is required'
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount'
    }
    if (!date) newErrors.date = 'Date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    onAdd({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date
    })

    setDescription('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setDate(new Date().toISOString().split('T')[0])
    setErrors({})
  }

  return (
    <div className="form-card">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Groceries at Walmart"
            className={errors.description ? 'input-error' : ''}
          />
          {errors.description && (
            <span className="error-text">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && (
            <span className="error-text">{errors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={errors.date ? 'input-error' : ''}
          />
          {errors.date && <span className="error-text">{errors.date}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm
