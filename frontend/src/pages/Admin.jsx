import { useState, useEffect } from 'react';
import { addShop, addMedicine, getAllShops, searchMedicines, addOrUpdateInventory } from '../services/api';
import { Pill, Store, Database } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  
  // Data States
  const [shops, setShops] = useState([]);
  const [medicines, setMedicines] = useState([]); // for dropdowns

  // Form States
  const [shopForm, setShopForm] = useState({ name: '', address: '', phone: '' });
  const [medForm, setMedForm] = useState({ name: '' });
  const [invForm, setInvForm] = useState({ shopId: '', medicineId: '', available: true, quantity: 10 });
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch initial data for dropdowns
  const fetchDropdownData = async () => {
    try {
      const shopsData = await getAllShops();
      setShops(shopsData);
      
      const medsData = await searchMedicines(''); // empty string returns limit 50
      setMedicines(medsData);
    } catch (err) {
      console.error('Failed to fetch dropdown data', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchDropdownData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') { // Simple hardcoded auth based on user agreement
      setIsAuthenticated(true);
    } else {
      setError('Invalid passcode. Try "admin123"');
    }
  };

  const showMessage = (msg, isError = false) => {
    if (isError) {
      setError(msg);
      setMessage('');
    } else {
      setMessage(msg);
      setError('');
    }
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 4000);
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addShop(shopForm);
      setShopForm({ name: '', address: '', phone: '' });
      showMessage('Shop added successfully!');
      fetchDropdownData(); // refresh list
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to add shop', true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addMedicine(medForm);
      setMedForm({ name: '' });
      showMessage('Medicine added successfully!');
      fetchDropdownData(); // refresh list
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to add medicine', true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateInventory = async (e) => {
    e.preventDefault();
    if (!invForm.shopId || !invForm.medicineId) {
      showMessage('Please select a shop and a medicine', true);
      return;
    }
    setLoading(true);
    try {
      await addOrUpdateInventory({
        shop: invForm.shopId,
        medicine: invForm.medicineId,
        available: invForm.available,
        quantity: Number(invForm.quantity)
      });
      showMessage('Inventory updated successfully!');
      setInvForm({ ...invForm, quantity: 0, available: false });
    } catch (err) {
      showMessage(err.response?.data?.error || 'Failed to update inventory', true);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-140px)]">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Admin Access</h2>
          {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Passcode</label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full border border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter passcode"
                required
              />
            </div>
            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2">Manage shops, medicines, and inventory levels.</p>
      </div>

      {(message || error) && (
        <div className={`p-4 mb-6 rounded-lg font-medium text-sm border ${error ? 'bg-red-50 text-red-800 border-red-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'}`}>
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ADD SHOP */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Store size={20} /></div>
            <h2 className="text-xl text-slate-800 font-semibold">Add New Shop</h2>
          </div>
          <form onSubmit={handleAddShop} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Shop Name</label>
              <input type="text" value={shopForm.name} onChange={e => setShopForm({...shopForm, name: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <textarea value={shopForm.address} onChange={e => setShopForm({...shopForm, address: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" rows="2" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input type="text" value={shopForm.phone} onChange={e => setShopForm({...shopForm, phone: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70">
              Create Shop
            </button>
          </form>
        </div>

        {/* ADD MEDICINE */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Pill size={20} /></div>
            <h2 className="text-xl text-slate-800 font-semibold">Add Medicine Database</h2>
          </div>
          <form onSubmit={handleAddMedicine} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
              <input type="text" value={medForm.name} onChange={e => setMedForm({...medForm, name: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-rose-500" placeholder="e.g. Paracetamol 500mg" required />
            </div>
            <div className="pt-2 text-sm text-slate-500 italic">
              Adds a global medicine reference to the database that can later be attached to shop inventories.
            </div>
            <button type="submit" disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-auto disabled:opacity-70">
              Add Global Medicine
            </button>
          </form>
        </div>

        {/* ADD INVENTORY */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><Database size={20} /></div>
            <h2 className="text-xl text-slate-800 font-semibold">Update Inventory</h2>
          </div>
          <form onSubmit={handleUpdateInventory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Shop</label>
              <select value={invForm.shopId} onChange={e => setInvForm({...invForm, shopId: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                <option value="">-- Choose Shop --</option>
                {shops.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Select Medicine</label>
              <select value={invForm.medicineId} onChange={e => setInvForm({...invForm, medicineId: e.target.value})} className="w-full border border-slate-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" required>
                <option value="">-- Choose Medicine --</option>
                {medicines.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
            </div>
            
            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={invForm.available} onChange={e => setInvForm({...invForm, available: e.target.checked})} className="rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4" />
                <span className="text-sm font-medium text-slate-700">In Stock</span>
              </label>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-slate-700">Quantity:</label>
                <input type="number" min="0" value={invForm.quantity} onChange={e => setInvForm({...invForm, quantity: e.target.value})} className="w-20 border border-slate-300 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" disabled={!invForm.available} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors mt-2 disabled:opacity-70">
              Save Inventory
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Admin;
