import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState();
  const { change_password } = useAuth();

  function handleChange(e) {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // if (formData.newPassword !== formData.confirmPassword) {
    //   toast.error("New passwords don't match!");
    //   return;
    // }

    try {
      const response = await change_password({
        password: formData.newPassword,
        password2: formData.confirmPassword,
      });
      console.log("Response: ", response.data);

      if (response.status === 200) {
        toast.success("Change Password Successfully!");
        setFormData({
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setErrors(error?.response?.data?.errors);
    }
  }

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>
          <i className="fas fa-key me-2"></i>Change Password
        </h2>
        <p className="text-muted">Secure your account with a new password</p>
      </div>
      {/* General Error Alert */}
      {errors?.non_field_errors && (
        <div className="alert alert-danger" role="alert">
          {errors.non_field_errors[0]}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="p-4 rounded shadow mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock-open"></i>
            </span>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              id="newPassword"
              className={`form-control ${errors?.password ? "is-invalid" : ""}`}
              placeholder="Enter your new password"
              required
            />
            {errors?.password && (
              <div className="invalid-feedback">{errors.password[0]}</div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock-open"></i>
            </span>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              id="confirmPassword"
              className={`form-control ${
                errors?.password2 ? "is-invalid" : ""
              }`}
              placeholder="Enter your confirm new password"
              required
            />
            {errors?.password2 && (
              <div className="invalid-feedback">{errors.password2[0]}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          <i className="fas fa-key me-2"></i>Change Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ChangePassword;
