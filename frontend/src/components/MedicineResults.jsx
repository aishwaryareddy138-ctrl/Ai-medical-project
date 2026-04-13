import ShopCard from './ShopCard';

const MedicineResults = ({ searchedMedicine, shops, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((skeleton) => (
          <div key={skeleton} className="bg-white rounded-2xl p-6 border border-slate-100 h-64 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-3"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-12 bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
        <p className="font-medium">Failed to fetch results.</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  if (!searchedMedicine && shops.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-100 mb-6 text-slate-400">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Find the Medicine You Need</h2>
        <p className="text-slate-500">Search above to see real-time availability in nearby shops.</p>
      </div>
    );
  }

  if (shops.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-16 text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-50 mb-6 text-amber-500">
           <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">No Shops Found</h2>
        <p className="text-slate-500">We couldn't find any shops carrying <strong>{searchedMedicine}</strong> nearby.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 pb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl text-slate-800 font-medium">
          Availability for <span className="font-bold text-primary-700">{searchedMedicine}</span>
        </h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-200 py-1 px-3 rounded-full">
          {shops.length} {shops.length === 1 ? 'Shop' : 'Shops'} Found
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.map((shop) => (
          <ShopCard key={shop._id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default MedicineResults;
