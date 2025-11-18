import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/Navbar';
import EmergencyBanner from './components/EmergencyBanner';
import Home from './pages/Home';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import ShareStory from './pages/ShareStory';
import EditStory from './pages/EditStory';
import Resources from './pages/Resources';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="App">
          <EmergencyBanner />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<StoryDetail />} />
              <Route path="/share-story" element={<ShareStory />} />
              <Route path="/edit-story/:id" element={<EditStory />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;
