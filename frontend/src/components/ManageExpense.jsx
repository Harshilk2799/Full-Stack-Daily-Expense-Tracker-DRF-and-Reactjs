import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useExpense } from "../context/ExpenseContext";

function ManageExpense() {
  const [editExpense, setEditExpense] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [errors, setErrors] = useState();

  const { manageExpense, deleteExpense, editExpense_ } = useExpense();

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  async function fetchExpenses() {
    try {
      const response = await manageExpense();
      console.log("Response: ", response.data);
      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    setEditExpense((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  function handleEdit(expense) {
    console.log("Ex: ", expense);
    setEditExpense(expense);
  }

  async function handleDelete(expenseId) {
    console.log("Exp: ", expenseId);
    try {
      const response = await deleteExpense(expenseId);
      console.log("Response Edit: ", response.data);

      if (response.status === 204) {
        toast.success("Delete Expense Successfully!");
        fetchExpenses();
        setTimeout(() => {
          navigate("/manage-expense");
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await editExpense_(editExpense.id, editExpense);
      console.log("Response Edit: ", response.data);

      if (response.status === 200) {
        toast.success("Update Expense Successfully!");
        fetchExpenses(userId);
        document.querySelector("hashtag#exampleModal .btn-close").click();
        setTimeout(() => {
          navigate("/manage-expense");
        }, 2000);
      }
    } catch (error) {
      setErrors(error.response);
    }
  }

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchExpenses();
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-tasks me-2"></i>Manage Expense
        </h2>
        <p className="text-muted">View, edit and delete</p>
      </div>
      <div>
        <table className="table table-striped table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Item</th>
              <th>Cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {expenses.length > 0 ? (
              expenses?.map((expense, index) => {
                return (
                  <tr key={expense.id}>
                    <td>{expense?.id}</td>
                    <td>{expense?.expense_date}</td>
                    <td>{expense?.expense_item}</td>
                    <td>{expense?.expense_price}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-2"
                        onClick={() => handleEdit(expense)}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(expense?.id)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
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
        </table>
      </div>

      {/* Edit Model */}
      <div
        className="modal fade"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Expense
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="expenseItem" className="form-label">
                  Expense Item
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <input
                    type="text"
                    name="expense_item"
                    id="expenseItem"
                    value={editExpense?.expense_item ?? ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter expense item (e.g. Groceries, Petrol)"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="expenseDate" className="form-label">
                  Expense Date
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fa-solid fa-calender-days"></i>
                  </span>
                  <input
                    type="date"
                    name="expense_date"
                    id="expenseDate"
                    value={editExpense?.expense_date ?? ""}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="expensePrice" className="form-label">
                  Expense Price (₹)
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-rupee-sign"></i>
                  </span>
                  <input
                    type="number"
                    name="expense_price"
                    id="expensePrice"
                    value={editExpense?.expense_price ?? ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter amount spend"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManageExpense;
