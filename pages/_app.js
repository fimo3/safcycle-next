import React, { useState } from "react"
import { AuthContext } from "../src/Components/AuthProvider"
import { Roboto_Condensed } from "next/font/google"
import "../styles/globals.css"
import Navbar from "../src/Components/Navbar" // Make sure this path is correct

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

  // Global theme state
  const [isDarkMode, setIsDarkMode] = useState(false)

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

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <AuthContext.Provider
      value={{ username, password, email, login, logout, isAuthenticated }}
    >
      <main
        className={`${robotoCondensed.className} ${isDarkMode ? "dark" : ""}`}
      >
        {/* Navbar now receives theme props from _app.js */}
        <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </main>
    </AuthContext.Provider>
  )
}

export default MyApp
