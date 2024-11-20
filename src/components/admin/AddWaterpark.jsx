import React, { useState } from "react";
import axios from "axios";

function AddWaterpark() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    included: "",
    excluded: "",
    map: "",
    price: "",
    discountPrice: "",
    advanceAmount: "",
    weekendPriceIncrease: "",
    // faqs: "",
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    Array.from(images).forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/waterparks/add-waterpark`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage(response.data.message);
      setFormData({
        name: "",
        description: "",
        location: "",
        included: "",
        excluded: "",
        map: "",
        price: "",
        discountPrice: "",
        advanceAmount: "",
        weekendPriceIncrease: "",
        // faqs: "",
      });
      setImages([]);
    } catch (error) {
      console.error(error);
      setMessage("Failed to add waterpark");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Waterpark</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Location", name: "location", type: "text" },
          { label: "Included (comma-separated)", name: "included", type: "text" },
          { label: "Excluded (comma-separated)", name: "excluded", type: "text" },
          { label: "Google Maps Link", name: "map", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Discount Price", name: "discountPrice", type: "number" },
          { label: "Advance Amount", name: "advanceAmount", type: "number" },
          {
            label: "Weekend Price Increase (%)",
            name: "weekendPriceIncrease",
            type: "number",
          },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
        ))}
        <div>
          <label className="block text-gray-700 mb-1">FAQs (JSON format)</label>
          {/* <textarea
            name="faqs"
            value={formData.faqs}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
            placeholder='e.g. [{"question": "Q1?", "answer": "A1"}]'
            required
          ></textarea> */}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Upload Images (Max: 10)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add Waterpark
        </button>
      </form>
    </div>
  );
}

export default AddWaterpark;
