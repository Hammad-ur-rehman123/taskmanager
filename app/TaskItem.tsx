"use client";
import { toggleTask, deleteTask } from "./actions";
type Task = {
    id: string;
    title: string;
    done: boolean;
};
export default function TaskItem({ task }:{task: Task }) {
    return (
        <li className="flex items-center justify-between border border-gray-200 rounded px-3 py-2">
            <div className="flex items-center gap-3">
                <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id, task.done)}
                className="w-4 h-4"
                />
                <span className={task.done ? "line-through text-gray-400" : "text-gray-800"}>
                    {task.title}
                </span>
            </div>
            <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-700 text-sm"
            >
                Delete
            </button>

        </li>
    );

}