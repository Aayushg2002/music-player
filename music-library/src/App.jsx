import { useState } from "react";
import { songs, filterSongs, sortSongs, groupSongs } from "./songs";
import { FaMusic, FaSearch, FaSort, FaUser, FaSignOutAlt, FaPlus, FaTrash } from "react-icons/fa";

const MusicLibrary = ({ user, handleLogout }) => {
  const [songList, setSongList] = useState(songs);
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState("title");
  const [sortBy, setSortBy] = useState("title");
  const [groupBy, setGroupBy] = useState("none");
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSongList(filterSongs(songs, filterBy, e.target.value));
  };

  const handleSortChange = (e) => {
    const sortField = e.target.value;
    setSortBy(sortField);
    setSongList(sortSongs(songList, sortField));
  };

  const handleGroupChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleAddSong = () => {
    const song = {
      id: songs.length + 1,
      ...newSong,
      year: parseInt(newSong.year),
    };
    songs.push(song);
    setSongList([...songs]);
    setNewSong({ title: "", artist: "", album: "", year: "" });
  };

  const handleDeleteSong = (id) => {
    const index = songs.findIndex((song) => song.id === id);
    if (index !== -1) {
      songs.splice(index, 1);
      setSongList(songs.filter((song) => song.id !== id));
    }
  };

  return (
    <div className="music-library">
      {/* Header */}
      <header className="header">
        <h1><FaMusic /> My Music Vault</h1>
        {user && (
          <div className="user-info">
            <span><FaUser /> {user.username}</span>
            <button className="btn btn-delete" onClick={handleLogout}>
              <FaSignOutAlt /> Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Controls Panel */}
      <div className="controls-panel">
        <div className="control-group">
          <label><FaSearch /> Filter by</label>
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
          </select>
          <input
            type="text"
            placeholder={`Search ${filterBy}`}
            value={filter}
            onChange={handleFilterChange}
          />
        </div>

        <div className="control-group">
          <label><FaSort /> Sort by</label>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="title">Title</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div className="control-group">
          <label>🗂️ Group by</label>
          <select value={groupBy} onChange={handleGroupChange}>
            <option value="none">None</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>

      {/* Add Song Form (Admin Only) */}
      {user?.role === "admin" && (
        <div className="add-song-form">
          <h3><FaPlus /> Add New Track</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Title"
              value={newSong.title}
              onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Artist"
              value={newSong.artist}
              onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            />
            <input
              type="text"
              placeholder="Album"
              value={newSong.album}
              onChange={(e) => setNewSong({ ...newSong, album: e.target.value })}
            />
            <input
              type="number"
              placeholder="Year"
              value={newSong.year}
              onChange={(e) => setNewSong({ ...newSong, year: e.target.value })}
            />
          </div>
          <button className="btn btn-add" onClick={handleAddSong}>
            <FaPlus /> Add Song
          </button>
        </div>
      )}

      {/* Songs List */}
      <div className="songs-grid">
        {groupBy === "none" ? (
          songList.map((song) => (
            <div key={song.id} className="song-card">
              <h3>{song.title}</h3>
              <p><strong>Artist:</strong> {song.artist}</p>
              <p><strong>Album:</strong> {song.album} ({song.year})</p>
              {user?.role === "admin" && (
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteSong(song.id)}
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          ))
        ) : (
          Object.entries(groupSongs(songList, groupBy)).map(([group, groupSongs]) => (
            <div key={group} className="group-section">
              <h2 className="group-title">{groupBy}: {group}</h2>
              <div className="songs-grid">
                {groupSongs.map((song) => (
                  <div key={song.id} className="song-card">
                    <h3>{song.title}</h3>
                    <p><strong>Artist:</strong> {song.artist}</p>
                    <p><strong>Album:</strong> {song.album} ({song.year})</p>
                    {user?.role === "admin" && (
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteSong(song.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MusicLibrary;


// New Auth Component
// function Auth() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       // Authentication logic
//     } catch (err) {
//       setError('Invalid credentials');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="brand-header">
//         <img src="/music-note.svg" alt="Music Vault" />
//         <h1>My Music Vault</h1>
//       </div>
//       <form onSubmit={handleSubmit} className="auth-form">
//         {error && <div className="error-message">{error}</div>}
//         <div className="input-group">
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Enter your username"
//           />
//         </div>
//         <div className="input-group">
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? <Spinner /> : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }