import { useForm } from "react-hook-form"; //libreria para formularios
import Error from "./Error";
import type { DraftPatient } from "../types/type";
import { usePatientStore } from "../store";
import { useEffect } from "react";

export default function PatientForm() {
  // Importación del hook de Zustand para gestionar el estado de pacientes

  const addPatients = usePatientStore((state) => state.addPatients);

  const activeId = usePatientStore((state) => state.activeId)

  const patients = usePatientStore((state) => state.patients)
  /**
   * Hook de react-hook-form para gestionar el formulario de registro de pacientes.
   * - register: Se usa para registrar los inputs del formulario.
   * - handleSubmit: Función que maneja el envío del formulario.
   * - errors: Contiene los errores de validación de los campos.
   */
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DraftPatient>();

  useEffect(() => {
    if(activeId){
      const activePatient = patients.filter(patient => patient.id === activeId)[0];
      setValue("name", activePatient.name)
      setValue("caretaker", activePatient.caretaker)
      setValue("email", activePatient.email)
      setValue("date", activePatient.date)
      setValue("symptoms", activePatient.symptoms)

    }
  }, [activeId])
  /**
   * Función encargada de registrar un nuevo paciente en el estado global.
   * @param {DraftPatient} data - Datos del paciente a registrar.
   * La función llama a addPatients, que actualiza la store de Zustand.
   */

  const registerPatient = (data: DraftPatient) => {
    addPatients(data);
    reset();
  };

  // REACT HOOK FORM
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Patient Name"
            {...register("name", {
              required: "the patient's name is required",
              maxLength: {
                value: 16,
                message: "max 16 characters",
              },
            })}
          />

          {errors.name && <Error>{errors.name.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "owner is required",
              maxLength: {
                value: 16,
                message: "max 16 characters",
              },
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "The email is not valid",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register("date", {
              required: "The registration date is requiered",
            })}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register("symptoms", {
              required: "the symptoms is required",
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms.message}</Error>}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}
