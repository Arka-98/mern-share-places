import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from './components/context/AppContext';
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';
import Auth1 from './components/auth/Auth1';
import Auth2 from './components/auth/Auth2';
import Spinner from './components/layout/Spinner';

const Home = lazy(() => import('./pages/Home'))
const Profile = lazy(() => import('./pages/Profile'))
const AddPlace = lazy(() => import('./pages/AddPlace'))
const EditPlace = lazy(() => import('./pages/EditPlace'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const NotFound = lazy(() => import('./pages/NotFound'))
const About = lazy(() => import('./pages/About'))
const UserPlaces = lazy(() => import('./pages/UserPlaces'))

function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<PageLayout/>}>
              <Route index element={<Home/>} />
              <Route element={<Auth1/>}>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
              </Route>
              <Route element={<Auth2/>}>
                <Route path='/profile' element={<Profile/>} />
                <Route path='/add-place' element={<AddPlace/>} />
                <Route path='/edit-place/:placeId' element={<EditPlace/>} />
              </Route>
              <Route path='/:userId/places' element={<UserPlaces/>} />
              <Route path='/forgot-password' element={<ForgotPassword/>} />
              <Route path='/about' element={<About/>} />
              <Route path='*' element={<NotFound/>} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <ToastContainer />
    </AppProvider>
  )
}

export default App;
