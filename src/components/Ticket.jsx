import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const WaterparkTicket = (props) => {
  // Hardcoded data for testing
  const {
    name = "SAIL SURVE",
    adults = 6,
    children = 0,
    total = 6,
    date = "25/10/2024",
    waterpark = "Sagar resort",
    amount = "Rs:2700/-",
    contact = "8983270305",
  } = props;

  // Function to download the ticket
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
              <span className="font-bold">Child:</span> {children}
            </p>
            <p>
              <span className="font-bold">Total:</span> {total}
            </p>
            <p>
              <span className="font-bold">Date:</span> {date}
            </p>
            <p>
              <span className="font-bold">Waterpark:</span> {waterpark}
            </p>
            <p>
              <span className="font-bold">Total Amount to pay:</span> {amount}
            </p>
            <p>
              <span className="font-bold">Contact:</span> {contact}
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
