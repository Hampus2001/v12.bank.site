"use client";

import { createContext, useEffect, useState } from "react";

export const HandleAccountContext = createContext([]);

export default function AccountContext({ children }) {
  const [session, setSession] = useState([]);

  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <HandleAccountContext.Provider value={{ session, setSession }}>
      {children}
    </HandleAccountContext.Provider>
  );
}
