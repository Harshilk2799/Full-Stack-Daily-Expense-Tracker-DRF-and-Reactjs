import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useExpense } from "../context/ExpenseContext";

Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [todayExpense, setTodayExpense] = useState(0);
  const [yesterdayExpense, setYesterdayExpense] = useState(0);
  const [lastSevenDayExpense, setLastSevenDayExpense] = useState(0);
  const [lastMonthExpense, setLastMonthExpense] = useState(0);
  const [currentYearExpense, setCurrentYearExpense] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const { dashboardstat } = useExpense();

  const pieData = {
    labels: expenses.map((expense) => expense.expense_item),
    datasets: [
      {
        label: "Expense Cost",
        data: expenses.map((expense) => parseFloat(expense.expense_price)),
        backgroundColor: [
          "#3b82f6",
          "#10b981",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#14b8a6",
          "#6366f1",
          "#f43f5e",
          "#ec4899",
          "#22c55e",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  async function fetchExpenses(userId) {
    console.log("User ID: ", userId);
    try {
      const response = await dashboardstat(userId);
      console.log("Response: ", response.data);
      setExpenses(response.data);
      calculateTotals(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function calculateTotals(data) {
    console.log("Expense: ", data);

    const today = new Date();
    console.log("Today: ", today);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastSevenDay = new Date();
    lastSevenDay.setDate(today.getDate() - 7);

    const lastMonth = new Date();
    lastMonth.setDate(today.getDate() - 30);

    const currentYear = today.getFullYear();

    let todaySum = 0,
      yesterdaySum = 0,
      lastSevenDaySum = 0,
      lastMonthSum = 0,
      lastYearSum = 0,
      grandSum = 0;

    data.forEach((item) => {
      let expenseDate = new Date(item.expense_date);
      console.log("Expense Date: ", expenseDate);

      let amount = parseFloat(item.expense_price);
      console.log("Amount: ", amount);

      grandSum += amount;

      if (expenseDate.toDateString() == today.toDateString()) {
        todaySum += amount;
      }

      if (expenseDate.toDateString() == yesterday.toDateString()) {
        yesterdaySum += amount;
      }

      if (expenseDate >= lastSevenDay) {
        lastSevenDaySum += amount;
      }

      if (expenseDate >= lastMonth) {
        lastMonthSum += amount;
      }
      if (expenseDate.getFullYear() === currentYear) {
        lastYearSum += amount;
      }
    });
    console.log("Today Sum: ", todaySum);
    setTodayExpense(todaySum);
    setYesterdayExpense(yesterdaySum);
    setLastSevenDayExpense(lastSevenDaySum);
    setLastMonthExpense(lastMonthSum);
    setCurrentYearExpense(lastYearSum);
    setGrandTotal(grandSum);
  }
  const userId = localStorage.getItem("user");
  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
    fetchExpenses(userId);
  }, []);
  return (
    <div className="container mt-4">
      <div className="text-center">
        <h2>Welcome, {userId}</h2>
        <p className="text-muted">Here's your expense overview</p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="card bg-primary text-white text-center mb-3"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calendar-day me-2"></i> Today's Expense
              </h5>
              <p className="card-text fs-4">₹ {todayExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card bg-success text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calendar-minus me-2"></i> Yesterday's
                Expense
              </h5>
              <p className="card-text fs-4">₹ {yesterdayExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card bg-warning text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calendar-week me-2"></i> Last Week Expense
              </h5>
              <p className="card-text fs-4">₹ {lastSevenDayExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card bg-info text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calendar-alt me-2"></i> Last Month Expense
              </h5>
              <p className="card-text fs-4">₹ {lastMonthExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card bg-danger text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-calendar me-2"></i> Current Year Expense
              </h5>
              <p className="card-text fs-4">₹ {currentYearExpense}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
            className="card bg-secondary text-white text-center"
            style={{ height: "150px" }}
          >
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-wallet me-2"></i> Total Expense
              </h5>
              <p className="card-text fs-4">₹ {grandTotal}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="my-5"
        style={{ height: "400px", width: "400px", margin: "auto" }}
      >
        <h4 className="text-center">Expense Distribution</h4>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default Dashboard;
