// Clases
class Curso {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  actualizar(nombre) {
    this.nombre = nombre;
  }
}

class Alumno {
  constructor(id, nombre, rut, email, edad, cursoId, notas) {
    this.id = id;
    this.nombre = nombre;
    this.rut = rut;
    this.email = email;
    this.edad = edad;
    this.cursoId = cursoId;
    this.notas = notas;
  }

  obtenerPromedio() {
    let nota1 = this.notas[0];
    let nota2 = this.notas[1];
    let nota3 = this.notas[2];

    let suma = parseFloat(nota1) + parseFloat(nota2) + parseFloat(nota3);

    let promedio = suma / 3;
    return promedio.toFixed(2); //reduce decimales a 2
  }

  actualizar({ nombre, rut, email, edad, cursoId, notas }) {
    Object.assign(this, { nombre, rut, email, edad, cursoId, notas });
  }
}

// Variables globales
let cursos =
  JSON.parse(localStorage.getItem("cursos"))?.map(
    (c) => new Curso(c.id, c.nombre)
  ) || [];
let alumnos =
  JSON.parse(localStorage.getItem("alumnos"))?.map(
    (a) =>
      new Alumno(a.id, a.nombre, a.rut, a.email, a.edad, a.cursoId, a.notas)
  ) || [];

let alumnoEditandoId = null;
let cursoEditandoId = null;
let ultimoIdAlumno = Math.max(...alumnos.map((a) => a.id), 0);
let ultimoIdCurso = Math.max(...cursos.map((c) => c.id), 0);

// Guardar en localStorage
function guardarDatos() {
  localStorage.setItem("cursos", JSON.stringify(cursos));
  localStorage.setItem("alumnos", JSON.stringify(alumnos));
}

// Mostrar mensaje visual alumno
function mostrarMensaje(texto, tipo = "success") {
  const div = document.createElement("div");
  div.className = `alert alert-${tipo}`;
  div.textContent = texto;
  document.getElementById("mensajes").appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// Mostrar mensaje visual curso
function mostrarMensaje2(texto, tipo = "success") {
  const div = document.createElement("div");
  div.className = `alert alert-${tipo}`;
  div.textContent = texto;
  document.getElementById("mensajes2").appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// Cargar selects
function cargarCursos() {
  const selectCurso = document.getElementById("cursoAlumno");
  const filtroCurso = document.getElementById("filtroCurso");
  selectCurso.innerHTML = "";
  filtroCurso.innerHTML = '<option value="">Seleccionar Curso</option>';
  cursos.forEach((c) => {
    selectCurso.appendChild(new Option(c.nombre, c.id));
    filtroCurso.appendChild(new Option(c.nombre, c.id));
  });
}

// Lista cursos
function cargarListaCursos() {
  const lista = document.getElementById("listaCursos");
  lista.innerHTML = "";
  //recorre array cursos y creo elemnto li de curso
  cursos.forEach((curso) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
    ${curso.nombre}
    <div class="d-flex gap-2">
      <button class="btn btn-warning btn-sm" onclick="editarCurso(${curso.id})">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="eliminarCurso(${curso.id})">Eliminar</button>
    </div>`;
    lista.appendChild(li);
  });
}

// Lista alumnos
function cargarListaAlumnos() {
  const lista = document.getElementById("listaAlumnos");
  lista.innerHTML = ""; // Limpiar la lista antes de mostrar los nuevos resultados

  const filtro = document.getElementById("filtroCurso").value;

  // Filtrar alumnos según el curso seleccionado, si hay alguno seleccionado
  let alumnosFiltrados = [];
  if (filtro) {
    alumnosFiltrados = alumnos.filter((a) => a.cursoId == filtro);
  } else {
    alumnosFiltrados = alumnos;
  }

  // Recorrer los alumnos filtrados y crear elementos <li> para mostrarlos
  alumnosFiltrados.forEach((a) => {
    const curso = cursos.find((c) => c.id === a.cursoId); // Buscar el nombre del curso

    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      ${a.nombre} - RUT: ${a.rut} - Edad: ${a.edad} - Curso: ${
      curso?.nombre || "N/A"
    }
      Notas: ${a.notas.join(", ")} - Promedio: ${a.obtenerPromedio()}
      <div class="action-buttons">
          <button class="btn btn-warning btn-sm" onclick="editarAlumno(${
            a.id
          })">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarAlumno(${
            a.id
          })">Eliminar</button>
      </div>`;

    lista.appendChild(li); // Agregar el alumno a la lista visual
  });
}

// Editar alumno
function editarAlumno(id) {
  const alumno = alumnos.find((a) => a.id === id);
  if (!alumno) return;
  alumnoEditandoId = id;
  document.getElementById("nombreAlumno").value = alumno.nombre;
  document.getElementById("rutAlumno").value = alumno.rut;
  document.getElementById("emailAlumno").value = alumno.email;
  document.getElementById("edadAlumno").value = alumno.edad;
  document.getElementById("cursoAlumno").value = alumno.cursoId;
  document.getElementById("nota1").value = alumno.notas[0];
  document.getElementById("nota2").value = alumno.notas[1];
  document.getElementById("nota3").value = alumno.notas[2];
  document.getElementById("btnAlumno").textContent = "Editar Alumno";
}

// Eliminar alumno
function eliminarAlumno(id) {
  alumnos = alumnos.filter((a) => a.id !== id);
  guardarDatos();
  cargarListaAlumnos();
  mostrarMensaje("Alumno eliminado", "warning");
}

// Editar curso
function editarCurso(id) {
  const curso = cursos.find((c) => c.id === id);
  if (!curso) return;
  cursoEditandoId = id;
  document.getElementById("nombreCurso").value = curso.nombre;
  document.getElementById("btnCurso").textContent = "Editar Curso";
  document.getElementById("tituloCurso").textContent = "Editar Curso";
}

// Eliminar curso y alumnos del curso
function eliminarCurso(id) {
  cursos = cursos.filter((c) => c.id !== id);
  alumnos = alumnos.filter((a) => a.cursoId !== id);
  guardarDatos();
  cargarCursos();
  cargarListaCursos();
  cargarListaAlumnos();
  mostrarMensaje2("Curso y alumnos eliminados", "warning");
}

// Envío formulario alumno
document
  .getElementById("formularioAlumno")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const rut = document.getElementById("rutAlumno").value.trim();
    const email = document.getElementById("emailAlumno").value.trim();
    if (!alumnoEditandoId && alumnos.some((a) => a.rut === rut)) {
      return mostrarMensaje("El RUT ya existe.", "danger");
    }
    if (!email.includes("@")) {
      return mostrarMensaje("El correo debe contener '@'.", "danger");
    }

    const notas = ["nota1", "nota2", "nota3"].map((id) =>
      document.getElementById(id).value.trim()
    );
    if (notas.some((n) => isNaN(parseFloat(n)))) {
      return mostrarMensaje("Las notas deben ser números válidos.", "danger");
    }

    const datos = {
      nombre: document.getElementById("nombreAlumno").value,
      rut,
      email,
      edad: parseInt(document.getElementById("edadAlumno").value),
      cursoId: parseInt(document.getElementById("cursoAlumno").value),
      notas,
    };

    if (alumnoEditandoId) {
      const alumno = alumnos.find((a) => a.id === alumnoEditandoId);
      alumno.actualizar(datos);
      alumnoEditandoId = null;
      document.getElementById("btnAlumno").textContent = "Agregar Alumno";
      mostrarMensaje("Alumno editado correctamente");
    } else {
      alumnos.push(new Alumno(++ultimoIdAlumno, ...Object.values(datos)));
      mostrarMensaje("Alumno agregado correctamente");
    }

    guardarDatos();
    e.target.reset();
    cargarListaAlumnos();
  });

