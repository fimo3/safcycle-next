import React, { useContext } from "react"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHome,
  faMoon,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons"
import avatar from "../../public/avatar.png" // Use public folder path
import Link from "next/link"
import { AuthContext } from "./AuthProvider"

const NavBar = ({ isDarkMode, toggleTheme }) => {
  const { isAuthenticated, logout } = useContext(AuthContext)

  return (
    <header className="App-header">
      <nav>
        <ul className="navul flex items-center justify-around p-4 bg-green-600 text-white">
          <li>
            <Link href="/">
              <p className="SAFCycle-nav-title text-xl font-bold">
                <FontAwesomeIcon style={{ color: "#f2f2f2" }} icon={faHome} />
              </p>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <p className="hover:text-gray-300">Contact</p>
            </Link>
          </li>
          {isAuthenticated ? (
            <li className="flex items-center space-x-2">
              <Link href="/profile">
                <img
                  src={avatar}
                  width={40}
                  className="small-avatar rounded-full"
                  alt="avatar"
                />
              </Link>
              <button onClick={logout} className="hover:text-gray-300">
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login">
                <p className="hover:text-gray-300">Login</p>
              </Link>
            </li>
          )}
          <li>
            <Button
              onClick={toggleTheme}
              className="switcher theme-switcher"
              content={<FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default NavBar
