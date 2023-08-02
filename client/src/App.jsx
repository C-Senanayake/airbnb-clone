import {Routes , Route } from 'react-router-dom';
import axios from 'axios';
import './App.css'

import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage'
import Layout from './Layout';
import { UserContextProvider } from './UserContext';

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
          <Route path='/account/:subpage?' element={<AccountPage/>} />
          <Route path='/account/:subpage/:action' element={<AccountPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
