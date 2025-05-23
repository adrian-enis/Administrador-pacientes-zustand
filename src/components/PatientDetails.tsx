import React from "react";
import { Patient } from "../types/type";
import { PatientDetailItem } from "./PatientDetailItem";
import { usePatientStore } from "../store";

type PatientDetailsProps = {
  patient: Patient;

};

const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const deletePatient = usePatientStore(state => state.deletePatient)
  const getPatientById = usePatientStore(state => state.getPatientById)

  
  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Name" data={patient.name} />
      <PatientDetailItem label="Carataker" data={patient.caretaker} />
      <PatientDetailItem label="Email" data={patient.email} />
      <PatientDetailItem label="Date" data={patient.date.toString()} />
      <PatientDetailItem label="Symptoms" data={patient.symptoms} />
      <div className="flex flex-col gap-3 lg:flex-row justify-between mt-10">
        <button
          className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={() => getPatientById(patient.id)}
        >
          Edit
        </button>
        <button
          className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          type="button"
          onClick={() => deletePatient(patient.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
