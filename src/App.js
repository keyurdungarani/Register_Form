import './App.css';
import Data from './components/Data';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataProtectRouter from './service/DataProtectRouter';
import PublicRouter from './service/PublicRouter';
import Students from './components/Students';
import StudentProtectRouter from './service/StudentProtectRouter';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<PublicRouter />}>
            <Route path='signup' element={<SignUp />} />
            <Route path='/' element={<SignUp />} />
          </Route>
          <Route path='/' element={<DataProtectRouter />} >
            <Route path=':email' element={<Students />} />
            <Route path='data' element={<Data />} />
            <Route path='login' element={<Login />} />
            <Route path='students/:email' element={<Students />} />
          </Route>
          <Route path='/' element={<StudentProtectRouter />}>
          </Route>
        </Routes>
      </div>
      {/* <Toaster /> */}
      <Toaster
        containerStyle={{
          position: 'top-right',
        }}
      />
    </BrowserRouter>
  );
}

export default App;
