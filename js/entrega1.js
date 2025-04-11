// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const boton = document.getElementById("botonSimular");
    boton.addEventListener("click", function () {
        simular();
    });
});

// Función promedio individual
const funcProm = function () {
    let [nota1, nota2, nota3] = this.notas;
    let suma = nota1 + nota2 + nota3;
    let promedio = suma / 3;
    return `El alumno ${this.nombre} tiene el promedio ${promedio.toFixed(2)}`;
};

// Función promedio general
const funcPromGeneral = function () {
    let sumaTotal = 0;
    for (let i = 0; i < alumnos.length; i++) {
        let promedio = (alumnos[i].notas[0] + alumnos[i].notas[1] + alumnos[i].notas[2]) / 3;
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
        promedio: funcProm
    },
    {
        id: 2,
        nombre: "Juan Arroyo",
        email: "juan.arroyo@gmail.com",
        edad: 40,
        estaRegistrado: true,
        notas: [6, 6.3, 6.5],
        promedio: funcProm
    },
    {
        id: 3,
        nombre: "Jorge Oviedo",
        email: "jorge.oviedo@gmail.com",
        edad: 27,
        estaRegistrado: true,
        notas: [5.4, 6.5, 6],
        promedio: funcProm
    },
];

// Contador de ID para nuevos alumnos
let ultimoId = alumnos.length > 0 ? Math.max(...alumnos.map(a => a.id)) : 0;

// Función principal
function simular() {
    alert("Simulación iniciada...");
    let opcion;

    while (opcion !== 0) {
        opcion = Number(prompt("Menú:\n1. Listar alumnos\n2. Agregar alumno\n3. Editar alumno\n4. Eliminar alumno\n5. Promedio General\n9. Limpiar Consola\n0. Salir"));

        if (opcion === 1) {
            console.clear();
            console.log("Lista de alumnos:");
            alumnos.forEach(alumno => {
                console.log(`Id : ${alumno.id}`);
                console.log(`Nombre : ${alumno.nombre}`);
                console.log(`Email : ${alumno.email}`);
                console.log(`Edad : ${alumno.edad}`);
                console.log(`Nota 1 : ${alumno.notas[0]}`);
                console.log(`Nota 2 : ${alumno.notas[1]}`);
                console.log(`Nota 3 : ${alumno.notas[2]}`);
                console.log(`Promedio : ${alumno.promedio()}`);
                console.log("------------------------");
            });

        } else if (opcion === 2) {
            console.clear();

            let nombre = prompt("Ingrese el nombre del alumno:");
            let email = prompt("Ingrese el correo del alumno:");
            let edad = Number(prompt("Ingrese la edad del alumno:"));
            let nota1 = Number(prompt("Ingrese nota 1:"));
            let nota2 = Number(prompt("Ingrese nota 2:"));
            let nota3 = Number(prompt("Ingrese nota 3:"));

            if (
                !nombre || !email || isNaN(edad) || isNaN(nota1) || isNaN(nota2) || isNaN(nota3) ||
                nota1 < 1 || nota1 > 7 ||
                nota2 < 1 || nota2 > 7 ||
                nota3 < 1 || nota3 > 7
            ) {
                console.log("Datos inválidos. Asegúrese de que las notas estén entre 1.0 y 7.0 y los campos no estén vacíos.");
                continue;
            }

            ultimoId++;
            let nuevoAlumno = {
                id: ultimoId,
                nombre,
                email,
                edad,
                estaRegistrado: true,
                notas: [nota1, nota2, nota3],
                promedio: funcProm
            };
            alumnos.push(nuevoAlumno);
            console.log("Alumno agregado exitosamente.");

        } else if (opcion === 3) {
            console.clear();
            let idEditar = Number(prompt("Ingrese el ID del alumno que desea editar:"));
            let alumno = alumnos.find(a => a.id === idEditar);

            if (alumno) {
                let nuevoNombre = prompt(`Nombre actual: ${alumno.nombre}\nNuevo nombre:`) || alumno.nombre;
                let nuevoEmail = prompt(`Email actual: ${alumno.email}\nNuevo email:`) || alumno.email;
                let nuevaEdad = Number(prompt(`Edad actual: ${alumno.edad}\nNueva edad:`));
                let nuevaNota1 = Number(prompt(`Nota 1 actual: ${alumno.notas[0]}\nNueva nota 1:`));
                let nuevaNota2 = Number(prompt(`Nota 2 actual: ${alumno.notas[1]}\nNueva nota 2:`));
                let nuevaNota3 = Number(prompt(`Nota 3 actual: ${alumno.notas[2]}\nNueva nota 3:`));

                if (
                    isNaN(nuevaEdad) || isNaN(nuevaNota1) || isNaN(nuevaNota2) || isNaN(nuevaNota3) ||
                    nuevaNota1 < 1 || nuevaNota1 > 7 ||
                    nuevaNota2 < 1 || nuevaNota2 > 7 ||
                    nuevaNota3 < 1 || nuevaNota3 > 7
                ) {
                    console.log("Edición cancelada. Verifica que edad y notas sean válidas.");
                    continue;
                }

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
            let idEliminar = Number(prompt("Ingrese el ID del alumno que desea eliminar:"));
            let index = alumnos.findIndex(a => a.id === idEliminar);

            if (index !== -1) {
                let confirmacion = confirm(`¿Estás seguro que deseas eliminar a ${alumnos[index].nombre}?`);
                if (confirmacion) {
                    alumnos.splice(index, 1);
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