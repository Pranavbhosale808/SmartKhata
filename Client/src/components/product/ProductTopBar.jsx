import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const ProductTopBar = ({ onAdd }) => {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 rounded-2xl shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative w-72">
          <MagnifyingGlassIcon className="h-5 w-5 absolute top-2.5 left-3 text-gray-400" />
          <input
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border shadow-sm hover:bg-orange-50">
          <FunnelIcon className="h-5 w-5" />
          Filter
        </button>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 hover:shadow-orange-300/50"
      >
        <PlusIcon className="h-5 w-5" />
        Add Product
      </button>
    </div>
  );
};

export default ProductTopBar;
