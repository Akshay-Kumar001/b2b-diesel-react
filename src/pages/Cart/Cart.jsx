import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import CartContext from "../../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="text-center py-20">
          <ShoppingCart className="mx-auto text-gray-300" size={64} />

          <h1 className="text-3xl font-bold mt-6">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added any products yet.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
          >
            Browse Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-12">

      {/* Page Header */}
      <div className="mb-10">
        <p className="text-orange-500 uppercase tracking-widest text-sm font-semibold">
          Your Selection
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mt-2">
          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="text-gray-500">
            {totalItems} {totalItems === 1 ? "Item" : "Items"}
          </p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-5">

          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row gap-5">

                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">

                  <div className="flex justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 text-sm mt-1">
                        {item.category}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>

                  <p className="text-red-500 font-semibold text-lg mt-4">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center justify-between mt-5">

                    <div className="flex items-center border rounded-lg overflow-hidden">

                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-5 py-2 font-medium border-x">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-2 hover:bg-gray-100 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>

                    </div>

                    {/* Item Total */}
                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border rounded-xl p-6 lg:sticky lg:top-24">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="text-gray-500">
                  Calculated at checkout
                </span>
              </div>

            </div>

            <div className="border-t mt-6 pt-5 flex justify-between items-center">
              <span className="text-lg font-bold">
                Total
              </span>

              <span className="text-2xl font-bold text-red-500">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition flex items-center justify-center gap-2 font-medium"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/products"
              className="mt-3 w-full border border-gray-300 hover:bg-white py-3 rounded-lg transition flex items-center justify-center"
            >
              Continue Shopping
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;