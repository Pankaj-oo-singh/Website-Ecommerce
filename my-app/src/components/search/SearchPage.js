
import { useLocation } from "react-router-dom";
import ProductCard from "../../Pages/ProductListPage/ProductCard"; // adjust path if needed
import Footer from "../Footer/Footer";

const SearchPage = () => {
  const { state } = useLocation();
  const products = state?.products || [];
  const query = state?.query || "";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-2xl font-semibold mb-6">
          Search results for "{query}"
        </h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </main>

      {/* Footer fixed at bottom */}
      <Footer />
    </div>
  );
};

export default SearchPage;
