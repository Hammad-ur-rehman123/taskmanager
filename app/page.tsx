import LogoutButton from "./LogoutButton"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createTask } from "./actions";
import TaskItem from "./TaskItem";


export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  const tasks = await (prisma as any).task.findMany({
    where: { userId: session?.user?.id },
  });
  return (
    <main className="max-w-xl mx-auto mt-16 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          My Task Manager       
        </h1>
        <LogoutButton />
      </div>
      <form action={createTask} className="flex gap-2 mb-8">
        <input
        type="text"
        name="title"
        placeholder="Add a new task..."
        required
        className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>
        </form>
        {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks yet. Add one above.</p>
        )}
        <ul className="space-y-2">
          {tasks.map((task: any) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
        </main>
  );
}  