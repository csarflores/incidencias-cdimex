"use client"
import { useEffect, useState } from "react";
import { Gerentes, Empleados } from "@/data/Empleados";
import { Incidencias } from "@/data/Incidencias";
import ModalResponse from "./ModalResponse";

// Esta URL surge luego de implementar el App Script de Google Sheet. Copiar la URL de Aplicación Web
const urlAppWeb = 'https://script.google.com/macros/s/AKfycbw_FyRuIyexQLmbALgGB75OENwike8wqsgcQLqwMoVPWfj4ME0z_mSa8KHQXutOS7MM/exec'

const IncidenciasForm = () => {
  const [selectedGerente, setSelectedGerente] = useState(''); //Select gerentes
  const [selectedEmpleado, setSelectedEmpleado] = useState(''); //Select empleados
  const [selectedIncidencia, setSelectedIncidencia] = useState(''); //Select incidencias
  const [loading, setLoading] = useState(false); //Carga loading al enviar formulario
  const [responseVisible, setResponseVisible] = useState(false); //Carga modal de respuesta
  const [responseText, setResponseText] = useState(""); //Estado para el texto dinámico del modal

  // Ordena las opciones alfabéticamente por la descripción
  const sortedGerentes = Gerentes.slice().sort((a, b) => a.name.localeCompare(b.name));
  const sortedEmpleados = Empleados.slice().sort((a, b) => a.name.localeCompare(b.name));
  const sortedIncidencias = Incidencias.slice().sort((a, b) => a.descripcion.localeCompare(b.descripcion));

  //Funciones para agregar valores dinámicos a los distitos campos
  const filteredEmpleados = sortedEmpleados.filter(empleado => empleado.responsable === Number(selectedGerente));
  const empleadoSeleccionado = sortedEmpleados.find(empleado => empleado.legajo === Number(selectedEmpleado));
  const nombreEmpleado = empleadoSeleccionado ? empleadoSeleccionado.name : '';
  const areaResponsable = Gerentes.find(gerente => gerente.legajo === Number(selectedGerente))?.areaResponsable || '';
  const nombreGerente = Gerentes.find(gerente => gerente.legajo === Number(selectedGerente))?.name || '';
  const nombreIncidencia = Incidencias.find(incidencia => incidencia.codigo === selectedIncidencia)?.descripcion || '';

  //Validación de campos completos antes de enviar formulario
  const isFormValid = nombreGerente && nombreEmpleado && areaResponsable && nombreIncidencia;

  //Enviar el formulario a Google Sheets | Carga el loading | Muestra modal con ok o error
  const handleFormSubmit = async (e: { preventDefault: () => void; target: any; }) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;

    const response = await fetch(urlAppWeb, { method: 'POST', body: new FormData(form) });

    if (response.ok) {
      setResponseText("¡Registro exitoso!"); //Texto dinámico para el modal
    } else {
      setResponseText("Error en el envío del formulario.");
    }
    setLoading(false);
    setResponseVisible(true);
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
        </div>
      )}
      {responseVisible && (
        <ModalResponse
          responseText={responseText} // Enviar el texto dinámico
          onClose={() => setResponseVisible(false)} // Configurar la función para cerrar el modal
        />
      )}
      <form onSubmit={handleFormSubmit} className="container flex flex-col mx-auto mt-8 space-y-12 max-w-xl">
        <header className="flex items-center justify-center h-16 px-4 mx-auto w-full rounded bg-pink-200 dark:bg-gray-900">
          <h1 className="uppercase font-bold center">Registro de incidencias</h1>
        </header>
        <fieldset className="flex grid-cols-4 gap-6 p-8 lg:p-14 justify-center rounded-md shadow-sm bg-pink-200 dark:bg-gray-900">
          <input className="hidden" type="text" title="marca_temporal" name="marca_temporal" defaultValue={new Date().toISOString().slice(0, 10)} />
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full">
              <label htmlFor="gerente" className="text-sm">Responsable</label>
              <select
                id="gerente"
                name="gerente"
                value={selectedGerente}
                onChange={(e) => setSelectedGerente(e.target.value)}
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              >
                <option value=""></option>
                {sortedGerentes.filter(gerente => gerente.active).map(gerente => (
                  <option key={gerente.legajo} value={gerente.legajo}>
                    {gerente.name}
                  </option>
                ))}
              </select>
              <input className="hidden" type="text" title="nombre_gerente" name="nombre_gerente" defaultValue={nombreGerente} />
            </div>
            <div className="col-span-full">
              <label htmlFor="empleado" className="text-sm">Empleado</label>
              <select
                id="empleado"
                name="empleado"
                onChange={(e) => setSelectedEmpleado(e.target.value)}
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              >
                <option value=""></option>
                {filteredEmpleados.map(empleado => (
                  <option key={empleado.legajo} value={empleado.legajo}>
                    {empleado.name}
                  </option>
                ))}
              </select>
              <input className="hidden" type="text" title="nombre_empleado" id="nombre_empleado" name="nombre_empleado" defaultValue={nombreEmpleado} />
              <input className="hidden" type="text" title="area" id="area" name="area" defaultValue={areaResponsable} />
            </div>
            <div className="col-span-full">
              <label htmlFor="fecha_inicio_incidencia" className="text-sm">Fecha inicio incidencia</label>
              <input
                id="fecha_inicio_incidencia"
                name="fecha_inicio_incidencia"
                type="date"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="fecha_fin_incidencia" className="text-sm">Fecha fin incidencia</label>
              <input
                id="fecha_fin_incidencia"
                name="fecha_fin_incidencia"
                type="date"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="incidencia" className="text-sm">Incidencia</label>
              <select
                id="incidencia"
                name="incidencia"
                value={selectedIncidencia}
                onChange={(e) => setSelectedIncidencia(e.target.value)}
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
              >
                <option value=""></option>
                {sortedIncidencias.map(incidencia => (
                  <option key={incidencia.id} value={incidencia.codigo}>
                    {incidencia.descripcion}
                  </option>
                ))}
              </select>
              <input className="hidden" type="text" title="nombre_incidencia" name="nombre_incidencia" defaultValue={nombreIncidencia} />
            </div>
            <div className="flex grid-flow-col grid-cols-2 w-full gap-4">
              <div className="flex-col w-[7.8rem] lg:w-56 hidden">
                <input className="hidden" id="porcentaje" name="porcentaje" title="porcentaje" type="text" placeholder="" defaultValue="" />
              </div>
              <div className="flex w-[7.8rem] lg:w-56 flex-col">
                <label htmlFor="cantidad" className="text-sm">Cantidad</label>
                <input id="cantidad" name="cantidad" type="number" placeholder=""
                  className="p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="flex w-[7.8rem] lg:w-56 flex-col">
                <label htmlFor="importe" className="text-sm">Importe</label>
                <input id="importe" name="importe" type="number" placeholder=""
                  className="p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="comentarios" className="text-sm">Comentarios</label>
              <textarea
                id="comentarios"
                name="comentarios"
                placeholder=""
                className="w-full p-3 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900">
              </textarea>
            </div>
          </div>
        </fieldset>
        <input
          type="submit"
          className={`px-8 py-3 font-semibold rounded ${isFormValid ? 'bg-green-600 text-gray-200 cursor-pointer' : 'bg-gray-400 text-gray-500 cursor-not-allowed'}`}
          value="Enviar"
          disabled={!isFormValid}
        />
      </form>
    </>
  );
};

export default IncidenciasForm