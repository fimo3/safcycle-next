import React, { useEffect, useRef, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import "leaflet/dist/leaflet.css"
import SpinnerComponent from "../Components/SpinnerComponent"

const Map = ({ startLocation, endLocation, onDataUpdate, mode }) => {
  const mapContainer = useRef(null)
  const [loading, setLoading] = useState(false)
  const [mapInstance, setMapInstance] = useState(null)
  const [directions, setDirections] = useState([])
  const [routeColors, setRouteColors] = useState([])
  const routeLayers = useRef([])
  const startMarker = useRef(null)
  const endMarker = useRef(null)

  // Initialize Leaflet map on client-side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        // Fix for default marker icon paths in Next.js:
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/pin2.png",
          iconUrl: "/pin.png",
        })

        if (!mapInstance && mapContainer.current) {
          const map = L.map(mapContainer.current).setView(
            [42.6977, 23.3219],
            13
          )
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
            attribution: "© OpenStreetMap contributors",
          }).addTo(map)
          setMapInstance(map)
        }
      })
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove() // ✅ Cleanup map on unmount
        setMapInstance(null)
      }
    }
  }, [])

  // Fetch directions when locations change
  const getDirections = useCallback(
    async (start, end) => {
      if (!start || !end)
        return console.error("Start or end location is missing.")

      const apiKey = process.env.NEXT_PUBLIC_GRAPHOPPER_API_KEY
      setLoading(true)

      const url = `https://graphhopper.com/api/1/route?point=${start[0]},${start[1]}&point=${end[0]},${end[1]}&vehicle=${mode}&locale=en&points_encoded=false&key=${apiKey}`

      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.paths && data.paths.length > 0) {
          const sortedPaths = data.paths.sort((a, b) => a.distance - b.distance)
          const colors = []

          const directionsData = sortedPaths.map((path, index) => {
            const randomColor = getRandomColor()
            colors.push(randomColor)

            return {
              time: path.time / 60000,
              distance: path.distance / 1000,
              coordinates: path.points.coordinates.map((coord) => [
                coord[1],
                coord[0],
              ]),
              instructions: path.instructions,
              color: randomColor,
            }
          })

          setDirections(directionsData)
          setRouteColors(colors)
          if (onDataUpdate)
            onDataUpdate({ directions: directionsData, routeColors: colors })

          // Remove old route layers
          routeLayers.current.forEach((layer) => layer.remove())
          routeLayers.current = []

          import("leaflet").then((L) => {
            // Add new route layers
            directionsData.forEach((route, index) => {
              const routeLayer = L.polyline(route.coordinates, {
                color: route.color,
                weight: 6 - index,
                opacity: (9 - index) / 10,
              }).addTo(mapInstance)
              routeLayers.current.push(routeLayer)
            })

            // Remove previous markers if they exist
            if (startMarker.current) startMarker.current.remove()
            if (endMarker.current) endMarker.current.remove()

            // Add new markers using updated icons
            startMarker.current = L.marker(start)
              .addTo(mapInstance)
              .bindPopup("Start Location")
              .openPopup()
            endMarker.current = L.marker(end)
              .addTo(mapInstance)
              .bindPopup("End Location")
              .openPopup()

            // Fit map bounds
            mapInstance.fitBounds(L.latLngBounds(directionsData[0].coordinates))
          })
        } else {
          console.error("No route found in response")
        }
      } catch (error) {
        console.error("Error fetching route:", error)
      } finally {
        setLoading(false)
      }
    },
    [mapInstance, mode, onDataUpdate]
  )

  // Run getDirections when dependencies change
  useEffect(() => {
    if (mapInstance && startLocation && endLocation) {
      getDirections(startLocation, endLocation)
    }
  }, [mapInstance, startLocation, endLocation, mode, getDirections])

  // Generate a random color for routes
  const getRandomColor = () => {
    let red, green, blue
    do {
      red = Math.floor(Math.random() * 50)
      green = Math.floor(Math.random() * 256)
      blue = Math.floor(Math.random() * 50)
    } while (!(red + green + blue >= 100))
    return `#${red.toString(16).padStart(2, "0")}${green
      .toString(16)
      .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`
  }

  return (
    <div>
      {loading && <SpinnerComponent />}
      <div
        ref={mapContainer}
        style={{ height: "90vh", width: "100%" }}
        className="map-container"
      />
    </div>
  )
}

// Disable SSR for this component via Next.js dynamic import
export default dynamic(() => Promise.resolve(Map), { ssr: false })
