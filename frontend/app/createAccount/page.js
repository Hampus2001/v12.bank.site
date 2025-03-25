"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateAccountPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function createNewAccount() {
    const newAccount = { username: userName, password: password };

    setPassword("");
    setUserName("");

    await fetch("http://localhost:4000/createAccount", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount),
    });
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10 gap-10">
      <div className="flex w-1/3 flex-col gap-5 bg-blue-300 p-10 rounded-lg mt-20 text-blue-950">
        <h1 className="text-5xl font-bold">Sign up:</h1>
        <input
          type="text"
          className="bg-white text-black rounded-lg px-5 py-2 outline-none font-bold"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
          placeholder="Username"
        />
        <input
          type="password"
          className="bg-white text-black rounded-lg px-5 py-2 outline-none font-bold"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Password"
        />
        <Link href="/loginPage">
          <button
            className="flex w-full text-2xl font-bold justify-center bg-blue-500 px-5 py-2 rounded-lg  text-center hover:cursor-pointer"
            onClick={createNewAccount}
          >
            Create Account
          </button>
        </Link>
        <div className="flex gap-2">
          <p>Already have an account? </p>
          <Link href="/loginPage" className="font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
