import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Courses from './components/Courses';
import LessonDetails from './components/LessonDetails';
import Lessons from './components/Lessons';
import Footer from './layouts/Footer';
import Header from './layouts/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Courses />} />
          <Route path='/courses/:courseId/lessons' element={<Lessons />} />
          <Route path='/lessons/:lessonId' element={<LessonDetails />} />
          <Route path='*' element={<h3 className='text-success'>Comming soon...</h3>} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>    
  );
}

export default App;
