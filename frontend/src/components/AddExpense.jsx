import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { useExpense } from "../context/ExpenseContext";

function AddExpense() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    expense_item: "",
    expense_date: "",
    expense_price: "",
  });
  const [errors, setErrors] = useState();
  const { addExpense } = useExpense();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const expenseObj = { ...formData };
      console.log("Exp obj: ", expenseObj);
      const response = await addExpense(expenseObj);
      console.log("Response: ", response.data);

      if (response.status === 201 && response.success === true) {
        // console.log("Message",response.data.message)
        toast.success("Add Expense Successfully!");
        navigate("/manage-expense");
      }
    } catch (error) {
      setErrors(error.response);
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-plus-circle me-2"></i>Add Expense
        </h2>
        <p className="text-muted">Track your new spending here</p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-4 rounded shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
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
              value={formData.expense_item}
              onChange={handleChange}
              id="expenseItem"
              className={`form-control ${
                errors?.data?.expense_item ? "is-invalid" : ""
              }`}
              placeholder="Enter expense item (e.g. Groceries, Petrol)"
              required
            />
            {errors?.data?.expense_item && (
              <div className="invalid-feedback">
                {errors?.data?.expense_item?.[0]}
              </div>
            )}
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
              value={formData.expense_date}
              onChange={handleChange}
              id="expenseDate"
              className={`form-control ${
                errors?.data?.expense_date ? "is-invalid" : ""
              }`}
              required
            />
            {errors?.data?.expense_date && (
              <div className="invalid-feedback">
                {errors?.data?.expense_date?.[0]}
              </div>
            )}
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
              value={formData.expense_price}
              onChange={handleChange}
              id="expensePrice"
              className={`form-control ${
                errors?.data?.expense_price ? "is-invalid" : ""
              }`}
              placeholder="Enter amount spend"
              required
            />
            {errors?.data?.expense_price && (
              <div className="invalid-feedback">
                {errors?.data?.expense_price?.[0]}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          <i className="fas fa-plus me-2"></i>Add Expense
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AddExpense;
