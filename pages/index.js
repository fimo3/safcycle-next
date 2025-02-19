import React, { useState } from "react"
import Link from "next/link" // Use Next.js Link instead of react-router
import Side from "../src/Components/HomePage"
import Button from "../src/Components/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faMoon,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons"
import avatar from "../public/avatar.png" // Directly use /public path in Next.js

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLightMode, setIsLightMode] = useState("light")

  const toggleTheme = () => {
    setIsLightMode(!isLightMode)
  }

  return (
    <div className={`App ${isLightMode ? "light-mode" : "dark"}`}>
      <header className="App-header">
        <nav>
          <ul className="navul">
            <li>
              <Link href="/">
                <p className="SAFCycle-nav-title">
                  <FontAwesomeIcon style={{ color: "#f2f2f2" }} icon={faHome} />
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p>Contact</p>
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link href="/profile">
                  <img
                    src={avatar}
                    width={40}
                    className="small-avatar"
                    alt="avatar"
                  />
                </Link>
                <button onClick={() => setIsAuthenticated(false)}>
                  <FontAwesomeIcon
                    className="padding-left-12px"
                    icon={faSignOut}
                  />
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login">
                  <p>Login</p>
                </Link>
              </li>
            )}
            <li>
              <Button
                onClick={toggleTheme}
                className="switcher theme-switcher"
                content={
                  <FontAwesomeIcon icon={isLightMode ? faMoon : faSun} />
                }
              />
            </li>
          </ul>
        </nav>
      </header>

      <Side />
    </div>
  )
}
