import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthContext from "./context/AuthContext";
import ExpenseContext from "./context/ExpenseContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ProtectRoute from "./components/ProtectRoute";
import AddExpense from "./components/AddExpense";
import ManageExpense from "./components/ManageExpense";
import ExpenseReport from "./components/ExpenseReport";
import ChangePassword from "./components/ChangePassword";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <>
      <AuthContext>
        <ExpenseContext>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectRoute>
                    <Dashboard />
                  </ProtectRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/add-expense"
                element={
                  <ProtectRoute>
                    <AddExpense />
                  </ProtectRoute>
                }
              />
              <Route
                path="/manage-expense"
                element={
                  <ProtectRoute>
                    <ManageExpense />
                  </ProtectRoute>
                }
              />
              <Route
                path="/expense-report"
                element={
                  <ProtectRoute>
                    <ExpenseReport />{" "}
                  </ProtectRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectRoute>
                    <ChangePassword />
                  </ProtectRoute>
                }
              />
            </Routes>
          </Router>
        </ExpenseContext>
      </AuthContext>
    </>
  );
}

export default App;
