import React, { useContext, useEffect } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../src/Components/AuthProvider"

export default function ProfilePage() {
  const { username, email, logout, isAuthenticated } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Profile</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <p className="text-lg text-gray-800 mb-4">
          <strong>Username:</strong> {username || "Guest"}
        </p>
        <p className="text-lg text-gray-800 mb-4">
          <strong>Email:</strong> {email || "Not Available"}
        </p>

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
