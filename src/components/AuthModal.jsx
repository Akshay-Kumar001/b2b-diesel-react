import { X } from "lucide-react";
import { useState } from "react";

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");

  const [loginData, setLoginData] = useState({
  email: "",
  password: "",
});

const [signupData, setSignupData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSignupChange = (e) => {
    const { name, value } = e.target;

    setSignupData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-5">
      <div className="relative w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>

        {/* Heading */}
        <div className="text-center mb-6">
          <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
            Welcome
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {mode === "login" ? "Sign In" : "Create Account"}
          </h2>
          {mode === "login" && (
            <div className="space-y-4 py-5">
              {/* Email */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
              >
                Sign In
              </button>
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-4 py-5">
              {/* Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-left mb-2 font-medium">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={signupData.firstName}
                    onChange={handleSignupChange}
                    placeholder="First name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-left mb-2 font-medium">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={signupData.lastName}
                    onChange={handleSignupChange}
                    placeholder="Last name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={signupData.phone}
                  onChange={handleSignupChange}
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Create a password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-left mb-2 font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
              >
                Create Account
              </button>
            </div>
          )}
          <div className="text-center text-sm text-gray-600">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-red-500 font-semibold hover:text-red-600"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-red-500 font-semibold hover:text-red-600"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
