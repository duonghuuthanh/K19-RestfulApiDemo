import { useReducer } from 'react';
import { Container } from 'react-bootstrap';
import cookie from 'react-cookies';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Courses from './components/Courses';
import LessonDetails from './components/LessonDetails';
import Lessons from './components/Lessons';
import Login from './components/Login';
import Register from './components/Register';
import { MyUserContext } from './configs/MyContext';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import myUserReducer from './reducers/MyUserReducer';

function App() {
  const [user, dispatch] = useReducer(myUserReducer, cookie.load('current-user') || null)

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        
        <Container>
          <Routes>
            <Route path='/' element={<Courses /> } />
            <Route path='/courses/:courseId/lessons' element={<Lessons />} />
            <Route path='/lessons/:lessonId' element={<LessonDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<div className='alert alert-info m-1'>Comming soon...</div>} />
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter> 
    </MyUserContext.Provider>
  );
}

export default App;
