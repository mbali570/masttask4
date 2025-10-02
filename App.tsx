import React, { useState } from "react";

const App: React.FC = () => {
  const [role, setRole] = useState<string>("");
  const [cars, setCars] = useState<{ make: string; model: string; cost: number }[]>([]);
  const [carMake, setCarMake] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carCost, setCarCost] = useState("");
  const [selectedCarIndex, setSelectedCarIndex] = useState<string>("");
  const [days, setDays] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState("");
  const [confirmationDetails, setConfirmationDetails] = useState("");

  const handleLogin = () => {
    // UI updates automatically based on state
  };

  const handleAddCar = () => {
    if (carMake && carModel && carCost && !isNaN(Number(carCost)) && Number(carCost) > 0) {
      setCars([...cars, { make: carMake, model: carModel, cost: Number(carCost) }]);
      alert("Car Added Successfully!");
      setCarMake("");
      setCarModel("");
      setCarCost("");
    } else {
      alert("Please enter valid car details and cost.");
    }
  };

  const handleShowModal = () => {
    if (selectedCarIndex === "" || days === "" || isNaN(Number(days)) || Number(days) < 1) {
      alert("Please select a car and enter a valid number of days");
      return;
    }
    const car = cars[Number(selectedCarIndex)];
    const totalCost = Number(days) * car.cost;
    setBookingDetails(
      "Car: " + car.make + " " + car.model + "\nDays: " + days + "\nTotal: $" + totalCost
    );
    setShowModal(true);
  };

  const handleConfirmBooking = () => {
    const car = cars[Number(selectedCarIndex)];
    const totalCost = Number(days) * car.cost;
    setConfirmationDetails(
      "Car: " + car.make + " " + car.model + "\nDays: " + days + "\nTotal Due: $" + totalCost
    );
    setShowModal(false);
    setShowConfirmation(true);
  };

  const handleRestart = () => {
    setRole("");
    setShowConfirmation(false);
    setSelectedCarIndex("");
    setDays("");
    setBookingDetails("");
    setConfirmationDetails("");
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "linear-gradient(to right, pink, lightblue)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <style>{`
        .container {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 350px;
          text-align: center;
        }
        h1, h2 {
          color: #ff1493;
        }
        label {
          display: block;
          margin: 10px 0 5px;
          color: #1e90ff;
        }
        input, select, button {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-sizing: border-box;
        }
        button {
          background: linear-gradient(to right, #ff69b4, #1e90ff);
          color: white;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }
        button:hover {
          opacity: 0.9;
        }
        .modal {
          display: flex;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          justify-content: center;
          align-items: center;
          z-index: 10;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          min-width: 250px;
        }
      `}</style>
      {/* Login Screen */}
      {!role && !showConfirmation && (
        <div className="container">
          <h1>Car Booking App</h1>
          <label htmlFor="role">Login as:</label>
          <select id="role" value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {/* Admin Screen */}
      {role === "admin" && !showConfirmation && (
        <div className="container">
          <h2>Add a Car</h2>
          <label htmlFor="carMake">Car Make</label>
          <input type="text" id="carMake" value={carMake} onChange={e => setCarMake(e.target.value)} />
          <label htmlFor="carModel">Car Model</label>
          <input type="text" id="carModel" value={carModel} onChange={e => setCarModel(e.target.value)} />
          <label htmlFor="carCost">Cost per Day ($)</label>
          <input type="number" id="carCost" min="1" value={carCost} onChange={e => setCarCost(e.target.value)} />
          <button onClick={handleAddCar}>Add Car</button>
        </div>
      )}
      {/* Customer Screen */}
      {role === "customer" && !showConfirmation && (
        <div className="container">
          <h2>Rent a Car</h2>
          <label htmlFor="carList">Select Car</label>
          <select id="carList" value={selectedCarIndex} onChange={e => setSelectedCarIndex(e.target.value)}>
            <option value="">Select</option>
            {cars.length === 0 ? (
              <option value="">No cars available</option>
            ) : (
              cars.map((car, idx) => (
                <option key={idx} value={idx}>{`${car.make} ${car.model} - $${car.cost}/day`}</option>
              ))
            )}
          </select>
          <label htmlFor="days">Number of Days</label>
          <input type="number" id="days" min="1" value={days} onChange={e => setDays(e.target.value)} />
          <button onClick={handleShowModal}>Book Now</button>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p style={{ whiteSpace: "pre-line" }}>{bookingDetails}</p>
            <button onClick={handleConfirmBooking}>Confirm</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      {/* Confirmation Screen */}
      {showConfirmation && (
        <div className="container">
          <h2>Booking Confirmed</h2>
          <p style={{ whiteSpace: "pre-line" }}>{confirmationDetails}</p>
          <button onClick={handleRestart}>Book Another Car</button>
        </div>
      )}
    </div>
  );
};

export default App;
