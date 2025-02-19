import React, { useContext } from "react"
import { useRouter } from "next/router" // ✅ Use Next.js useRouter instead of useNavigate
import { AuthContext } from "./AuthProvider"
import Button from "./Button"

const Profile = () => {
  const { username, password, email, logout } = useContext(AuthContext)
  const router = useRouter() // ✅ Replace useNavigate with useRouter

  const handleLogout = () => {
    logout()
    router.push("/login") // ✅ Redirect to login page in Next.js
  }

  const maskPassword = (password) => {
    if (!password) return "undefined"
    return `${"*".repeat(password.length)}`
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="profile-page">
        <div className="title">
          <div className="avatar-big-container">
            <img src="/avatar.png" alt="avatar" className="avatar-big" />{" "}
            {/* ✅ Use /public path */}
          </div>
          <div>
            <div className="flex-container">
              <h2 className="userinfo">Username:</h2>
              <p className="userinfo">{username || "undefined"}</p>
            </div>
            <div className="flex-container">
              <h2 className="userinfo">Email:</h2>
              <p className="userinfo">{email || "undefined"}</p>
            </div>
            <div className="flex-container">
              <h2 className="userinfo">Password:</h2>
              <p className="userinfo">{maskPassword(password)}</p>
            </div>
          </div>
        </div>
        <div className="content"></div>
        <Button className="Logout" onClick={handleLogout} content="Logout" />
      </div>
    </div>
  )
}

export default Profile
