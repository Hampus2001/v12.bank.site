import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex px-10 py-5 justify-center gap-10 bg-blue-500 text-blue-950 text-2xl font-bold">
      <Link href="/loginPage">Log in</Link>
      <Link href="/createAccount">Sign up</Link>
    </div>
  );
}
