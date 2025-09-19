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

function obtenerVuelos() {
    fetch("./data/vuelos.json")
        .then(res => res.json())
        .then(data => {
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