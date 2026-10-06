import React, { useEffect } from 'react';
import { FavoritesProvider } from './state/Favorites';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Footer, NotFound } from './components/Layout';
import Home from './pages/Home';
import { Listings, PropertyDetail, Favorites } from './pages/PropertyPages';
import { About, Invest, Blog, Article, Contact, Legal } from './pages/Editorial';
import './styles.css';

function PageEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const titles = { '/': 'Luxury Real Estate in Dubai', '/properties': 'Properties', '/favorites': 'Your Collection', '/about': 'Our Story', '/invest': 'Invest in Dubai', '/blog': 'The Journal', '/contact': 'Contact' };
    document.title = `Dubai House | ${titles[pathname] || 'Luxury Real Estate in Dubai'}`;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
class ErrorBoundary extends React.Component {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? <main className="error-page"><h1>A moment, please.</h1><p>Something interrupted your visit. Please refresh to try again.</p><button className="button dark" onClick={() => window.location.reload()}>Refresh page</button></main> : this.props.children; }
}
function App() {
  return <ErrorBoundary><BrowserRouter><FavoritesProvider><PageEffects /><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main"><Routes><Route path="/" element={<Home />} /><Route path="/properties" element={<Listings />} /><Route path="/properties/:id" element={<PropertyDetail />} /><Route path="/favorites" element={<Favorites />} /><Route path="/about" element={<About />} /><Route path="/invest" element={<Invest />} /><Route path="/blog" element={<Blog />} /><Route path="/blog/:slug" element={<Article />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy" element={<Legal kind="privacy" />} /><Route path="/terms" element={<Legal kind="terms" />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></FavoritesProvider></BrowserRouter></ErrorBoundary>;
}
createRoot(document.getElementById('root')).render(<App />);
