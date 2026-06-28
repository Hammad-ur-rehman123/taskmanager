"use client";
import { toggleTask, deleteTask } from "./actions";

type Task = {
    id: string;
    title: string;
    done: boolean;
};

export default function TaskItem({ task }: { task: Task }) {
    return (
        <li className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id, task.done)}
                    className="w-5 h-5 accent-blue-600 cursor-pointer"
                />
                <span className={
                    task.done
                        ? "line-through text-gray-400 text-base"
                        : "text-gray-800 text-base font-medium"
                }>
                    {task.title}
                </span>
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