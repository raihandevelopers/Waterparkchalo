import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
function CheckoutPage() {
  const location = useLocation();

  const { adultCount, childCount, date, resortName, subtotal, deposit } = location.state || {}; // Destructure data from location

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    createAccount: false,
    total : subtotal
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order placed with details:", billingDetails, paymentMethod);
  };
  const handlePayment = async () => {
    if(billingDetails.email === "" || billingDetails.firstName === "" || billingDetails.lastName === "" || billingDetails.phone === "" || billingDetails.city === ""){
      alert("Please fill all the details");
      return;
    }
    try {
      // Create a booking and generate Razorpay order
      const response = await axios.post("https://waterpark-be.onrender.com/api/bookings/create", {
        waterpark: resort._id,
        name: `${billingDetails.firstName} ${billingDetails.lastName}`,
        email: billingDetails.email,
        phone: billingDetails.phone,
        date: date,
        adults: adultCount,
        children: childCount,
        totalPrice: subtotal,
      });
  
      const { success, orderId, booking, razorpayOrder, message } = response.data;
  
      if (!success) {
        console.error("Error:", message);
        alert("Failed to create booking. Please try again.");
        return;
      }
  
      // Initialize Razorpay payment
      const { amount, currency, id: order_id } = razorpayOrder;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Add Razorpay key in environment variables
        amount,
        currency,
        name: resortName,
        description: "Booking Payment",
        order_id,
        handler: async (paymentResponse) => {
          try {
            // Verify payment and update booking
            const verifyResponse = await axios.post("https://waterpark-be.onrender.com/api/bookings/verify", {
              razorpayOrderId: order_id,
              razorpayPaymentId: paymentResponse.razorpay_payment_id,
              razorpaySignature: paymentResponse.razorpay_signature,
              bookingId: booking._id,
            });
  
            const { success: verifySuccess, booking: updatedBooking, message: verifyMessage } = verifyResponse.data;
  
            if (verifySuccess && updatedBooking.paymentStatus === "Completed") {
              alert("Payment Successful! Booking confirmed.");
            } else {
              console.error("Payment verification failed:", verifyMessage);
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          email: billingDetails.email,
          contact: billingDetails.phone,
        },
        notes: { address: billingDetails.city },
        theme: { color: "#0156b3" },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };
    return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10 px-4 my-10">
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Checkout</h1>
        <p className="text-center text-gray-600 mb-8">
          Returning customer?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Click here to login
          </a>
        </p>

        <form onSubmit={handlePayment} className="space-y-8">
          {/* Billing Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["firstName", "lastName", "phone", "email", "city"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="text-gray-700 font-medium mb-2"
                  >
                    {field
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    value={billingDetails[field]}
                    onChange={handleInputChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    required={true}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                id="createAccount"
                type="checkbox"
                name="createAccount"
                checked={billingDetails.createAccount}
                onChange={handleInputChange}
                className="w-5 h-5 border border-gray-300 rounded-md text-blue-600 focus:ring focus:ring-blue-200"
              />
              <label htmlFor="createAccount" className="ml-2 text-gray-700">
                Create an account?
              </label>
            </div>
          </div>

          {/* Order Summary Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Order</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-gray-700 font-medium">Product</th>
                    <th className="py-3 px-4 text-gray-700 font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">
                      {resortName} x 1
                      <br />
                      <span className="text-sm text-gray-500">
                        Check-in: {date} | Adults: {adultCount} | Children: {childCount}
                      </span>
                    </td>
                    <td className="py-3 px-4">₹{subtotal}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Deposit:</td>
                    <td className="py-3 px-4">₹{deposit}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Remaining:</td>
                    <td className="py-3 px-4">₹{subtotal - deposit}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Total payable:</td>
                    <td className="py-3 px-4 font-semibold">₹{subtotal}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Payable deposit:</td>
                    <td className="py-3 px-4 font-semibold">₹{deposit}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Cash on delivery</span>
              </label>
              <p className="text-gray-500 ml-8">Pay with cash upon delivery.</p>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={handlePaymentChange}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">Credit Card/Debit Card/NetBanking (Pay by Razorpay)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            onClick={handlePayment}
            className="w-full py-3 text-white bg-[#0156b3] rounded-lg text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Pay ₹{deposit} Now
            </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
