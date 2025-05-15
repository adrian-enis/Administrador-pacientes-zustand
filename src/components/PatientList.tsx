
import { usePatientStore } from "../store"
import PatientDetails from "./PatientDetails"

const PatientList = () => {
  const patients = usePatientStore(state => state.patients)
  console.log(patients)
  return (
    <div className="md:w-1/2 lg:3/5 md:h-screen overflow-y-scroll  bg-red-300">
      {
        patients.length ? (
          <>
            <h2 className="font-black text-3xl text-center">Patient list</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              manage your {""}
                <span className="text-indigo-600 font-bold">patients and appointments</span>
            </p>
             {
              patients.map(patient => (
                <PatientDetails key={patient.id} patient={patient}/>
              ))
             }
          </>
          
        ) : (
          <>
            <h2 className="font-black text-3xl text-center">There are not Patients</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Start adding patients {""}
              <span className="text-indigo-600 font-bold">and they will appear in this place</span>
            </p>
          </>
        )
      }
    </div>
  )
}

export default PatientList