import React,{useEffect,useState} from "react";
import axios from 'axios'

const WaterParks = () => {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchWaterparks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://waterpark-be.onrender.com/api/waterparks`);
        setParks(response.data.waterparks);
        console.log("Waterparks fetched:", response.data);
      } catch (error) {
        console.error("Error fetching waterparks:", error);
      }finally {
        setLoading(false); // Stop loading after data fetch
      }

    };

    fetchWaterparks();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 mt-6">Water Parks</h1>

      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Water Parks Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-11">
          {parks.map((park, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-md overflow-hidden bg-white"
            >
              <img
                src={
                  park.images[0] ||
                  "https://newdemo.rreda.in/wp-content/uploads/2024/10/7-1.png"
                }
                alt={park.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between text-orange-500 mb-2">
                  <span className="text-sm font-medium">{park.duration}</span>
                </div>
                <h2 className="text-lg font-semibold">{park.name}</h2>
                <p className="text-sm text-gray-600 my-2">{park.note}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-green-600">
                      ₹{park.price}
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
      )}
    </div>
  );
};
export default WaterParks;
