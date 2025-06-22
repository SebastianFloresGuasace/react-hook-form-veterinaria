import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Error from "./Error";
import type { DraftPatient } from "../types";
import { usePatientStore } from "../store";

export default function PatientForm() {

    const {addPatient, activeId, patients, updatePatient} = usePatientStore()
    const {
        register,
        handleSubmit,
        formState: { errors }, reset, setValue
    } = useForm<DraftPatient>();

    useEffect(() => {
      if(activeId) {
        const activePatient = patients.filter( patient => patient.id === activeId)[0]
        setValue('name', activePatient.name)
        setValue('caretaker', activePatient.caretaker)
        setValue('contacto', activePatient.contacto)
        setValue('date', activePatient.date)
        setValue('symptoms', activePatient.symptoms)
      }
    }, [activeId])
    

    const registerPatient = (data: DraftPatient) => {

        if (activeId) {
            updatePatient(data)
            toast.success('Cambios Guardados Correctamente')
        } else {
            addPatient(data);
            toast.success('Paciente Registrado Correctamente')
        }
        reset()
    };

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">
                Seguimiento Pacientes
            </h2>

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
                    <label
                        htmlFor="name"
                        className="text-sm uppercase font-bold"
                    >
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        {...register("name", {
                            required: "El nombre de la Mascota es obligatorio",
                           
                        })}
                    />
                    {errors.name && (
                        <Error>{errors.name?.message}</Error>
                    )}
                    {/* { errors.maxLength && (<Error>{errors.maxLength?.message}</Error>) } */}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="caretaker"
                        className="text-sm uppercase font-bold"
                    >
                        Dueño
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Dueño"
                        {...register("caretaker", {
                            required: "El nombre del Dueño es obligatorio",
                        })}
                    />
                    {errors.caretaker && (
                        <Error>{errors.caretaker?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="contacto"
                        className="text-sm uppercase font-bold"
                    >
                        Contacto
                    </label>
                    <input
                        id="contacto"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Número o Email del Dueño"
                        {...register("contacto", {
                            required: "El Número o Email es Obligatorio",
                            pattern: {
                              value: /^(?:[0-9]{8}|[A-Z0-9._%+-]+@gmail\.com)$/i,
                              message: 'Número o Email No Válido'
                            }
                        })} 
                    />
                    {errors.contacto && (
                        <Error>{errors.contacto?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="date"
                        className="text-sm uppercase font-bold"
                    >
                        Fecha de Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register("date", {
                            required: "La Fecha de alta es obligatorio",
                        })}
                    />
                    {errors.date && (
                        <Error>{errors.date?.message}</Error>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="symptoms"
                        className="text-sm uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register("symptoms", {
                            required: "Los síntomas son obligatorios",
                        })}
                    />
                    {errors.symptoms && (
                        <Error>{errors.symptoms?.message}</Error>
                    )}
                </div>

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded"
                    value={activeId ? "Guardar Cambios" : "Agregar Paciente"}
                />
            </form>
        </div>
    );
}
