import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditWaterpark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    price: "",
    discountPrice: "",
    advanceAmount: "",
    weekendPriceIncrease: "",
    map: "",
    images: "",
    included: [],
    excluded: [],
    faqs: [],
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching waterpark:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [field]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/api/waterparks/${id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/edit-waterpark");
        }
      })
      .catch((error) => {
        console.error("Error updating waterpark:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Waterpark</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md p-6 rounded-lg"
      >
        {/* Name */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border w-full p-2 rounded"
            required
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block font-semibold">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Advance Amount */}
        <div>
          <label className="block font-semibold">Advance Amount</label>
          <input
            type="number"
            name="advanceAmount"
            value={formData.advanceAmount}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Weekend Price Increase */}
        <div>
          <label className="block font-semibold">Weekend Price Increase</label>
          <input
            type="number"
            name="weekendPriceIncrease"
            value={formData.weekendPriceIncrease}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Map URL */}
        <div>
          <label className="block font-semibold">Map URL</label>
          <input
            type="text"
            name="map"
            value={formData.map}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>

        {/* Images URL */}
        <div>
          <label className="block font-semibold">Images</label>
          <div className="flex flex-wrap gap-4">
            {formData.images && formData.images.length > 0 ? (
              formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Waterpark Image ${index + 1}`} className="w-32 h-32 object-cover rounded" />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Included */}
        <div>
          <label className="block font-semibold">Included</label>
          <input
            type="text"
            name="included"
            value={formData.included.join(", ")}
            onChange={(e) => handleArrayChange(e, "included")}
            className="border w-full p-2 rounded"
            placeholder="Enter included items, separated by commas"
          />
        </div>

        {/* Excluded */}
        <div>
          <label className="block font-semibold">Excluded</label>
          <input
            type="text"
            name="excluded"
            value={formData.excluded.join(", ")}
            onChange={(e) => handleArrayChange(e, "excluded")}
            className="border w-full p-2 rounded"
            placeholder="Enter excluded items, separated by commas"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Waterpark
        </button>
      </form>
    </div>
  );
};

export default EditWaterpark;
