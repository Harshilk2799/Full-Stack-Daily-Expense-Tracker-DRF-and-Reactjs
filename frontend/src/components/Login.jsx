import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState();
  const { login } = useAuth();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value.trim() };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await login(formData);
      console.log("Response: ", response.data);

      if (response.status === 200) {
        // console.log("Message",response.data.message)
        toast.success("Login Successfully!");
        console.log("Data: ", response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error Response: ", error.response);
      setErrors(error.response);
      toast.error(error.response.data.message);
    }
  }

  console.log("Error: ", errors);
  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-user-plus me-2"></i>Login
        </h2>
        <p className="text-muted">Access your expense dashboard</p>
      </div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-4 rounded shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
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
              placeholder="Enter your password..."
              required
            />
            {errors?.data?.password && (
              <div className="invalid-feedback">
                {errors?.data?.password?.[0]}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          <i className="fas fa-sign-in-alt me-2"></i>Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
