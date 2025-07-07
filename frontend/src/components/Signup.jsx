import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState();
  const { register } = useAuth();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await register(formData);
      console.log("Response: ", response.data);

      if (response.status === 201) {
        // console.log("Message",response.data.message)
        toast.success("Registration Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrors(error.response);
    }
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-user-plus me-2"></i>Signup
        </h2>
        <p className="text-muted">
          Create your account to start tracking expenses
        </p>
      </div>
      {errors?.data?.non_field_errors && (
        <div
          className="alert alert-danger mx-auto mb-3"
          style={{ maxWidth: "400px" }}
        >
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors?.data?.non_field_errors[0]}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-4 rounded shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              id="firstName"
              className={`form-control ${
                errors?.data?.first_name ? "is-invalid" : ""
              }`}
              placeholder="Enter your first name..."
              required
            />
            {errors?.data?.first_name && (
              <div className="invalid-feedback">
                {errors?.data?.first_name?.[0]}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              id="lastName"
              className={`form-control ${
                errors?.data?.last_name ? "is-invalid" : ""
              }`}
              placeholder="Enter your last name..."
              required
            />
            {errors?.data?.last_name && (
              <div className="invalid-feedback">
                {errors?.data?.last_name?.[0]}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              className={`form-control ${
                errors?.data?.email ? "is-invalid" : ""
              }`}
              placeholder="Enter your email..."
              required
            />
            {errors?.data?.email && (
              <div className="invalid-feedback">{errors?.data?.email?.[0]}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              className={`form-control ${
                errors?.data?.password ? "is-invalid" : ""
              }`}
              placeholder="Create a password..."
              required
            />
            {errors?.data?.password && (
              <div className="invalid-feedback">
                {errors?.data?.password?.[0]}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              id="confirmPassword"
              className={`form-control ${
                errors?.data?.password2 ? "is-invalid" : ""
              }`}
              placeholder="Create a password..."
              required
            />
            {errors?.data?.password2 && (
              <div className="invalid-feedback">
                {errors?.data?.password2?.[0]}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          <i className="fas fa-user-plus me-2"></i>Signup
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
