import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { DraftPatient, Patient } from "./types/type";

/**
 * Estado global para la gestión de pacientes.
 */

type PatienState = {
  /**
   * Lista de pacientes registrados en el sistema.
   */
  patients: Patient[];
  activeId: Patient["id"];
  /**
   * Función para agregar un nuevo paciente a la lista.
   * @param {DraftPatient} data - Datos del paciente a registrar.
   */

  addPatients: (data: DraftPatient) => void;

  deletePatient: (id: Patient["id"]) => void;

  getPatientById: (id: Patient["id"]) => void;

  updatePatiend: (id:DraftPatient) => void;
};

/**
 * Zustand store para manejar el estado de pacientes.
 * @returns {PatienState} Estado inicial con la lista de pacientes y la función para agregar nuevos.
 */
/**
 * Acción para agregar un paciente al estado.
 *
 *
 * @param {DraftPatient} data - Datos del paciente.
 */

const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: uuidv4() };
};
export const usePatientStore = create<PatienState>()(
  devtools((set) => ({
    patients: [],
    activeId: "",
    addPatients: (data) => {
      const newPatient = createPatient(data);
      set((state) => ({
        patients: [...state.patients, newPatient],
      }));
    },
    deletePatient: (id) => {
      set((state) => ({
        patients: state.patients.filter((patient) => patient.id !== id),
      }));
    },
    getPatientById: (id) => {
      set(() => ({
        activeId: id,
      }));
    },
  }))
);
