import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <p className="text-gray-700">
        Hello, <strong>{session?.user?.name}</strong> ({session?.user?.email})
      </p>
      <LogoutButton />
    </div>
  );
}
