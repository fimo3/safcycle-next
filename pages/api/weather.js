export default async function handler(req, res) {
  const { lat, lon } = req.query
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing latitude or longitude" })
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch weather data")

    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching weather data", details: error.message })
  }
}
