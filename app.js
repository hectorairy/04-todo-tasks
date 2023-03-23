require("colors");

const Tareas = require("./models/tareas");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmar,
  listarTareasCompletar,
} = require("./helpers/inquirer");
const { guardarDB, leerDB } = require("./helpers/database");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const data = leerDB();
  if (data) {
    tareas.cargarTareas(data);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Ingresar nueva tarea:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas(true);
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await listarTareasCompletar(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listarTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar(
            "¿Estás seguro que deseas borrar la tarea?"
          );
          if (ok) {
            tareas.borrarTarea(id);
            console.log("La tarea ha sido eliminada");
          }
        }
        break;
    }

    guardarDB(tareas.listadoArr);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
