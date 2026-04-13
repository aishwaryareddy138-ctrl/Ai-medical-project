import { MapPin, Phone, CheckCircle2, XCircle } from 'lucide-react';

const ShopCard = ({ shop }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-slate-800 line-clamp-2">{shop.name}</h3>
          {shop.available && shop.quantity > 0 ? (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 shrink-0">
              <CheckCircle2 size={16} />
              <span>In Stock ({shop.quantity})</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 shrink-0">
              <XCircle size={16} />
              <span>Out of Stock</span>
            </span>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start text-slate-600">
            <MapPin size={18} className="mr-3 mt-1 shrink-0 text-slate-400" />
            <p className="leading-relaxed">{shop.address}</p>
          </div>
          <div className="flex items-center text-slate-600">
            <Phone size={18} className="mr-3 shrink-0 text-slate-400" />
            <p>{shop.phone}</p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-100">
        <a 
          href={`tel:${shop.phone}`} 
          className="w-full flex justify-center items-center py-2 px-4 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          Contact Shop
        </a>
      </div>
    </div>
  );
};

export default ShopCard;
