
export const songs = [
  { id: 1, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', year: 1975 },
  { id: 2, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', year: 1971 },
  { id: 3, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', year: 1976 },
  { id: 4, title: 'Imagine', artist: 'John Lennon', album: 'Imagine', year: 1971 },
  { id: 5, title: 'Smells Like Teen Spirit', artist: 'Nirvana', album: 'Nevermind', year: 1991 }
]

export const filterSongs = (songs, filterBy, value) => {
  if (!value) return songs
  return songs.filter(song => 
    String(song[filterBy]).toLowerCase().includes(value.toLowerCase())
  )
}

export const sortSongs = (songs, sortBy) => {
  return [...songs].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return -1
    if (a[sortBy] > b[sortBy]) return 1
    return 0
  })
}

export const groupSongs = (songs, groupBy) => {
  return songs.reduce((groups, song) => {
    const key = song[groupBy]
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(song)
    return groups
  }, {})
}