import { createContext, useContext, useState } from "react";
import axiosInstance from "../services/AuthServices";

export const AuthContextData = createContext();

export function useAuth() {
  return useContext(AuthContextData);
}

function AuthContext({ children }) {
  const [user, setUser] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("access_token") ? true : false;
  });

  async function register(registerData) {
    try {
      const response = await axiosInstance.post("register/", registerData);
      console.log("Auth Response: ", response.data);
      return {
        status: 201,
        success: true,
        message: response.data.msg,
      };
    } catch (error) {
      throw error;
    }
  }

  async function login(loginData) {
    try {
      const response = await axiosInstance.post("login/", loginData);
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("access_token", response.data.token.access);
        localStorage.setItem("refresh_token", response.data.token.refresh);
        localStorage.setItem("user", loginData.email);
        setUser(loginData.email);
        console.log("isAuthenticated: ", isAuthenticated);
        setIsAuthenticated(true);
        console.log("isAuthenticated: ", isAuthenticated);
        return {
          status: response.status,
          success: true,
          message: response.data.msg,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async function change_password(passwordData) {
    console.log(passwordData);
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        const response = await axiosInstance.post(
          "changepassword/",
          passwordData
        );
        console.log("Response: ", response.data);
        return {
          success: true,
          data: response.data,
          status: response.status,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser("");
  }

  return (
    <AuthContextData.Provider
      value={{
        user,
        register,
        login,
        logout,
        change_password,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContextData.Provider>
  );
}

export default AuthContext;
