import React, { useEffect, useRef, useState } from "react";
import DoctorList from "./components/DoctorList";
import DoctorSlots from "./components/DoctorSlots";
import AppointmentForm from "./components/AppointmentForm";
import AppointmentList from "./components/AppointmentList";

function App() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showForm, setShowForm] = useState(false);
  const [viewAppointments, setViewAppointments] = useState(false);
  const appointmentFormRef = useRef(null);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    setShowForm(false);
    setViewAppointments(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowForm(true);
  };
  useEffect(() => {
    if (appointmentFormRef.current && showForm) {
      setTimeout(() => {
        appointmentFormRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [showForm]);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => setViewAppointments(false)}
          className="text-white bg-green-500 mr-4 py-2 rounded-lg w-[180px]"
        >
          Book Appointment
        </button>
        <button
          onClick={() => setViewAppointments(true)}
          className="text-white bg-green-500 mr-4 py-2 rounded-lg w-[180px]"
        >
          Manage Appointments
        </button>
      </div>
      {!selectedDoctor ? (
        <DoctorList onSelect={handleDoctorSelect} />
      ) : viewAppointments ? (
        <div>
          <button
            onClick={() => setSelectedDoctor(null)}
            className="mb-4 text-blue-500 underline"
          >
            Back to Doctor List
          </button>
          <AppointmentList />
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedDoctor(null)}
            className="mb-4 text-blue-500 underline"
          >
            Back to Doctor List
          </button>
          <DoctorSlots
            doctor={selectedDoctor}
            onSelectSlot={handleSlotSelect}
          />
          {showForm && selectedSlot && (
            <div ref={appointmentFormRef}>
              <AppointmentForm
                doctor={selectedDoctor}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                onSuccess={() => {
                  setShowForm(false);
                  alert("Appointment booked successfully!");
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
