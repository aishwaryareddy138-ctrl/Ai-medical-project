import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MedicineResults from '../components/MedicineResults';
import { searchMedicines, getShopsByMedicine } from '../services/api';

const Home = () => {
  const [searchedMedicine, setSearchedMedicine] = useState(null);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    setSearchedMedicine(query);
    setShops([]); // Reset

    try {
      // 1. Search for medicine by name
      const medicines = await searchMedicines(query);
      
      // If medicine exists, fetch shops carrying it
      if (medicines && medicines.length > 0) {
        // We pick the first one for simplicity, or we could handle multiple variations
        const targetMedicine = medicines[0];
        setSearchedMedicine(targetMedicine.name); // Normalize name to DB match
        
        // 2. Fetch shops inventory for this medicine ID
        const shopResults = await getShopsByMedicine(targetMedicine._id);
        
        // Sort shops by availability (In stock first)
        const sortedShops = shopResults.sort((a, b) => {
          if (a.available === b.available) return 0;
          return a.available ? -1 : 1;
        });

        setShops(sortedShops);
      } else {
        // Medicine not found in DB
        setShops([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong. Please try again or assure backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Background decoration gradient */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>

      <div className="mx-auto max-w-4xl py-10 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Find the medical supplies <span className="text-primary-600">you need</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            Quickly check the stock availability of medicines in pharmacies around your location. Don't waste time going door-to-door.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        
        <MedicineResults 
          searchedMedicine={searchedMedicine} 
          shops={shops} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
};

export default Home;
