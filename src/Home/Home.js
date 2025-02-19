import React, { useState } from "react"
import Button from "../Components/Button"
import XButton from "../Components/XButton"
import RoutePane from "../Components/RoutePane"
import DirectionsInfoPane from "../Components/DirectionsInfoPage"
import logo from "../../public/SAFCycle copy.png"
import Image from "next/image"

const Home = ({ onSubmit, mapData, mode, setMode }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      {!isOpen && (
        <div className="welcome-container">
          <Image src={logo} alt="Logo" className="logo" />
          <h1>Welcome to SAFCycle!</h1>
          <div className="flex-container">
            <div>
              <p>Your ultimate guide for navigating bike paths and routes.</p>
              <p>Explore the map to find the best biking routes around you!</p>
            </div>
          </div>
          <div>
            <Button href="#" content="Let's go >>" onClick={handleOpen} />
          </div>
        </div>
      )}
      {isOpen && (
        <div className="route-container">
          <div className="header">
            <h3>Route</h3>
            <XButton href="#" onClick={handleClose} />
          </div>
          <RoutePane onSubmit={onSubmit} />
          <DirectionsInfoPane
            directions={mapData.directions}
            weatherData={mapData.weatherData}
            routeColors={mapData.routeColors}
            mode={mode}
            setMode={setMode}
          />
        </div>
      )}
    </div>
  )
}

export default Home
