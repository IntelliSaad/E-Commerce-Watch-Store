import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { c as useAuth, e as auth } from "../index.mjs";
import { Lock } from "lucide-react";
import "vite-react-ssg";
import "firebase/app";
import "firebase/firestore";
import "react-helmet-async";
import "@vercel/analytics/react";
const ADMIN_PATH = "wristhub-store-7597-adminPanel";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  useEffect(() => {
    if (isAdmin) {
      navigate(`/${ADMIN_PATH}/inventory`);
    }
  }, [isAdmin, navigate]);
  useEffect(() => {
    if (user && !isAdmin) {
      setError("Access Denied: You are logged in, but not as an Admin.");
    }
  }, [user, isAdmin]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error2) {
      setError("Invalid Credentials.");
    }
  };
  if (isAdmin) return null;
  const inputStyle = "w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none transition-colors";
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-900 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsx("div", { className: "p-3 bg-yellow-500/10 rounded-full", children: /* @__PURE__ */ jsx(Lock, { className: "text-yellow-500", size: 32 }) }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-center text-white mb-8 tracking-wide", children: "Admin Portal" }),
    error && /* @__PURE__ */ jsx("div", { className: "bg-red-500/10 border border-red-500/50 text-red-200 text-sm p-3 rounded mb-4 text-center", children: error }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, children: [
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          name: "email",
          id: "email",
          value: email,
          onChange: (e) => setEmail(e.target.value),
          className: inputStyle,
          required: true,
          autoComplete: "email"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("label", { className: "block text-gray-400 text-sm mb-2 ml-1", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "password",
            name: "password",
            id: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: inputStyle,
            required: true,
            autoComplete: "current-password"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition-transform transform hover:scale-[1.02] shadow-lg",
          children: "Access Dashboard"
        }
      )
    ] })
  ] }) });
};
export {
  AdminLogin as default
};
