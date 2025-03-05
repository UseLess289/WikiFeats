import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SearchPage from './components/SearchPage'
import SubmitCollaboration from './components/SubmitCollaboration'
import AdminPage from './components/Admin/AdminPage'
import NotFound from './components/NotFound'
import BackendStatus from './components/BackendStatus'

function App() {
  return (
    <div className="app">
      <BackendStatus />
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={
          <>
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/submit" element={<SubmitCollaboration />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App 