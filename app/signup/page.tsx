"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setError("");
      setLoading(true);

        const res = await fetch("/api/signup", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name, email, password }),
        });

        setLoading(false);

        if (res.ok) {
          router.push("/login");
        } else {
          const data = await res.json();
          setError(data.message || "something went wrong");
        }
    }
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome on the Task Manager</h1>
                    <p className="text-gray-500 mt-2">Sign up to your account</p>
                </div>    

                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
                      {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                        <input
                          type="text"
                          placeholder="michael-smith"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div> 
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>   
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>    
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        />
                    </div>    
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
                    >
                       {loading ? "Signing up..." : "Sign up"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                     Already have an account?{""}
                   <Link href="/login" className="text-blue-600 font-medium hover:underline">
                       Sign In
                   </Link>
                </p>
            </div>
        </main>
    );
}           