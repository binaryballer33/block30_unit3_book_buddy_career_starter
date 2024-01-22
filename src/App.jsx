import { useState } from 'react'
import bookLogo from './assets/books.png'
import { Box, Typography } from '@mui/material'
import Books from './components/Books'

function App() {
  const [token, setToken] = useState(null)

  return (
    <Box>
      <Typography textAlign="center" variant="h3" color="primary"><img id='logo-image' src={bookLogo}/>Library App</Typography>
      <Books />
      
      {/* Delete this later, it's really just comments in the code */}
      {/* Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading. */}
      {/* You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not. */}
      {/* Don't forget to set up React Router to navigate between the different views of your single page application! */}
    </Box>
  )
}

export default App
