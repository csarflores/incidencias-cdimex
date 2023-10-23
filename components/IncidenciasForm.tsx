"use client"
import { useEffect, useState } from "react";
import { Gerentes, Empleados } from "@/data/Empleados";
import { Incidencias } from "@/data/Incidencias";

const IncidenciasForm = () => {

  //Script para limpiar el formulario una vez enviado los datosa Google Sheet
  useEffect(() => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbw_FyRuIyexQLmbALgGB75OENwike8wqsgcQLqwMoVPWfj4ME0z_mSa8KHQXutOS7MM/exec';
    const form = document.forms['incidencias_form'];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch(scriptURL, { method: 'POST', body: new FormData(form) });
        if (response.ok) {
          alert("Su registro fue exitoso.");
          window.location.reload();
        } else {
          throw new Error("Error en el envío del formulario.");
        }
      } catch (error) {
        console.error('Error!', error.message);
      } finally {
        setLoading(false); // Ocultar la animación de carga
      }
    };

    if (form) {
      form.addEventListener('submit', handleSubmit);
    }

    return () => {
      if (form) {
        form.removeEventListener('submit', handleSubmit);
      }
    };
  }, []);

  //Aplica para el filtro de empleados según el gerente seleccionado
  const [selectedGerente, setSelectedGerente] = useState('');
  const [selectedEmpleado, setSelectedEmpleado] = useState('');
  const [selectedIncidencia, setSelectedIncidencia] = useState('');
  const [filteredEmpleados, setFilteredEmpleados] = useState([]);
  const [areaResponsable, setAreaResponsable] = useState('');
  const [nombreGerente, setNombreGerente] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [nombreIncidencia, setNombreIncidencia] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtener el valor del gerente seleccionado
    const responsableLegajo = Number(selectedGerente);
    const empleadoLegajo = Number(selectedEmpleado)

    // Filtrar empleados basados en el legajo del gerente seleccionado
    const filteredEmpleados = Empleados.filter((empleado) => empleado.responsable === responsableLegajo);
    setFilteredEmpleados(filteredEmpleados);
    const nombreEmpleado = Empleados.find((empleado) => empleado.legajo === empleadoLegajo);
    setNombreEmpleado(nombreEmpleado ? nombreEmpleado.name : '')

    // Buscar el área del gerente seleccionado y establecerla en el estado
    const gerenteSeleccionado = Gerentes.find((gerente) => gerente.legajo === responsableLegajo);
    setAreaResponsable(gerenteSeleccionado ? gerenteSeleccionado.areaResponsable : '');
    setNombreGerente(gerenteSeleccionado ? gerenteSeleccionado.name : '');

    //Busco el nombre de la incidencia
    const nombreIncidencia = Incidencias.find((incidencia) => incidencia.codigo === selectedIncidencia)
    setNombreIncidencia(nombreIncidencia ? nombreIncidencia.descripcion : '')
  }, [selectedEmpleado, selectedGerente, selectedIncidencia]); // Ejecutar el efecto cuando cambia el valor del gerente seleccionado

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
        </div>
      ) : null}
      <form id="incidencias_form"
        action="https://script.google.com/macros/s/AKfycbw_FyRuIyexQLmbALgGB75OENwike8wqsgcQLqwMoVPWfj4ME0z_mSa8KHQXutOS7MM/exec"
        method="post" name="incidencias_form" className="container flex flex-col mx-auto space-y-12 max-w-xl">
        <header className="flex items-center justify-center h-16 px-4 mx-auto w-full rounded bg-pink-200 dark:bg-gray-900">
          <h1 className="uppercase font-bold center">Registro de incidencias</h1>
        </header>
        <fieldset className="flex grid-cols-4 gap-6 p-14 justify-center rounded-md shadow-sm bg-pink-200 dark:bg-gray-900">
          <input id="marca_temporal" name="marca_temporal" type="hidden" placeholder="Nombre y apellido" value={new Date().toISOString().slice(0, 10)} />
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full">
              <label htmlFor="gerente" className="text-sm">Responsable</label>
              <select
                id="gerente"
                name="gerente"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                value={selectedGerente}
                onChange={(e) => setSelectedGerente(e.target.value)}
              >
                <option value=""></option>
                {Gerentes.filter((gerente) => gerente.active === true).map((gerente) => (
                  <option key={gerente.legajo} value={gerente.legajo}>
                    {gerente.name}
                  </option>
                ))}
              </select>
              <input
                id="nombre_gerente"
                name="nombre_gerente"
                type="hidden"
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                value={nombreGerente}
                readOnly
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="empleado" className="text-sm">Empleado</label>
              <select
                id="empleado"
                name="empleado"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                onChange={(e) => setSelectedEmpleado(e.target.value)}
              >
                <option value=""></option>
                {filteredEmpleados.map((empleado) => (
                  <option key={empleado.legajo} value={empleado.legajo}>
                    {empleado.name}
                  </option>
                ))}
              </select>
              <input
                id="nombre_empleado"
                name="nombre_empleado"
                type="hidden"
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                value={nombreEmpleado}
                readOnly
              />
              <input
                id="area"
                name="area"
                type="hidden"
                className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                value={areaResponsable}
                readOnly
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="fecha_inicio_incidencia" className="text-sm">Fecha inicio incidencia</label>

              <input id="fecha_inicio_incidencia" name="fecha_inicio_incidencia" type="date"
                placeholder="Last name"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
            </div>
            <div className="col-span-full">
              <label htmlFor="fecha_fin_incidencia" className="text-sm">Fecha fin incidencia</label>
              <input id="fecha_fin_incidencia" name="fecha_fin_incidencia" type="date" placeholder="Last name"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
            </div>
            <div className="col-span-full">
              <label htmlFor="incidencia" className="text-sm">Incidencia</label>
              <select
                id="incidencia"
                name="incidencia"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                onChange={(e) => setSelectedIncidencia(e.target.value)}
              >
                <option value=""></option>
                {Incidencias.map((incidencia) => (
                  <option key={incidencia.id} value={incidencia.codigo}>
                    {incidencia.descripcion}
                  </option>
                ))}
              </select>
              <input
                id="nombre_incidencia"
                name="nombre_incidencia"
                type="hidden"
                className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                value={nombreIncidencia}
                readOnly
              />
            </div>
            <div className="flex grid-flow-col grid-cols-2 w-full gap-4">
              <div className="flex-col w-[6.8rem] lg:w-56 hidden">
                <input id="porcentaje" name="porcentaje" type="text" placeholder="" value=""
                  className="w-full p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="flex w-[6.8rem] lg:w-56 flex-col">
                <label htmlFor="cantidad" className="text-sm">Cantidad</label>
                <input id="cantidad" name="cantidad" type="number" placeholder=""
                  className="p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
              </div>
              <div className="flex w-[6.8rem] lg:w-56 flex-col">
                <label htmlFor="importe" className="text-sm">Importe</label>
                <input id="importe" name="importe" type="number" placeholder=""
                  className="p-2 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="comentarios" className="text-sm">Comentarios</label>
              <textarea id="comentarios" name="comentarios" placeholder=""
                className="w-full p-3 rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"></textarea>
            </div>
          </div>
        </fieldset>
        <input id="submit-contact-form"
          className="px-8 py-3 font-semibold rounded bg-green-600 text-gray-200 hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-black" type="submit"
          value="Enviar"
          disabled={areaResponsable === "" || nombreIncidencia === ""}
        />
      </form>
    </>
  )
}

export default IncidenciasForm