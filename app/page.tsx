import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PeopleTable from "@/components/PeopleTable";

export default async function Home() {
  const cookieStore = await cookies();
  const isSignedIn = cookieStore.get("Authorization")?.value ? true : false;

  if (!isSignedIn) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data Masyarakat</h1>
          <p className="text-gray-600 mt-2">
            Kelola data masyarakat dengan mudah
          </p>
        </div>

        <PeopleTable />
      </div>
    </main>
  );
}
