import React, { useState } from "react";
import { useGetDoctorSlotsQuery } from "../api/features/apiSlice";

const DoctorSlots = ({ doctor, onSelectSlot }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const {
    data: slots,
    error,
    isLoading,
  } = useGetDoctorSlotsQuery({ id: doctor._id, date: selectedDate });
  // console.log(slots);
  // console.log(error);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Available Slots for {doctor.name}
      </h2>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border p-2 rounded mb-4"
      />
      {isLoading && <div>Loading slots...</div>}
      {error && <div>Error loading slots</div>}
      <div className="grid grid-cols-3 gap-4">
        {slots &&
          slots.map((slot) => (
            <div
              key={slot}
              className="p-4 bg-blue-100 rounded text-center cursor-pointer hover:bg-blue-200"
              onClick={() => onSelectSlot(slot)}
            >
              {slot}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorSlots;
