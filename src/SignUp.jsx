// SignUp.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./store";
import "./SignUp.css"; // ✅ Rename file to SignUp.css
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const existingUsers = JSON.parse(localStorage.getItem("Users")) || [];
    const userExists = existingUsers.find(user => user.username === data.username);

    if (userExists) {
      toast.error("Username already exists");
      return;
    }

    existingUsers.push(data);
    localStorage.setItem("Users", JSON.stringify(existingUsers));
    dispatch(registerUser(data));
    toast.success("User Registered Successfully");

    setTimeout(() => navigate("/SignUp"), 1500);
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
  };

  return (
    <div className="signup-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
            className={errors.username ? "error" : ""}
          />
          {errors.username && <p style={{ color: "red" }}>Username is required</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 4 })}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <p style={{ color: "red" }}>Password must be at least 4 characters</p>
          )}

          <button type="submit">Sign Up</button>
        </form>

        <button onClick={toggleDarkMode} className="dark-toggle">🌙 Toggle Dark Mode</button>
      </div>
    </div>
  );
}

export default SignUp;
