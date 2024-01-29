import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Books, Book, Authenticate, NavBar, Profile, SavedBooks, SignIn, SignUp, LogOut, AvailableBooks, ReservedBooks } from './components'

function App() {
  {/* Complete the React components needed to allow users to browse a library catalog, check out books, review their account, and return books that they've finished reading. */}
  {/* You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not. */}
  {/* Don't forget to set up React Router to navigate between the different views of your single page application! */}
  return (
    <Router basename='block30_unit3_book_buddy_career_starter/'>
      {/* Display the NavBar on all pages */}
      <NavBar />
      <Routes>
        <Route index element={<Books />} />
        <Route path="/:id" element={<Book />} />
        <Route path="/auth" element={<Authenticate />} />
        <Route path="/signin" element={<SignIn width={{ xs: "80%", md: "40%" }} />} />
        <Route path="/signup" element={<SignUp width={{ xs: "80%", md: "40%" }} />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/savedbooks" element={<SavedBooks />} />
        <Route path="/reservedbooks" element={<ReservedBooks />} />
        <Route path="/availablebooks" element={<AvailableBooks />} />
      </Routes>
    </Router>
  )
}

export default App
