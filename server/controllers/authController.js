const users = [{ id: 1, email: 'test@example.com', password: '111111' }]

exports.login = (req, res) => {
  const { email, password } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' })
  } else if (!password) {
    return res.status(400).json({ error: 'Password is required.' })
  }
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid email or password' })
  }

  const user = users.find(
    (user) => user.email === email && user.password === password,
  )
  if (user) {
    req.session.user = user
    res.json({ success: true, user: { id: user.id, email: user.email } })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
}

exports.logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
      res.json({ success: true, message: 'Logout successful' })
    })
  } else {
    res.status(401).json({ error: 'Not logged in' })
  }
}

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPassword = (password) => {
  return password.length >= 6 && password.length <= 20
}
