const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      { name: `${"1.".green} Crear tarea`, value: "1" },
      { name: `${"2.".green} Listar tareas`, value: "2" },
      { name: `${"3.".green} Listar tareas completadas`, value: "3" },
      { name: `${"4.".green} Listar tareas pendientes`, value: "4" },
      { name: `${"5.".green} Completar tarea(s)`, value: "5" },
      { name: `${"6.".green} Borrar tarea`, value: "6" },
      { name: `${"0.".green} Salir`, value: "0" },
    ],
  },
];

const pausaOpt = [
  {
    type: "input",
    name: "pause",
    message: `Presione ${"ENTER".green} para continuar`,
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  Selecciona una opción   ".white);
  console.log("==========================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  console.log("\n");
  return await inquirer.prompt(pausaOpt);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (!value.length) return "Debe de escribir una tarea";
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listarTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: `${"0.".green} Cancelar`,
  });

  const question = [
    {
      type: "list",
      name: "id",
      message: "Selecciona la tarea a borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(question);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

const listarTareasCompletar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: !!tarea.completedAt,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciona la tarea a completar",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listarTareasBorrar,
  confirmar,
  listarTareasCompletar,
};
