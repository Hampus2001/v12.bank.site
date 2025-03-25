import "./globals.css";
import AccountContext from "@/context/AccountContext";
import Navbar from "@/navbar/page";
export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      <html lang="en" className="bg-blue-400">
        <AccountContext>
          <body>{children}</body>
        </AccountContext>
      </html>
    </>
  );
}
