import { X } from "lucide-react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const { login } = useContext(AuthContext);
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
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

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

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setLoginErrors(newErrors);
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
      setLoginErrors({
        email: "No account found. Please sign up first.",
      });
      return;
    }

    if (
      savedUser.email !== loginData.email ||
      savedUser.password !== loginData.password
    ) {
      setLoginErrors({
        email: "Invalid email or password",
      });
      return;
    }
    login(savedUser);
    console.log("Login successful:", savedUser);
    onClose();
    setLoginErrors({});

    console.log("Login data:", loginData);
  };
  const handleSignup = (e) => {
    e.preventDefault();

    const newErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (!signupData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!signupData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(signupData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!signupData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(signupData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!signupData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!signupData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setSignupErrors(newErrors);
      return;
    }

    setSignupErrors({});
    localStorage.setItem("registeredUser", JSON.stringify(signupData));
    console.log("Signup data:", signupData);
    onClose();
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
                {loginErrors.email && (
                  <p className="text-sm text-left  text-red-500 mt-1">
                    {loginErrors.email}
                  </p>
                )}
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
                {loginErrors.password && (
                  <p className="text-sm text-left text-red-500 mt-1">
                    {loginErrors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="submit"
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={handleLogin}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
              >
                Sign In
              </button>
            </div>
          )}

          {mode === "signup" && (
            <form onSubmit={handleSignup}>
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

                    {signupErrors.firstName && (
                      <p className="text-sm text-left text-red-500 mt-1">
                        {signupErrors.firstName}
                      </p>
                    )}
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

                    {signupErrors.lastName && (
                      <p className="text-sm text-left text-red-500 mt-1">
                        {signupErrors.lastName}
                      </p>
                    )}
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

                  {signupErrors.email && (
                    <p className="text-sm text-left text-red-500 mt-1">
                      {signupErrors.email}
                    </p>
                  )}
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

                  {signupErrors.phone && (
                    <p className="text-sm text-left text-red-500 mt-1">
                      {signupErrors.phone}
                    </p>
                  )}
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

                  {signupErrors.password && (
                    <p className="text-sm text-left text-red-500 mt-1">
                      {signupErrors.password}
                    </p>
                  )}
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

                  {signupErrors.confirmPassword && (
                    <p className="text-sm text-left text-red-500 mt-1">
                      {signupErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition"
                >
                  Create Account
                </button>
              </div>
            </form>
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
