import {create} from "zustand"
import { DraftPatient, Patient } from "./types/type"

type PatienState = {
    patients: Patient[]
    addPatients: (data:DraftPatient) => void
}

export const usePatientStore =  create<PatienState>(() => ({
    patients: [],
    addPatients: (data) => {
        console.log(data)
    },
}));                                                                            