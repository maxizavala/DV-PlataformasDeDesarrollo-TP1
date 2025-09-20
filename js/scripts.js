console.log("js loaded")

function renderizarVuelos(vuelos) {
    const tbody = document.getElementById("tabla");
    tbody.innerHTML = "";

    vuelos.forEach(vuelo => {
        let color = "";

        switch (vuelo.estado) {
            case "En horario": color = "text-success"; break;
            case "Retrasado": color = "text-warning"; break;
            case "Cancelado": color = "text-danger"; break;
            case "Embarcando": color = "text-primary"; break;
        }

        tbody.innerHTML += `
            <tr>
                <td class="text-start">${vuelo.codigo}</td>
                <td class="text-start">
                    <img src="${vuelo.bandera_url}" width="30" class="me-2">
                    ${vuelo.destino_ciudad}, ${vuelo.destino_pais}
                </td>
                <td class="text-start">${vuelo.hora_salida}</td>
                <td class="text-start fw-bold ${color}">${vuelo.estado}</td>
            </tr>
        `;
    });
}

let todos_los_vuelos = [];

function obtenerVuelos() {
    fetch("./data/vuelos.json")
        .then(res => res.json())
        .then(data => {
            todos_los_vuelos = data;
            renderizarVuelos(data);
        })
        .catch(error => {
            document.getElementById("tabla").innerHTML = `
                <tr>
                    <td colspan="4" class="text-danger">No se pudieron cargar los vuelos</td>
                </tr>
            `;
        });
}


obtenerVuelos();
setInterval(obtenerVuelos, 60000);


function manejadorBusquedaCodigo(vuelos) {
    const codigo = document.getElementById("input_codigo_vuelo").value;
    const vuelo = vuelos.filter(v => v.codigo === codigo);

    if (vuelo.length > 0) {
        renderizarVuelos(vuelo);
    } else {
        const modal_error = new bootstrap.Modal(document.getElementById('modal'));
        modal_error.show();
    }
}


document.getElementById("btn_buscar").addEventListener("click", function() {
    manejadorBusquedaCodigo(todos_los_vuelos);
});
