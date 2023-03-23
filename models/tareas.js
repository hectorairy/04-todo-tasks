require("colors");
const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    return Object.values(this._listado);
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (id) {
      delete this._listado[id];
    }
  }

  cargarTareas(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc) {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    this.listadoArr.forEach((tarea, index) => {
      const i = `${index + 1}.`.green;
      const status = tarea.completedAt ? "Completada".green : "Pendiente".red;
      console.log(`${i} ${tarea.desc} :: ${status}`);
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let index = 1;
    this.listadoArr.forEach((tarea) => {
      if (tarea.completedAt && completadas) {
        console.log(
          `${(index + ".").green} ${tarea.desc} :: ${tarea.completedAt.green}`
        );
        index++;
      } else if (!tarea.completedAt && !completadas) {
        console.log(
          `${(index + ".").green} ${tarea.desc} :: ${"Pendiente".red}`
        );
        index++;
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completedAt) {
        tarea.completedAt = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        tarea.completedAt = null;
      }
    });
  }
}

module.exports = Tareas;
