import React, { useState, useEffect } from "react";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../api/features/apiSlice";

const AppointmentForm = ({
  doctor,
  selectedSlot,
  selectedDate,
  appointment,
  onSuccess,
}) => {
  const isUpdateMode = Boolean(appointment);
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (isUpdateMode && appointment) {
      setPatientName(appointment.patientName);
      setAppointmentType(appointment.appointmentType);
      setNotes(appointment.notes || "");
    }
  }, [appointment, isUpdateMode]);

  const [createAppointment, { isLoading: isCreating, error: createError }] =
    useCreateAppointmentMutation();
  const [updateAppointment, { isLoading: isUpdating, error: updateError }] =
    useUpdateAppointmentMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdateMode) {
      const updatedData = {
        doctorId: appointment.doctorId,
        date: appointment.date,
        duration: appointment.duration,
        appointmentType,
        patientName,
        notes,
      };

      try {
        await updateAppointment({
          id: appointment._id,
          ...updatedData,
        }).unwrap();
        onSuccess && onSuccess();
      } catch (err) {
        console.error("Failed to update appointment", err);
      }
    } else {
      const dateTime = new Date(`${selectedDate}T${selectedSlot}:00`);
      const newAppointment = {
        doctorId: doctor._id,
        date: dateTime,
        duration: 30,
        appointmentType,
        patientName,
        notes,
      };

      try {
        await createAppointment(newAppointment).unwrap();
        onSuccess && onSuccess();
      } catch (err) {
        console.error("Failed to create appointment", err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mt-4">
      <h2 className="text-xl font-bold mb-4">
        {isUpdateMode
          ? "Update Appointment"
          : `Book Appointment at ${selectedSlot}`}
      </h2>
      <div className="mb-4">
        <label className="block mb-1">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Appointment Type</label>
        <input
          type="text"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isCreating || isUpdating}
      >
        {isCreating || isUpdating
          ? isUpdateMode
            ? "Updating..."
            : "Booking..."
          : isUpdateMode
          ? "Update Appointment"
          : "Book Appointment"}
      </button>
      {(createError || updateError) && (
        <div className="text-red-500 mt-2">Error submitting appointment</div>
      )}
    </form>
  );
};

export default AppointmentForm;
