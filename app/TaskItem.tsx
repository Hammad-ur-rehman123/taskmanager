"use client";
import { toggleTask, deleteTask } from "./actions";

type Task = {
    id: string;
    title: string;
    done: boolean;
    dueDate?: string | null;
};

export default function TaskItem({ task }: { task: Task }) {
    
    const getRemainingTime = () => {
        if (!task.dueDate) return null;
        const due = new Date(task.dueDate);
        const now = new Date();
        const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return { text: "Overdue!", color: "text-red-500" };
        if (diffDays === 0) return { text: "Due today!", color: "text-orange-500" };
        return { text: `${diffDays} days remaining`, color: "text-blue-500" };
    };

    const timeInfo = getRemainingTime();

    return (
        <li className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id, task.done)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <div>
                    <span className={
                        task.done
                            ? "line-through text-gray-400 text-base"
                            : "text-gray-800 text-base font-medium"
                    }>
                        {task.title}
                    </span>
                    {timeInfo && !task.done && (
                        <p className={`text-xs mt-1 ${timeInfo.color}`}>
                            {timeInfo.text}
                        </p>
                    )}
                </div>
            </div>
            <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors text-sm px-2 py-1 rounded hover:bg-red-50"
            >
                ✕
            </button>
        </li>
    );
}