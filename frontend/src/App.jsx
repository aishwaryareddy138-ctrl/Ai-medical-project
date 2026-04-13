import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { Pill } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <nav className="relative z-50 bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-primary-500 p-2 rounded-lg text-white">
                  <Pill size={24} />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
                  MedFinder
                </span>
              </Link>
              <div className="flex space-x-4">
                <Link to="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                  Find Medicine
                </Link>
                <Link to="/admin" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-white py-6 border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MedFinder. Helping you find medicines easily.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
