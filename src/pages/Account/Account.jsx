import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Edit, Save, X, ShoppingBag,
  ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [shippingAddress, setShippingAddress] = useState(null);
  const [shippingLoading, setShippingLoading] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // --------------------------------
  // FETCH PROFILE
  // --------------------------------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        setProfile(data);
        setName(data.name || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // --------------------------------
  // FETCH SHIPPING ADDRESS
  // --------------------------------
  useEffect(() => {
    const fetchShippingAddress = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/users/me/shipping",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch shipping address"
          );
        }

        setShippingAddress(data);
      } catch (error) {
        console.error("Shipping address error:", error);
      } finally {
        setShippingLoading(false);
      }
    };

    fetchShippingAddress();
  }, []);

  // --------------------------------
  // UPDATE PROFILE
  // --------------------------------
  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users/me",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setProfile(data.user);
      setName(data.user.name || "");
      setPhone(data.user.phone || "");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // --------------------------------
  // CANCEL PROFILE EDIT
  // --------------------------------
  const handleCancel = () => {
    setName(profile.name || "");
    setPhone(profile.phone || "");
    setIsEditing(false);
  };

  // --------------------------------
  // UPDATE SHIPPING ADDRESS
  // --------------------------------
  const handleUpdateAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users/me/shipping",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressForm),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update shipping address"
        );
      }

      setShippingAddress(data.shippingAddress);
      setIsEditingAddress(false);
    } catch (error) {
      console.error("Update address error:", error);
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Loading profile...</p>
      </section>
    );
  }

  // --------------------------------
  // PROFILE ERROR
  // --------------------------------
  if (!profile) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600">Unable to load profile.</p>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================================
          PAGE HEADER
      ================================= */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
            My Account
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            Account Settings
          </h1>

          <p className="text-gray-600 mt-3">
            Manage your personal information and saved shipping address.
          </p>
        </div>
      </section>

      {/* ================================
          MAIN CONTENT
      ================================= */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* ================================
              PROFILE CARD
          ================================= */}
          <div className="lg:col-span-1">
            <div className="bg-white border rounded-2xl p-6">
              {/* Card Heading */}
              <div className="flex items-center gap-3 pb-5 border-b">
                <div className="w-11 h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                  <User size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-600 mt-1">
                    Your account details
                  </p>
                </div>
              </div>

              {/* ================================
                  PROFILE VIEW
              ================================= */}
              {!isEditing ? (
                <div className="pt-6 space-y-5">
                  {/* Name */}
                  <div>
                    <p className="text-sm text-gray-500">Name</p>

                    <p className="font-medium text-gray-900 mt-1">
                      {profile.name}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-sm text-gray-500">Email</p>

                    <p className="font-medium text-gray-900 mt-1 break-words">
                      {profile.email}
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>

                    <p className="font-medium text-gray-900 mt-1">
                      {profile.phone || "Not added"}
                    </p>
                  </div>

                  {/* Role */}
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>

                    <p className="font-medium text-gray-900 mt-1 capitalize">
                      {profile.role}
                    </p>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                  >
                    <Edit size={17} />
                    Edit Profile
                  </button>
                </div>
              ) : (
                /* ================================
                   PROFILE EDIT
                ================================= */
                <div className="pt-6 space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-900">
                      Name
                    </label>

                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-900">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                    >
                      <Save size={17} />
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
                    >
                      <X size={17} />
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ================================
              SHIPPING ADDRESS
          ================================= */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-2xl p-6">
              {/* Card Heading */}
              <div className="flex items-center justify-between gap-4 pb-5 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Saved Shipping Address
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                      Your default delivery address
                    </p>
                  </div>
                </div>
              </div>

              {/* Loading */}
              {shippingLoading ? (
                <div className="py-10 text-center">
                  <p className="text-gray-600">
                    Loading address...
                  </p>
                </div>
              ) : shippingAddress?.name ? (
                <>
                  {/* ================================
                      ADDRESS VIEW
                  ================================= */}
                  {!isEditingAddress ? (
                    <div className="pt-6">
                      <div className="grid sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <p className="text-sm text-gray-500">
                            Name
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.name}
                          </p>
                        </div>

                        {/* Phone */}
                        <div>
                          <p className="text-sm text-gray-500">
                            Phone
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.phone}
                          </p>
                        </div>

                        {/* Address */}
                        <div className="sm:col-span-2">
                          <p className="text-sm text-gray-500">
                            Address
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.address}
                          </p>
                        </div>

                        {/* City */}
                        <div>
                          <p className="text-sm text-gray-500">
                            City
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.city}
                          </p>
                        </div>

                        {/* State */}
                        <div>
                          <p className="text-sm text-gray-500">
                            State
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.state}
                          </p>
                        </div>

                        {/* Pincode */}
                        <div>
                          <p className="text-sm text-gray-500">
                            Pincode
                          </p>

                          <p className="font-medium text-gray-900 mt-1">
                            {shippingAddress.pincode}
                          </p>
                        </div>
                      </div>

                      {/* Edit Address */}
                      <button
                        onClick={() => {
                          setAddressForm({
                            name: shippingAddress.name || "",
                            phone: shippingAddress.phone || "",
                            address: shippingAddress.address || "",
                            city: shippingAddress.city || "",
                            state: shippingAddress.state || "",
                            pincode: shippingAddress.pincode || "",
                          });

                          setIsEditingAddress(true);
                        }}
                        className="mt-7 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
                      >
                        <Edit size={17} />
                        Edit Address
                      </button>
                    </div>
                  ) : (
                    /* ================================
                       ADDRESS EDIT
                    ================================= */
                    <div className="pt-6">
                      <div className="grid md:grid-cols-2 gap-5">
                        {/* Name */}
                        <div>
                          <label className="block mb-2 font-medium text-gray-900">
                            Name
                          </label>

                          <input
                            type="text"
                            value={addressForm.name}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                name: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block mb-2 font-medium text-gray-900">
                            Phone
                          </label>

                          <input
                            type="tel"
                            value={addressForm.phone}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                phone: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                          <label className="block mb-2 font-medium text-gray-900">
                            Address
                          </label>

                          <input
                            type="text"
                            value={addressForm.address}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                address: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* City */}
                        <div>
                          <label className="block mb-2 font-medium text-gray-900">
                            City
                          </label>

                          <input
                            type="text"
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                city: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* State */}
                        <div>
                          <label className="block mb-2 font-medium text-gray-900">
                            State
                          </label>

                          <input
                            type="text"
                            value={addressForm.state}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                state: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>

                        {/* Pincode */}
                        <div>
                          <label className="block mb-2 font-medium text-gray-900">
                            Pincode
                          </label>

                          <input
                            type="text"
                            value={addressForm.pincode}
                            onChange={(e) =>
                              setAddressForm({
                                ...addressForm,
                                pincode: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-red-500"
                          />
                        </div>
                      </div>

                      {/* Address Buttons */}
                      <div className="flex flex-wrap gap-3 mt-7">
                        <button
                          onClick={() =>
                            setIsEditingAddress(false)
                          }
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
                        >
                          <X size={17} />
                          Cancel
                        </button>

                        <button
                          onClick={handleUpdateAddress}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center gap-2"
                        >
                          <Save size={17} />
                          Save Address
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* ================================
                   NO ADDRESS
                ================================= */
                <div className="py-10 text-center">
                  <div className="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mx-auto">
                    <MapPin size={25} />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mt-5">
                    No Saved Address
                  </h3>

                  <p className="text-gray-600 text-sm mt-2">
                    You don't have a saved shipping address yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ================================
    MY ORDERS
================================= */}
<div className="mt-6">
  <div className="bg-white border rounded-2xl p-6">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
      
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
          <ShoppingBag size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            My Orders
          </h2>

          <p className="text-sm text-gray-600 mt-1">
            View and manage your orders
          </p>
        </div>
      </div>

      <Link
        to="/account/orders"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition font-medium flex items-center justify-center gap-2"
      >
        View Orders
        <ArrowRight size={17} />
      </Link>

    </div>
  </div>
</div>
      </section>
    </div>
  );
}

export default Account;