import { Routes, Route } from 'react-router-dom';
import CardDetails from './pages/CardDetails';
import Layout from './Layout';
import FilteredCardsPage from './pages/FilteredCardsPage';
import { PropertyProvider } from './context/PropertyContext';
import ScrollToTop from './components/ScrollToTop'; 
import AddProperty from './pages/AddProperty';

const App = () => {
  return (
    <PropertyProvider>
      <ScrollToTop />
      <Routes>
        {/* Main Layout route */}
        <Route path="/" element={<Layout />} />
        {/* Route for search and auction filtering */}
        <Route path="/cards/:searchType/:value/" element={<FilteredCardsPage />} />
        <Route path="/add-property" element={<AddProperty />} />
        {/* Card details route */}
        <Route path="/card-details/:id" element={<CardDetails />} />
      </Routes>
    </PropertyProvider>
  );
};

export default App;
