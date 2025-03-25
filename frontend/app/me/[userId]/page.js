"use client";

import { HandleAccountContext } from "@/context/AccountContext";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserAccount() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { session, setSession } = useContext(HandleAccountContext);
  const [addMoney, setAddMoney] = useState(0);

  async function depositMoney() {
    const response = await fetch("http://localhost:4000/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: addMoney, userId: userData.userId }),
    });
    if (response.ok) {
      const data = await response.json();
      userData.amount = data.amount;
    } else {
      const error = await response.json();

      alert(error.message);
    }
    setAddMoney(0);
  }

  useEffect(() => {
    async function verifyLogin() {
      const response = await fetch("http://localhost:4000/verifyLogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        const error = await response.json();
        alert(error.message);
        router.push("/loginPage");
      }
    }

    verifyLogin();
  }, []);

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  async function logOut() {
    await fetch("http://localhost:4000/logOut", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session),
    });
    setUserData(null);
    setSession([]);
    router.push("/loginPage");
  }

  return (
    <div className="flex flex-col min-h-screen items-center p-10">
      {userData && (
        <div className="flex flex-col bg-blue-300 p-10 gap-10 text-blue-950 font-bold rounded-lg ">
          <h1 className="text-7xl">Welcome, {userData.username}!</h1>
          <p className="text-2xl">Account Balance: {userData.amount}$</p>
          <div className="flex bg-blue-500 rounded-lg justify-between">
            <input
              type="number"
              className="text-2xl p-5"
              placeholder="Choose amount"
              onChange={(e) => setAddMoney(e.target.value)}
            />
            <button
              onClick={depositMoney}
              className="text-2xl hover:cursor-pointer bg-blue-800 text-blue-100 p-5 rounded-r-lg"
            >
              deposit money
            </button>
          </div>
          <button onClick={logOut} className="hover:cursor-pointer text-2xl">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
