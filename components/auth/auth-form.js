import React, { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";
import { useRouter } from  "next/router";

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const mobileInputRef = useRef();
  const passwordInputRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const createUser = async (mobile, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ mobile, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredMobile = mobileInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        mobile: enteredMobile,
        password: enteredPassword,
      });
      console.log(result)
      if(!result.error) {
        router.replace("/tasks")
      }
    } else {
      try {
        await createUser(enteredMobile, enteredPassword);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="mobile">Your mobile</label>
          <input type="mobile" id="mobile" required ref={mobileInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
