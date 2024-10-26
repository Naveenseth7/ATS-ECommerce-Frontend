import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect} from 'react';
import summaryApi from './common';

function App() { 

  const fetUserDetails = async () => {
  const dataResponse = await fetch(summaryApi.current_user.url, {
    method: summaryApi.current_user.method,
    credentials: 'include' // Ensures cookies are sent with the request
  })
  // Handle the response, for example:
  const data = await dataResponse.json()
  // Do something with the data
};
  useEffect(() => {
    // user Details
    fetUserDetails()
  },[])
  return (
   <>
    <ToastContainer />
   <Header/> 
   <main className='min-h-[calc(100vh-120px)]'>
   <Outlet/>  
   </main>
   <Footer/>
    </>
  );
}

export default App;
