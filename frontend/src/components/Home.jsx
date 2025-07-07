import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="container text-center mt-5">
      <h1>
        Welcome to <span className="text-primary">Daily Expense Tracker</span>
      </h1>
      <p className="lead">Track your daily expenses easily and efficiently</p>

      <div className="mt-4">
        {isAuthenticated ? (
          <Link to="/dashboard" className="btn btn-warning mx-2">
            <i className="fas fa-tachometer-alt me-2"></i> Go to Dashboard
          </Link>
        ) : (
          <>
            <Link to="/signup" className="btn btn-primary mx-2">
              <i className="fas fa-user-plus me-2"></i> Signup
            </Link>
            <Link to="/login" className="btn btn-success">
              <i className="fas fa-sign-in-alt me-2"></i> Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
