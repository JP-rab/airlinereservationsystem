import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";
import Home from './Pages/HomePage/Home';
import AdminLayout from './Layouts/AdminLayout';
import { SearchContextProvider } from './Context/SearchContext';
import UserLogin from './Pages/AuthPages/UserLogin';
import AdminDashboard from './Pages/AdminPage/AdminDashboard';
import AdminPilots from './Pages/AdminPage/AdminPilots';
import AdminAirplanes from './Pages/AdminPage/AdminAirplanes';
import AdminFlights from './Pages/AdminPage/AdminFlights';
import AdminAirports from './Pages/AdminPage/AdminAirports';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path='/user/login' element={<UserLogin />} />


      <Route path='/admin/'>
        <Route element={<AdminLayout />}>
          <Route path='dashboard' element={<AdminDashboard />}/>
          <Route path='pilots' element={<AdminPilots />} />
          <Route path='airplanes' element={<AdminAirplanes />} />
          <Route path='flights' element={<AdminFlights />} />
          <Route path='airports' element={<AdminAirports />} />
        </Route>
      </Route>
      
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  </StrictMode>,
)
