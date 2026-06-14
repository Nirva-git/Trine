import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { ContentProvider } from './context/ContentContext'
import HomePage from './pages/HomePage'
import ProjectCategoryPage from './pages/ProjectCategoryPage'
import ServicesPage from './pages/ServicesPage'
import VisionaryPage from './pages/VisionaryPage'
import PlantMachineryPage from './pages/PlantMachineryPage'
import LifeAtTrinePage from './pages/LifeAtTrinePage'
import CareersPage from './pages/CareersPage'
import AdminPage from './pages/AdminPage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <ContentProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route
            path="*"
            element={
              <div className="app">
                <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects/:slug" element={<ProjectCategoryPage />} />

                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/our-strength/visionary" element={<VisionaryPage />} />
                  <Route path="/our-strength/plant-machinery" element={<PlantMachineryPage />} />
                  <Route path="/life-at-trine" element={<LifeAtTrinePage />} />
                  <Route path="/careers" element={<CareersPage />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </ContentProvider>
    </BrowserRouter>
  )
}

export default App
