import { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import cookie from 'react-cookies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Courses from './components/Courses';
import LessonDetails from './components/LessonDetails';
import Lessons from './components/Lessons';
import Login from './components/Login';
import { UserContext } from './configs/MyContext';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import userReducer from './reducers/UserReducer';

function App() {
  const [user, dispatch] = useReducer(userReducer, cookie.load("current-user") || null)

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
            <Route path='*' element={<h1>Comming soon...</h1>}></Route>
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
