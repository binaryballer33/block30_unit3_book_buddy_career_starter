import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Books from './components/Books'
import Book from './components/Book'
import Authenticate from './components/Authenticate'
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import SavedBooks from './components/SavedBooks'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

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
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="/signin" element={<SignIn width={{ xs: "80%", md: "40%" }} />} />
        <Route path="/signup" element={<SignUp width={{ xs: "80%", md: "40%" }} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/savedbooks" element={<SavedBooks />} />
      </Routes>
    </Router>
  )
}

export default App