// Envío formulario curso
document
  .getElementById("formularioCurso")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const nombre = document.getElementById("nombreCurso").value.trim();
    if (cursoEditandoId) {
      const curso = cursos.find((c) => c.id === cursoEditandoId);
      curso.actualizar(nombre);
      cursoEditandoId = null;
      document.getElementById("btnCurso").textContent = "Agregar Curso";
      document.getElementById("tituloCurso").textContent = "Agregar Curso";
      mostrarMensaje2("Curso editado correctamente");
    } else {
      cursos.push(new Curso(++ultimoIdCurso, nombre));
      mostrarMensaje2("Curso agregado correctamente");
    }

    guardarDatos();
    e.target.reset();
    cargarCursos();
    cargarListaCursos();
    cargarListaAlumnos();
  });

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar datos por defecto si no hay cursos ni alumnos guardados
  if (cursos.length === 0 && alumnos.length === 0) {
    // Cursos iniciales
    cursos = [
      new Curso(++ultimoIdCurso, "Matemáticas"),
      new Curso(++ultimoIdCurso, "Lenguaje"),
      new Curso(++ultimoIdCurso, "Historia"),
    ];

    // Alumnos iniciales
    alumnos = [
      new Alumno(
        ++ultimoIdAlumno,
        "Ana Pérez",
        "11111111-1",
        "ana@mail.com",
        16,
        cursos[0].id,
        ["6.0", "6.5", "7.0"]
      ),
      new Alumno(
        ++ultimoIdAlumno,
        "Carlos Soto",
        "22222222-2",
        "carlos@mail.com",
        17,
        cursos[1].id,
        ["5.5", "5.8", "6.2"]
      ),
      new Alumno(
        ++ultimoIdAlumno,
        "María Díaz",
        "33333333-3",
        "maria@mail.com",
        15,
        cursos[2].id,
        ["6.7", "6.9", "7.0"]
      ),
    ];

    guardarDatos();
  }

  cargarCursos();
  cargarListaCursos();
  cargarListaAlumnos();
});
