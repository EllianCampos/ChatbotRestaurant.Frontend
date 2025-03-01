// document.addEventListener("DOMContentLoaded", function () {
//     const menuContainer = document.getElementById("menu-container");

//     fetch("menu.php")
//         .then(response => response.json())
//         .then(data => {
//             data.forEach(item => {
//                 const menuItem = document.createElement("div");
//                 menuItem.classList.add("menu-item");
//                 menuItem.innerHTML = `<img src="img/${item.imagen}" alt="${item.nombre}">
//                                       <p>${item.nombre}</p>`;
//                 menuContainer.appendChild(menuItem);
//             });
//         })
//         .catch(error => console.error("Error al cargar el menú:", error));
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const pedidos = document.querySelectorAll(".pedido");
//     const columnas = document.querySelectorAll(".columna");

//     pedidos.forEach(pedido => {
//         pedido.addEventListener("dragstart", (e) => {
//             e.dataTransfer.setData("text", e.target.id);
//             pedido.classList.add("dragging");
//         });

//         pedido.addEventListener("dragend", () => {
//             pedido.classList.remove("dragging");
//         });
//     });

//     columnas.forEach(columna => {
//         columna.addEventListener("dragover", (e) => {
//             e.preventDefault();
//         });

//         columna.addEventListener("drop", (e) => {
//             e.preventDefault();
//             const id = e.dataTransfer.getData("text");
//             const draggedElement = document.getElementById(id);
//             columna.appendChild(draggedElement);
//         });
//     });
// });

// alert('hola')

const colIngreso = document.getElementById('ingreso')
const colProceso = document.getElementById('proceso')
const colListo = document.getElementById('listo')

const avanzar = async (id) => {
    fetch('https://wa-chatbot-restaurant.somee.com/api/orders/increment-status', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            OrderId: id
        })
    })
    .then(response => {
        if (response.ok){
            location.reload()
        } else {

        }
    })
    .catch(err => console.log(err))
}

window.addEventListener('load', async () => {
   const response = await fetch('https://wa-chatbot-restaurant.somee.com/api/orders')
   const data = await response.json()
   
   for (const order of data) {
    console.log(order)
    const or = `<div class="pedido" >
        <p><span class="text-primary">Cliente: </span>${order.orderPersonName}</p>
        <span>${order.description}</span>
        <br>
        <div class="text-end">
            <button onclick="avanzar(${order.id})" class="btn btn-primary fs-3">
                <i class="bi bi-arrow-right-circle-fill"></i>
            </button>
        </div>
    </div>`

    if (order.status == 1){
        colIngreso.innerHTML += or
    } else if (order.status == 2) {
        colProceso.innerHTML += or
    } else if (order.status == 3){
        colListo.innerHTML += or
    }
   }
})