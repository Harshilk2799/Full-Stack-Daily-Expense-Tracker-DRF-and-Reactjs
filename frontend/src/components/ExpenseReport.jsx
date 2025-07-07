import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../context/ExpenseContext";

function ExpenseReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { searchExpense } = useExpense();

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("From Date: ", fromDate);
    console.log("To Date: ", toDate);

    try {
      const response = await searchExpense(fromDate, toDate);
      console.log("Response: ", response);
      setData(response.expenses);
      console.log("Price: ", response.total_price);
      setTotalPrice(response.total_price);
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Something went wrong. Try again!!");
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-file-invoice-dollar me-2"></i>Datewise Expense
          Report
        </h2>
        <p className="text-muted">
          Search and analyze your expenses between two dates
        </p>
      </div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="fromdate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="col-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-calendar-alt"></i>
            </span>
            <input
              type="date"
              name="todate"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="col-4">
          <button type="submit" className="btn btn-primary w-100">
            <i className="fas fa-search me-2"></i>Search
          </button>
        </div>
      </form>
      <div className="mt-5">
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Item</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.length > 0 ? (
              data?.map((expense, index) => {
                return (
                  <tr key={expense.id}>
                    <td>{expense?.id}</td>
                    <td>{expense?.expense_date}</td>
                    <td>{expense?.expense_item}</td>
                    <td>{expense?.expense_price}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  <i className="fas fa-exclamation-circle"></i> No Expenses
                  found!
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end fw-bold">
                Total:
              </td>
              <td className="text-center fw-bold">₹ {totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ExpenseReport;
