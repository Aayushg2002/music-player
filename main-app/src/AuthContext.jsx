
// import { createContext, useState, useEffect } from 'react'

// export const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [token, setToken] = useState(localStorage.getItem('token') || null)

//   const login = (username, password) => {
//     // Mock authentication
//     let role = 'user'
//     if (username === 'admin' && password === 'admin123') {
//       role = 'admin'
//     }
    
//     const mockToken = `mock-jwt-token-${username}-${role}`
//     setUser({ username, role })
//     setToken(mockToken)
//     localStorage.setItem('token', mockToken)
//   }

//   const logout = () => {
//     setUser(null)
//     setToken(null)
//     localStorage.removeItem('token')
//   }

//   useEffect(() => {
//     // Check for existing token on app load
//     const storedToken = localStorage.getItem('token')
//     if (storedToken) {
//       // Parse the mock token to get user info
//       const parts = storedToken.split('-')
//       if (parts.length === 4) {
//         setUser({
//           username: parts[2],
//           role: parts[3]
//         })
//         setToken(storedToken)
//       }
//     }
//   }, [])

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const login = (username, password) => {
    // Mock authentication
    const role = username === 'admin' ? 'admin' : 'user'
    const mockToken = `mock-jwt-${username}-${role}`
    
    setUser({ username, role })
    setToken(mockToken)
    localStorage.setItem('token', mockToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      // Parse token to get user info
      const parts = storedToken.split('-')
      if (parts.length === 4) {
        setUser({
          username: parts[2],
          role: parts[3]
        })
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}