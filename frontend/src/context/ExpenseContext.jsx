import axiosInstance from "../services/AuthServices";
import { useContext, createContext } from "react";

export const ExpenseContextData = createContext();

export function useExpense() {
  return useContext(ExpenseContextData);
}

function ExpenseContext({ children }) {
  async function addExpense(expenseData) {
    console.log("Expense: ", expenseData);
    try {
      const response = await axiosInstance.post(
        "expense/add-expense/",
        expenseData
      );
      console.log("Response: ", response.data);
      return {
        success: true,
        message: response.data.message,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  }
  async function manageExpense() {
    console.log("Expense: ");
    try {
      const response = await axiosInstance.get("expense/manage-expense/");
      console.log("Response: ", response.data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  }

  async function dashboardstat(user) {
    console.log("Expense: ");
    try {
      const response = await axiosInstance.get("expense/manage-expense/", {
        user: user,
      });
      console.log("Response: ", response.data);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  }

  async function editExpense_(expenseId, editExpense) {
    console.log("Expense: ", expenseId);
    try {
      const response = await axiosInstance.patch(
        `expense/edit-expense/${expenseId}/`,
        editExpense
      );
      console.log("Response: ", response.data);
      return {
        success: true,
        message: response.data.message,
        status: response.status,
      };
    } catch (error) {
      throw error;
    }
  }
  async function deleteExpense(expenseId) {
    console.log("Expense: ", typeof expenseId);
    try {
      const response = await axiosInstance.delete(
        `expense/delete-expense/${expenseId}/`
      );
      console.log("Response: ", response.data);
      return {
        success: true,
        status: response.status,
        message: response.data.message,
      };
    } catch (error) {
      throw error;
    }
  }
  async function searchExpense(fromDate, toDate) {
    try {
      const response = await axiosInstance.get(
        `expense/search-expense/?from=${fromDate}&to=${toDate}`
      );
      console.log("Response: ", response.data);
      return {
        success: true,
        status: response.status,
        expenses: response.data.expenses,
        total_price: response.data.total_price,
      };
    } catch (error) {
      throw error;
    }
  }
  return (
    <ExpenseContextData.Provider
      value={{
        addExpense,
        manageExpense,
        deleteExpense,
        editExpense_,
        dashboardstat,
        searchExpense,
      }}
    >
      {children}
    </ExpenseContextData.Provider>
  );
}

export default ExpenseContext;
