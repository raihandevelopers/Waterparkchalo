import React from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const WaterparkTicket = () => {
  const location = useLocation();
  const { booking } = location.state || {}; // Get the booking from route params
  
  // If no booking data is available, return a loading state or an error message
  if (!booking) {
    return <div>No booking information available.</div>;
  }

  const {
    name,
    adults,
    children,
    totalPrice,
    date,
    waterpark,
    waterparkName,
    phone,
  } = booking;

  const handleDownload = () => {
    const ticketElement = document.getElementById("ticket");
    html2canvas(ticketElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("waterpark-ticket.pdf");
    });
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100">
      <div
        id="ticket"
        className="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-md p-4"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-800">WATERPARK CHALO</h2>
          <img src="/logo.png" alt="Logo" className="h-12" />
        </div>

        <div className="border-b border-gray-300 mb-4 pb-2">
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-bold">Name:</span> {name}
            </p>
            <p>
              <span className="font-bold">Adults:</span> {adults}
            </p>
            <p>
              <span className="font-bold">Children:</span> {children}
            </p>
            <p>
              <span className="font-bold">Total Price:</span> Rs {totalPrice}/-
            </p>
            <p>
              <span className="font-bold">Date:</span> {date}
            </p>
            <p>
              <span className="font-bold">Waterpark:</span> {waterparkName}
            </p>
            <p>
              <span className="font-bold">Contact:</span> {phone}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-700">
          <p>* Please Carry Cash For Remaining Payment.</p>
          <p># Drinking Is Strictly Prohibited in Waterpark.</p>
          <p># Pickup And Drop Service Is Not Included In This Package.</p>
          <p>
            # In Case Of Any Dispute And Misunderstanding, Waterpark Holds Final
            Decision.
          </p>
          <p># For Refund And Cancellation Contact Us Before 1 Day Of Check-In.</p>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Ticket
      </button>
    </div>
  );
};

export default WaterparkTicket;
