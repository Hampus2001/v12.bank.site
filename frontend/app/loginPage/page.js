"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { HandleAccountContext } from "@/context/AccountContext";

export default function loginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { session, setSession } = useContext(HandleAccountContext);

  async function login() {
    const login = { username: userName, password: password };
    console.log("login credentials", login);
    setPassword("");
    setUserName("");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Login successful:", data);
      setSession(data.session);
      router.push(`/me/${data.session.userId}`);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10 gap-10">
      <div className="flex w-1/3 flex-col gap-5 mt-20 p-10 bg-blue-300 rounded-lg">
        <h1 className="text-5xl font-bold text-blue-950">Sign in:</h1>
        <input
          type="text"
          className="bg-white  rounded-lg px-5 py-2 font-bold text-blue-950 outline-none"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          placeholder="username"
        />
        <input
          type="password"
          className="bg-white rounded-lg px-5 py-2 font-bold text-blue-950 outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="password"
        />

        <button
          className="bg-blue-500 text-2xl font-bold text-blue-950 px-5 py-2 rounded-lg text-center hover:cursor-pointer"
          onClick={login}
        >
          Log in
        </button>
        <div className="flex gap-2">
          <p>Dont have an account? </p>
          <Link href="/createAccount" className="font-bold">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
