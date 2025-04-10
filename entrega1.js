// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Obtener el botón por su ID
    const boton = document.getElementById("botonSimular");

    // Agregar un evento de clic al botón
    boton.addEventListener("click", function() {
      simular(); // Llamar a una función simular
    });

});

// funcion promedio
const funcProm = function () {
    let nota1 = this.notas[0];
    let nota2 = this.notas[1];
    let nota3 = this.notas[2];
    let promedio = (nota1 + nota2 + nota3) / 3;
    return `El alumno ${this.nombre} tiene el promedio ${promedio.toFixed(2)}`;
};

const funcPromGeneral =function (){
    let promedioGeneral = 0;
    for (let i = 0; i < alumnos.length; i++) {
        let calculo = (alumnos[i].notas[0]+alumnos[i].notas[1]+alumnos[i].notas[2])/3;
        promedioGeneral = promedioGeneral + calculo;
    }
    return (promedioGeneral/alumnos.length).toFixed(2);
}

//array de objetos
let alumnos = [
    {
        id: 1,
        nombre: "Alessandro Baeza",
        email: "alessandro.baeza@gmail.com",
        edad: 39,
        estaRegistrado: true,
        notas: [7, 6.5, 5, 5],
        promedio: funcProm
    },
    {
        id: 2,
        nombre: "Juan Arroyo",
        email: "juan.arroyo@gmail.com",
        edad: 40,
        estaRegistrado: true,
        notas: [6, 6.3, 6, 5],
        promedio: funcProm
    },
    {
        id: 3,
        nombre: "Jorge Oviedo",
        email: "jorge.oviedo@gmail.com",
        edad: 27,
        estaRegistrado: true,
        notas: [5, 4, 6.5, 6],
        promedio: funcProm
    },
];

function simular(){
    alert("Simulación iniciada...");
    // Bucle de menú
    let opcion;
    // Mantine un ciclo eterno hasta el presionar 0
    while (opcion !== 0) {
        opcion = Number(prompt("Menú:\n1. Listar alumnos\n2. Agregar alumno\n3. Editar alumno\n4. Promedio General\n9. Limpiar Consola\n0. Salir"));

        if (opcion === 1) {
            console.log("Lista de alumnos:");
            // recorre el array
            for (let i = 0; i < alumnos.length; i++) {
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
            // crea un objeto alumno
            let nuevoAlumno = {
                id: alumnos.length + 1,
                nombre: prompt("Ingrese el nombre del alumno:"),
                email: prompt("Ingrese el correo del alumno:"),
                edad: Number(prompt("Ingrese la edad del alumno:")),
                estaRegistrado: true,
                notas: [
                    Number(prompt("Ingrese nota 1:")),
                    Number(prompt("Ingrese nota 2:")),
                    Number(prompt("Ingrese nota 3:"))
                ],
                promedio: funcProm
            };
            // agrega objeto alumno al array
            alumnos.push(nuevoAlumno);
            console.log("Alumno agregado exitosamente.");
        }else if (opcion === 3) {
                let idEditar = Number(prompt("Ingrese el ID del alumno que desea editar:"));
                let alumno = alumnos.find(a => a.id === idEditar);
        
                if (alumno) {
                    alumno.nombre = prompt(`Nombre actual: ${alumno.nombre}\nNuevo nombre:`) || alumno.nombre;
                    alumno.email = prompt(`Email actual: ${alumno.email}\nNuevo email:`) || alumno.email;
                    alumno.edad = Number(prompt(`Edad actual: ${alumno.edad}\nNueva edad:`)) || alumno.edad;
                    alumno.notas[0] = Number(prompt(`Nota 1 actual: ${alumno.notas[0]}\nNueva nota 1:`)) || alumno.notas[0];
                    alumno.notas[1] = Number(prompt(`Nota 2 actual: ${alumno.notas[1]}\nNueva nota 2:`)) || alumno.notas[1];
                    alumno.notas[2] = Number(prompt(`Nota 3 actual: ${alumno.notas[2]}\nNueva nota 3:`)) || alumno.notas[2];
                    console.log("Alumno editado correctamente.");
                } else {
                    console.log("No se encontró un alumno con ese ID.");
                }
        }else if (opcion === 4) {
            console.log(`Promedio General: ${funcPromGeneral()}`);
        }else if (opcion === 9) {
            console.clear();
            console.log("Consola Limpiada...");
        
        }else if (opcion === 0) {
            console.log("Saliendo del programa...");
        } else {
            console.log("Opción no válida. Intenta de nuevo.");
        }
    }
}//fin funcion simular