// Js/main.js

import { initAuth, getSession, signIn, signUp, signInWithProvider } from "./ide.auth.js";
import { bootstrapApp } from "./ide.bootstrap.js";

document.addEventListener("DOMContentLoaded", async () => {

  initAuth();

  const authScreen = document.getElementById("authScreen");
  const app = document.getElementById("app");

  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  const googleBtn = document.getElementById("googleLogin");
  const githubBtn = document.getElementById("githubLogin");

  /* ==============================
     Check Existing Session
  ============================== */

  const session = await getSession();

  if (session) {
    authScreen.classList.add("hidden");
    app.classList.remove("hidden");
    bootstrapApp();
  }

  /* ==============================
     Email Login
  ============================== */

  loginBtn?.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { error } = await signIn(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    location.reload();
  });

  /* ==============================
     Email Signup
  ============================== */

  signupBtn?.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { error } = await signUp(email, password);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email to confirm signup.");
  });

  /* ==============================
     OAuth
  ============================== */

  googleBtn?.addEventListener("click", () => {
    signInWithProvider("google");
  });

  githubBtn?.addEventListener("click", () => {
    signInWithProvider("github");
  });

});
