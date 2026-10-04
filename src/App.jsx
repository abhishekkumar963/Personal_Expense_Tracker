import { useState, useEffect } from 'react'
import ExpenseForm from './components/ExpenseForm.jsx'
import ExpenseList from './components/ExpenseList.jsx'
import Summary from './components/Summary.jsx'

const STORAGE_KEY = 'expense-tracker-data'

function App() {
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [filterCategory, setFilterCategory] = useState('All')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id))
  }

  const clearAllExpenses = () => {
    if (window.confirm('Are you sure you want to delete all expenses?')) {
      setExpenses([])
    }
  }

  const categories = ['All', ...new Set(expenses.map((e) => e.category))]

  const filteredExpenses =
    filterCategory === 'All'
      ? expenses
      : expenses.filter((e) => e.category === filterCategory)

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💰 Personal Expense Tracker</h1>
        <p className="subtitle">Track your spending effortlessly</p>
      </header>

      <div className="main-content">
        <div className="left-column">
          <ExpenseForm onAdd={addExpense} />
          <Summary expenses={expenses} />
        </div>

        <div className="right-column">
          <div className="expenses-card">
            <div className="expenses-header">
              <h2>Expenses</h2>
              {expenses.length > 0 && (
                <button
                  className="clear-btn"
                  onClick={clearAllExpenses}
                >
                  Clear All
                </button>
              )}
            </div>

            {categories.length > 1 && (
              <div className="filter-section">
                <label htmlFor="category-filter">Filter by category:</label>
                <select
                  id="category-filter"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <ExpenseList
              expenses={filteredExpenses}
              onDelete={deleteExpense}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
