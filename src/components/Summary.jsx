function Summary({ expenses }) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const expenseCount = expenses.length;

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyExpenses = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  );
  const topCategory = sortedCategories[0];

  const avgExpense = expenseCount > 0 ? totalExpenses / expenseCount : 0;

  return (
    <div className="summary-card">
      <h2>Summary</h2>

      <div className="summary-stats">
        <div className="stat-item">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value primary">${totalExpenses.toFixed(2)}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">This Month</div>
          <div className="stat-value secondary">
            ${monthlyExpenses.toFixed(2)}
          </div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Total Items</div>
          <div className="stat-value tertiary">{expenseCount}</div>
        </div>

        <div className="stat-item">
          <div className="stat-label">Avg. Expense</div>
          <div className="stat-value quaternary">${avgExpense.toFixed(2)}</div>
        </div>
      </div>

      {sortedCategories.length > 0 && (
        <div className="category-breakdown">
          <h3>By Category</h3>
          <div className="category-list">
            {sortedCategories.map(([cat, amount]) => {
              const percentage =
                totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
              return (
                <div key={cat} className="category-row">
                  <div className="category-row-header">
                    <span className="cat-name">{cat}</span>
                    <span className="category-amount">
                      ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {topCategory && (
        <div className="top-category">
          <span className="top-category-label">Top Category:</span>
          <span className="top-category-name">
            {topCategory[0]} (${topCategory[1].toFixed(2)})
          </span>
        </div>
      )}
    </div>
  );
}

export default Summary;
