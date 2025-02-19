import React, { useContext, useState } from "react"
import { useRouter } from "next/router" // ✅ Use Next.js useRouter instead of useNavigate
import { AuthContext } from "./AuthProvider"
import Input from "./Input"
import Button from "./Button"
import { faBicycle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useContext(AuthContext)
  const router = useRouter() // ✅ Replace useNavigate with useRouter

  const handleLogin = (e) => {
    e.preventDefault()
    login(username, password)
    router.push("/profile") // ✅ Use Next.js navigation
  }

  return (
    <div className="flex-center">
      <div className="log-form">
        <h1>
          Login
          <FontAwesomeIcon
            style={{
              color: "#69d952",
              paddingLeft: 15,
            }}
            icon={faBicycle}
          />
        </h1>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" content={"Log in"} />
        </form>
      </div>
      <img src="/green_city.jpg" alt="green city" className="greenCity" />{" "}
      {/* ✅ Use /public path */}
    </div>
  )
}

export default Login
