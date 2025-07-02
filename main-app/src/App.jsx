
import { lazy, Suspense, useContext ,useState } from 'react'
import { AuthContext } from './AuthContext'
import './App.css'

const MusicLibrary = lazy(() => import('musicLibrary/MusicLibrary'))

function App() {
  const { user, login, logout } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div className="app">
      <header>
        <h1>Music Library</h1>
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.username} ({user.role})</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        )}
      </header>

      <main>
        {user ? (
          <Suspense fallback={<div>Loading Music Library...</div>}>
            <MusicLibrary user={user} />
          </Suspense>
        ) : (
          <div className="login-prompt">
            <p>Please log in to access the music library</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App