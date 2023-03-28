import './App.css';
import Header from './layouts/Header';
import Courses from './components/Courses';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lessons from './components/Lessons';
import Footer from './layouts/Footer';
import LessonDetails from './components/LessonDetails';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<Courses />} />
            <Route path='/courses/:courseId/lessons' element={<Lessons />} />
            <Route path='/lessons/:lessonId' element={<LessonDetails />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
