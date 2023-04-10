import './App.css';
import Header from './layouts/Header';
import Courses from './components/Courses';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lessons from './components/Lessons';
import Footer from './layouts/Footer';
import LessonDetails from './components/LessonDetails';
import Login from './components/Login';
import { UserContext } from './configs/MyContext';
import UserReducer from './reducers/UserReducer';
import { useReducer } from 'react';
import cookie from 'react-cookies';
import Register from './components/Register';

function App() {
  let current = cookie.load("current-user")
  if (current === undefined)
    current = null

  const [user, dispatch] = useReducer(UserReducer, current)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses/:courseId/lessons' element={<Lessons />} />
            <Route path='/lessons/:lessonId' element={<LessonDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
