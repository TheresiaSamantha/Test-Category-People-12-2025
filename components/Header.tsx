import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get("Authorization")?.value ? true : false;

  return (
    <div className="flex justify-between items-center border-b">
      <nav className="p-4">
        <ul className="flex gap-8">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
        </ul>
      </nav>

      {isSignedIn ? (
        <LogoutButton />
      ) : (
        <Link
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
          href={"/login"}
        >
          Login
        </Link>
      )}
    </div>
  );
}
