import React, { useState, useContext } from "react"
import { useRouter } from "next/router"
import { AuthContext } from "../src/Components/AuthProvider"
import Login from "../src/Components/Login"
export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    if (data.success) {
      login(username, password)
      router.push("/profile")
    } else {
      alert("Invalid credentials")
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <Login />
    </div>
  )
}
