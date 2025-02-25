import React, { useEffect, useRef, useState } from "react";

import AppointmentForm from "./AppointmentForm";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../api/features/apiSlice";

const AppointmentList = () => {
  const { data: appointments, error, isLoading } = useGetAppointmentsQuery();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [editingAppointment, setEditingAppointment] = useState(null);
  const formRef = useRef(null);
  useEffect(() => {
    if (editingAppointment && formRef.current) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [editingAppointment]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(id).unwrap();
      } catch (err) {
        console.error("Failed to delete appointment", err);
      }
    }
  };

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>Error loading appointments</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Appointments</h2>
      {appointments && appointments.length > 0 ? (
        <ul>
          {appointments.map((app) => (
            <li key={app._id} className="p-4 border mb-2 rounded">
              <div>
                <strong>Doctor:</strong> {app.doctorId.name}
              </div>
              <div>
                <strong>Date:</strong> {new Date(app.date).toLocaleString()}
              </div>
              <div>
                <strong>Type:</strong> {app.appointmentType}
              </div>
              <div>
                <strong>Patient:</strong> {app.patientName}
              </div>
              <div>
                <strong>Notes:</strong> {app.notes || "N/A"}
              </div>
              <div className="mt-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => setEditingAppointment(app)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(app._id)}
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No appointments found.</div>
      )}
      {editingAppointment && (
        <div className="mt-4" ref={formRef}>
          <h3 className="text-lg font-bold mb-2">Edit Appointment</h3>
          <AppointmentForm
            appointment={editingAppointment}
            onSuccess={() => setEditingAppointment(null)}
          />
          <button
            onClick={() => setEditingAppointment(null)}
            className="mt-2 text-white bg-red-500 px-2 py-1 rounded"
          >
            Cancel Editing
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;
