let orderId = new URL(window.location.href).searchParams;
let id = orderId.get('orderId');
console.log(orderId)

function getOrderId() {
    console.log(id);
    const displayOrderId = document.getElementById("orderId");
    displayOrderId.innerText = id;
    localStorage.clear();
}

getOrderId();