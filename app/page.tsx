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
  const userName = session?.user?.name || "User";
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.done).length;
  const pendingTasks = totalTasks - completedTasks;
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-10">
      <div className="max-w-xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500 mt-1">Welcome back, {userName}!</p>
          </div>
          <LogoutButton />
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <form action={createTask} className="flex gap-3">
            <input
               type="text"
               name="title"
               placeholder="Add a new task..."
               required
               className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
          </form>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">{totalTasks}</p>
              <p className="text-sm text-gray-500 mt-1">Total</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 text-center">
              <p className="text-3xl font-bold text-green-500">{completedTasks}</p>
              <p className="text-sm text-gray-500 mt-1">Completed</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 text-center">
              <p className="text-3xl font-bold text-orange-500">{pendingTasks}</p>
              <p className="text-sm text-gray-500 mt-1">Pending</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden"> 
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No tasks yet. Add one above.</p>
          ) : (
            <ul className="space-y-2">
              {tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>  
        
      </div>
    </main>
  );
}  