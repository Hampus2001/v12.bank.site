import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <div className="flex flex-col mt-20 p-10 gap-10 bg-blue-300 rounded-lg w-1/3">
        <h1 className="text-6xl font-bold text-blue-950">Welcome</h1>
        <div className="flex flex-col gap-5 text-2xl font-bold text-blue-950">
          <Link href="/createAccount">Create account</Link>
          <Link href="/login">Sign in </Link>
        </div>
      </div>
    </div>
  );
}
