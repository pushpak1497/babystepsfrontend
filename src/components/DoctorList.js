import React from "react";
import { useGetDoctorsQuery } from "../api/features/apiSlice";

const DoctorList = ({ onSelect }) => {
  const { data, error, isLoading } = useGetDoctorsQuery();
  // console.log(data?.doctors);

  if (isLoading) return <div>Loading doctors...</div>;
  if (error) {
    console.log(error);
    return <div>Error loading doctors</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Select a Doctor</h2>
      <ul className="display flex gap-2 flex-wrap justify-between">
        {data?.doctors?.map((doctor) => (
          <li
            key={doctor?._id}
            className="cursor-pointer hover:bg-gray-200 p-4 rounded border rounded-md w-[280px]"
            onClick={() => onSelect(doctor)}
          >
            <img
              className="rounded"
              alt="doctor"
              src="https://res.cloudinary.com/dfhjlaswm/image/upload/v1740462180/Leonardo_Phoenix_10_A_brilliantly_illuminated_image_depicts_a_3_xhnqow.jpg"
            />
            <p className="py-3 text-lg font-bold">{doctor?.name}</p>
            <p className="text-md text-gray-500">
              {doctor?.specialization
                ? `Speciality - ${doctor?.specialization}`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
