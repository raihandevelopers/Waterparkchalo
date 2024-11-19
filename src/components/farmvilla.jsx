import React from "react";

const WaterParks = () => {
  const parks = [
    {
      image: "https://newdemo.rreda.in/wp-content/uploads/2024/10/7-1.png",
      title: "Maanas Resort And Waterpark",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹800.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/banners/17274193709185mrb2.png",
      title: "LD Resort And Waterpark",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹700.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/banners/17274193709185mrb2.png",
      title: "Nakshatra Resort",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹750.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/resorts/thumbnail/17282234839123treanding%20vaity%20aqua.png",
      title: "Blue Wave Water Park & Beach Resorts",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹800.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/resorts/thumbnail/17273967924412manthan%20resort2.png",
      title: "Seven Sea's Waterpark & Resort",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹700.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/resorts/thumbnail/17273967924412manthan%20resort2.png",
      title: "Sagar Waterpark & Resort",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹480.00",
      originalPrice: "₹800.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/resorts/thumbnail/17273969538750dream%20world%202.png",
      title: "Vaity Aqua Resort And Waterpark 1",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹500.00",
      originalPrice: "₹700.00",
    },
    {
      image: "https://myresortbooking.in/public/uploads/resorts/thumbnail/17274182628349Visava%20resort.png",
      title: "Manthan Waterpark and Beach Resort",
      duration: "8 hours",
      note: "Between 3 to 8 Years is considered as child",
      price: "₹530.00",
      originalPrice: "₹800.00",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-6">Water Parks</h1>

      {/* Water Parks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-11">
        {parks.map((park, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            <img
              src={park.image}
              alt={park.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between text-orange-500 mb-2">
                <span className="text-sm font-medium">{park.duration}</span>
              </div>
              <h2 className="text-lg font-semibold">{park.title}</h2>
              <p className="text-sm text-gray-600 my-2">{park.note}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-green-600">
                    {park.price}
                  </span>
                  <span className="text-sm line-through text-gray-400 ml-2">
                    {park.originalPrice}
                  </span>
                </div>
                <button className="bg-blue-600 text-white py-1 px-3 rounded">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterParks;
