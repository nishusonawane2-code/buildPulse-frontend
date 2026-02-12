import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Projects from './views/Projects'
import ProjectDetails from './views/ProjectDetails'
import Home from './views/Home'
import Estimator from './views/Estimator'
import FloorPlans from "./views/FloorPlans"
import ContactUs from './views/ContactUs'
import ThankYou from './views/ThankYou'
import Estimates from './views/admin/Estimates'

import { AuthProvider } from './context/AuthContext'
import Login from './views/auth/Login'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './views/admin/AdminDashboard'
import Leads from './views/admin/Leads'
import ProjectsAdmin from './views/admin/ProjectsAdmin'
import Inquiries from './views/admin/Inquiries'
import ClientDashboard from './views/client/ClientDashboard'
import OAuth2RedirectHandler from './views/auth/OAuth2RedirectHandler'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './views/Profile'
import PrivacyPolicy from './views/PrivacyPolicy'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/estimator' element={<Estimator />} />
          <Route path='/floorplans' element={<FloorPlans />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/:id' element={<ProjectDetails />} />
          <Route path='/contactus' element={<ContactUs />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />

          {/* Auth Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler />} />

          {/* Generic Protected Routes (Any Authenticated User) */}
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          {/* Client Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="USER" />}>
            <Route path='/dashboard' element={<ClientDashboard />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path='leads' element={<Leads />} />
              <Route path='projects' element={<ProjectsAdmin />} />
              <Route path='estimates' element={<Estimates />} />
              <Route path='inquiries' element={<Inquiries />} />
            </Route>
          </Route>

          <Route path='*' element={<h1>404 not found</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
