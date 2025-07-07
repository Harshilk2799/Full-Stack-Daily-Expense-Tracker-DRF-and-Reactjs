import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login");
    setIsAuthenticated(false);
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-wallet me-2"></i> Expense Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="hashtag#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-expense">
                    <i className="fas fa-plus me-2"></i>Add Expense
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage-expense">
                    <i className="fas fa-tasks me-2"></i>Manage Expense
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/expense-report">
                    <i className="fas fa-file-alt me-2"></i>Expense Report
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/change-password">
                    <i className="fas fa-key me-2"></i>Change Password
                  </Link>
                </li>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out me-2"></i>Logout
                </button>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fas fa-user-plus me-2"></i>Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
