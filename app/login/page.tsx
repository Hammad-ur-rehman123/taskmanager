"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();
        setError("");
        const res = await signIn("credentials",{
            email,
            password,
            redirect: false,
        });

        if(res?.ok) {
            router.push("/");
        } else {
            setError("invalid email or password");
        }
    }
    return (
        <main className="max-w-md mx-auto mt-16 px-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </main>
    );
}                