// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("botonSimular");
  boton.addEventListener("click", function () {
    simular();
  });
});

// Función promedio individual
const funcProm = function () {
  let nota1 = this.notas[0];
  let nota2 = this.notas[1];
  let nota3 = this.notas[2];

  let suma = nota1 + nota2 + nota3;
  let promedio = suma / 3;
  return `El alumno ${this.nombre} tiene el promedio ${promedio.toFixed(2)}`;
};

// Función promedio general
const funcPromGeneral = function () {
  let sumaTotal = 0;
  for (let i = 0; i < alumnos.length; i++) {
    // puede hacerse con un forEach
    let suma = alumnos[i].notas[0] + alumnos[i].notas[1] + alumnos[i].notas[2];
    let promedio = suma / 3;
    sumaTotal += promedio;
  }
  return (sumaTotal / alumnos.length).toFixed(2);
};

// Array de alumnos
let alumnos = [
  {
    id: 1,
    nombre: "Alessandro Baeza",
    email: "alessandro.baeza@gmail.com",
    edad: 39,
    estaRegistrado: true,
    notas: [7, 6.5, 5.5],
    promedio: funcProm,
  },
  {
    id: 2,
    nombre: "Juan Arroyo",
    email: "juan.arroyo@gmail.com",
    edad: 40,
    estaRegistrado: true,
    notas: [6, 6.3, 6.5],
    promedio: funcProm,
  },
  {
    id: 3,
    nombre: "Jorge Oviedo",
    email: "jorge.oviedo@gmail.com",
    edad: 27,
    estaRegistrado: true,
    notas: [5.4, 6.5, 6],
    promedio: funcProm,
  },
];

// Contador de ID para nuevos alumnos

//alumnos.length > 0: Verifica cantidad en el array alumnos.
//alumnos.map((a) => a.id): Crea un array con solo los id de cada alumno.
//Math.max(...alumnos.map(...)): Usa el operador spread ... para pasar los id como argumentos a Math.max, obteniendo el mayor.
//Si el arreglo está vacío, retorna 0.
let ultimoId = alumnos.length > 0 ? Math.max(...alumnos.map((a) => a.id)) : 0;

