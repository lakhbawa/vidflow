"use client";
import {FormEvent} from "react";
import {apiFetch} from "@/lib/api";

export default function AuthPage() {

    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        console.log('Logging in with', {username, password});

        try {
            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
            });

            if (response) {
                console.log('Login successful');
                // Redirect or update UI accordingly
            }
        } catch (error) {
            console.error('Login failed', error);
            // Show error message to user
        }
        // Add your login logic here


    }

    return (
        <><h1>Login Page</h1>
            <form
                onSubmit={handleLogin} method="POST"
                className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-md rounded-lg space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

                <div>
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-blue-500 transition"
                >
                    Login
                </button>
            </form>

        </>
    );
}