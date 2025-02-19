import React, { useState } from "react"
import { AuthContext } from "../src/Components/AuthProvider"
import { Roboto_Condensed } from "next/font/google"
import "../styles/globals.css"

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
})
function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)

  const login = (user, pass) => {
    setUsername(user)
    setPassword(pass)
    setEmail(`${user}@gmail.com`)
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUsername(null)
    setPassword(null)
    setEmail(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      className={robotoCondensed.className}
      value={{ username, password, email, login, logout, isAuthenticated }}
    >
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
