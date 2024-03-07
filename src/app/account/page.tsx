import Color from "@/components/Color";
import { checkAuth, getUserAuth } from "@/server/auth";

export default async function Account() {
  await checkAuth();
  const { session } = await getUserAuth();

  return (
    <main>
      <h1 className="my-4 text-2xl font-semibold">Account</h1>
      <Color />
      <div className="space-y-4">
      </div>
    </main>
  );
}
