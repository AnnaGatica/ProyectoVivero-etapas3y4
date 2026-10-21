
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCasHc-lwvT2n-lKZHltimNmciZq5nQMBY",
    authDomain: "proyecto-vivero-27f64.firebaseapp.com",
    databaseURL: "https://proyecto-vivero-27f64-default-rtdb.firebaseio.com",
    projectId: "proyecto-vivero-27f64",
    storageBucket: "proyecto-vivero-27f64.firebasestorage.app",
    messagingSenderId: "104713254601",
    appId: "1:104713254601:web:65b4cee2ee67881b0fff18"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let inputNombre = document.querySelector("#nombre");
let inputPrecio = document.querySelector("#precio");
let inputDimension = document.querySelector("#dimension");
let inputStock = document.querySelector("#stock");
let btnAgregar = document.querySelector("#agregar");

let tabla = document.querySelector(".tabla-registro");
let PlantasRef = ref(db, "Plantas");

// ETAPA 3: Agregar plantas con ID automático
btnAgregar.onclick = function () {

    push(PlantasRef, {
        nombre: inputNombre.value,
        precio: inputPrecio.value,
        dimension: inputDimension.value,
        stock: inputStock.value
    })
    .then(() => {
        alert("Planta registrada con éxito");
    })
    .catch((error) => {
        alert("Error al registrar la planta: " + error.message);
    });

};

// Mostrar las plantas registradas
onValue(PlantasRef, (datos) => {

    let plantas = datos.val() || {};

    tabla.innerHTML = "";

    for (let ID in plantas) {
        tabla.innerHTML += `
            <tr>
                <td>${ID}</td>
                <td>${plantas[ID].nombre}</td>
                <td>${plantas[ID].precio}</td>
                <td>${plantas[ID].dimension}</td>
                <td>${plantas[ID].stock}</td>
            </tr>
        `;
    }

});
