export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body

    // Dummy authentication logic
    if (username === "admin" && password === "123456") {
      return res
        .status(200)
        .json({
          success: true,
          user: { username, email: `${username}@gmail.com` },
        })
    }

    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" })
  }

  res.status(405).json({ message: "Method not allowed" })
}
