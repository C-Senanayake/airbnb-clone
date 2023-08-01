import {Routes , Route } from 'react-router-dom';
import './App.css'

import IndexPage from './pages/IndexPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<IndexPage/>} />
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
        </Route>
      </Routes>
  )
}

export default App
