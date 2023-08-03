import {Routes , Route } from 'react-router-dom';
import axios from 'axios';
import './App.css'

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'
import Layout from './Layout';
import { UserContextProvider } from './UserContext';
import PlacesPage from './pages/PlacesPage';
import PlacesForm from './components/PlacesForm';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.withCredentials=true;
function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<IndexPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path='/account/' element={<ProfilePage/>} />
          <Route path='/account/places' element={<PlacesPage/>} />
          <Route path='/account/places/new' element={<PlacesForm/>} />
          <Route path='/account/places/:id' element={<PlacesForm/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