// Función principal
function simular() {
  alert("Simulación iniciada...");
  let opcion;

  while (opcion !== 0) {
    opcion = Number(
      prompt(
        "Menú:\n1. Listar alumnos\n2. Agregar alumno\n3. Editar alumno\n4. Eliminar alumno\n5. Promedio General\n9. Limpiar Consola\n0. Salir"
      )
    );

    if (opcion === 1) {
      console.clear();
      console.log("Lista de alumnos:");

      // recorre el array
      for (let i = 0; i < alumnos.length; i++) {
        // puede hacerse con un forEach
        console.log(`Id : ${alumnos[i].id}`);
        console.log(`Nombre : ${alumnos[i].nombre}`);
        console.log(`Email : ${alumnos[i].email}`);
        console.log(`Edad : ${alumnos[i].edad}`);
        console.log(`Nota 1 : ${alumnos[i].notas[0]}`);
        console.log(`Nota 2 : ${alumnos[i].notas[1]}`);
        console.log(`Nota 3 : ${alumnos[i].notas[2]}`);
        console.log(`Promedio : ${alumnos[i].promedio()}`);
        console.log("------------------------");
      }
    } else if (opcion === 2) {
      console.clear();

      // Validación de nombre
      let nombre;
      do {
        nombre = prompt("Ingrese el nombre del alumno (no puede estar vacío):");
        if (!nombre || nombre.trim() === "") {
          console.log("El nombre no puede estar vacío.");
        }
      } while (!nombre || nombre.trim() === "");

      // Validación de email
      let email;
      do {
        email = prompt("Ingrese el email del alumno (no puede estar vacío):");
        if (!email || email.trim() === "") {
          console.log("El email no puede estar vacío.");
        }
      } while (!email || email.trim() === "");

      // Validación de edad
      let edad;
      do {
        edad = Number(
          prompt("Ingrese la edad del alumno (debe ser un número):")
        );
        if (isNaN(edad) || edad <= 0) {
          console.log("Edad no válida. Debe ser un número positivo.");
        }
      } while (isNaN(edad) || edad <= 0);

      // Validación de notas
      let nota1, nota2, nota3;
      do {
        nota1 = Number(prompt("Ingrese nota 1 (debe ser entre 1.0 y 7.0):"));
        if (isNaN(nota1) || nota1 < 1 || nota1 > 7) {
          console.log("Nota 1 no válida. Debe ser un número entre 1.0 y 7.0.");
        }
      } while (isNaN(nota1) || nota1 < 1 || nota1 > 7);

      do {
        nota2 = Number(prompt("Ingrese nota 2 (debe ser entre 1.0 y 7.0):"));
        if (isNaN(nota2) || nota2 < 1 || nota2 > 7) {
          console.log("Nota 2 no válida. Debe ser un número entre 1.0 y 7.0.");
        }
      } while (isNaN(nota2) || nota2 < 1 || nota2 > 7);

      do {
        nota3 = Number(prompt("Ingrese nota 3 (debe ser entre 1.0 y 7.0):"));
        if (isNaN(nota3) || nota3 < 1 || nota3 > 7) {
          console.log("Nota 3 no válida. Debe ser un número entre 1.0 y 7.0.");
        }
      } while (isNaN(nota3) || nota3 < 1 || nota3 > 7);

      ultimoId++; // aumento ultimo ID
      let nuevoAlumno = {
        id: ultimoId,
        nombre,
        email,
        edad,
        estaRegistrado: true,
        notas: [nota1, nota2, nota3],
        promedio: funcProm,
      };
      alumnos.push(nuevoAlumno);
      console.log("Alumno agregado exitosamente.");
    } else if (opcion === 3) {
      console.clear();
      let idEditar = Number(
        prompt("Ingrese el ID del alumno que desea editar:")
      );
      let alumno = alumnos.find((a) => a.id === idEditar); // busca ID con .find

      if (alumno) {
        // Edición de nombre
        let nuevoNombre;
        do {
          nuevoNombre = prompt(
            `Nombre actual: ${alumno.nombre}\nNuevo nombre (no puede estar vacío):`
          );
          if (!nuevoNombre || nuevoNombre.trim() === "") {
            console.log("El nombre no puede estar vacío.");
          }
        } while (!nuevoNombre || nuevoNombre.trim() === "");

        // Edición de email
        let nuevoEmail;
        do {
          nuevoEmail = prompt(
            `Email actual: ${alumno.email}\nNuevo email (no puede estar vacío):`
          );
          if (!nuevoEmail || nuevoEmail.trim() === "") {
            console.log("El email no puede estar vacío.");
          }
        } while (!nuevoEmail || nuevoEmail.trim() === "");

        // Edición de edad
        let nuevaEdad;
        do {
          nuevaEdad = Number(
            prompt(
              `Edad actual: ${alumno.edad}\nNueva edad (debe ser un número):`
            )
          );
          if (isNaN(nuevaEdad) || nuevaEdad <= 0) {
            console.log("Edad no válida. Debe ser un número positivo.");
          }
        } while (isNaN(nuevaEdad) || nuevaEdad <= 0);

        // Edición de notas
        let nuevaNota1, nuevaNota2, nuevaNota3;
        do {
          nuevaNota1 = Number(
            prompt(
              `Nota 1 actual: ${alumno.notas[0]}\nNueva nota 1 (debe ser entre 1.0 y 7.0):`
            )
          );
          if (isNaN(nuevaNota1) || nuevaNota1 < 1 || nuevaNota1 > 7) {
            console.log(
              "Nota 1 no válida. Debe ser un número entre 1.0 y 7.0."
            );
          }
        } while (isNaN(nuevaNota1) || nuevaNota1 < 1 || nuevaNota1 > 7);

        do {
          nuevaNota2 = Number(
            prompt(
              `Nota 2 actual: ${alumno.notas[1]}\nNueva nota 2 (debe ser entre 1.0 y 7.0):`
            )
          );
          if (isNaN(nuevaNota2) || nuevaNota2 < 1 || nuevaNota2 > 7) {
            console.log(
              "Nota 2 no válida. Debe ser un número entre 1.0 y 7.0."
            );
          }
        } while (isNaN(nuevaNota2) || nuevaNota2 < 1 || nuevaNota2 > 7);

        do {
          nuevaNota3 = Number(
            prompt(
              `Nota 3 actual: ${alumno.notas[2]}\nNueva nota 3 (debe ser entre 1.0 y 7.0):`
            )
          );
          if (isNaN(nuevaNota3) || nuevaNota3 < 1 || nuevaNota3 > 7) {
            console.log(
              "Nota 3 no válida. Debe ser un número entre 1.0 y 7.0."
            );
          }
        } while (isNaN(nuevaNota3) || nuevaNota3 < 1 || nuevaNota3 > 7);

        alumno.nombre = nuevoNombre;
        alumno.email = nuevoEmail;
        alumno.edad = nuevaEdad;
        alumno.notas = [nuevaNota1, nuevaNota2, nuevaNota3];

        console.log("Alumno editado correctamente.");
      } else {
        console.log("No se encontró un alumno con ese ID.");
      }
    } else if (opcion === 4) {
      console.clear();
      let idEliminar = Number(
        prompt("Ingrese el ID del alumno que desea eliminar:")
      );

      //.findIndex(...): Busca coincidencia, si no se cumple regresa un -1.
      //(a) => a.id === idEliminar: La condición es que el id del alumno sea igual a idEliminar.
      let index = alumnos.findIndex((a) => a.id === idEliminar);

      if (index !== -1) {
        //confirmacion de eliminación
        let confirmacion = confirm(
          `¿Estás seguro que deseas eliminar a ${alumnos[index].nombre}?`
        );

        if (confirmacion) {
          alumnos.splice(index, 1); //elimina elemento del array de la posicion del index
          console.log("Alumno eliminado correctamente.");
        } else {
          console.log("Operación cancelada.");
        }
      } else {
        console.log("No se encontró un alumno con ese ID.");
      }
    } else if (opcion === 5) {
      console.clear();
      console.log(`Promedio General: ${funcPromGeneral()}`);
    } else if (opcion === 9) {
      console.clear();
      console.log("Consola limpiada...");
    } else if (opcion === 0) {
      console.log("Saliendo del programa...");
    } else {
      console.log("Opción no válida. Intenta de nuevo.");
    }
  }
}
