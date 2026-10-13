// Laundry form ko select kar rahe hain
const laundryForm = document.getElementById("laundryForm");

// Orders table ko select kar rahe hain
const ordersTableBody = document.getElementById("ordersTableBody");
// Status filter ko select karna
const statusFilter = document.getElementById("statusFilter");
// Search box ko select karna
const searchInput = document.getElementById("searchInput");


// LocalStorage se orders nikalna
let orders = JSON.parse(localStorage.getItem("laundryOrders")) || [];


// Next order number
let orderNumber = orders.length + 1;


// Dashboard update karne ka function
function updateDashboard() {

    let inQueue = 0;
    let washing = 0;
    let ready = 0;
    let delivered = 0;


    // Har order ka status check karna
    orders.forEach(function(order) {

        if (order.status === "In Queue") {
            inQueue++;
        }

        else if (order.status === "Washing") {
            washing++;
        }

        else if (order.status === "Ready for Pickup") {
            ready++;
        }

        else if (order.status === "Delivered") {
            delivered++;
        }

    });


    // Dashboard cards ko select karna
    const cards = document.querySelectorAll(".card p");


    // Numbers update karna
    cards[0].textContent = orders.length;
    cards[1].textContent = inQueue;
    cards[2].textContent = washing;
    cards[3].textContent = ready;
    cards[4].textContent = delivered;
}


// Orders ko table me show karne ka function
function displayOrders() {

    // Table ko empty karna
    ordersTableBody.innerHTML = "";


    // Har order ko table me add karna
    orders.forEach(function(order) {

        const newRow = document.createElement("tr");


        newRow.innerHTML = `
            <td>${order.token}</td>
            <td>${order.studentName}</td>
            <td>${order.roomNumber}</td>
            <td>${order.clothes}</td>
            <td>${order.weight} kg</td>
            <td>${order.service}</td>
            <td>${order.pickupDate}</td>

            <td>
                <select class="status-select">

                    <option value="In Queue">In Queue</option>

                    <option value="Washing">Washing</option>

                    <option value="Ready for Pickup">
                        Ready for Pickup
                    </option>

                    <option value="Delivered">
                        Delivered
                    </option>

                </select>
            </td>
        `;


        // Dropdown select karna
        const statusSelect = newRow.querySelector(".status-select");


        // Current status dropdown me set karna
        statusSelect.value = order.status;


        // Status change hone par
        statusSelect.addEventListener("change", function() {

            // Order ka status update karna
            order.status = statusSelect.value;


            // Updated orders ko LocalStorage me save karna
            localStorage.setItem(
                "laundryOrders",
                JSON.stringify(orders)
            );


            // Dashboard update karna
            updateDashboard();

        });


        // Row ko table me add karna
        ordersTableBody.appendChild(newRow);

    });


    // Dashboard update karna
    updateDashboard();
}


// New Laundry Order submit hone par
laundryForm.addEventListener("submit", function(event) {

    // Page reload hone se rokna
    event.preventDefault();


    // Form se information lena

    const studentName =
        document.getElementById("studentName").value;

    const roomNumber =
        document.getElementById("roomNumber").value;

    const contactNumber =
        document.getElementById("contactNumber").value;

    const clothes =
        document.getElementById("clothes").value;

    const weight =
        document.getElementById("weight").value;

    const service =
        document.getElementById("service").value;

    const pickupDate =
        document.getElementById("pickupDate").value;


    // Automatic token banana

    const token =
        "L-" + String(orderNumber).padStart(3, "0");


    // New order object banana

    const newOrder = {

        token: token,

        studentName: studentName,

        roomNumber: roomNumber,

        contactNumber: contactNumber,

        clothes: clothes,

        weight: weight,

        service: service,

        pickupDate: pickupDate,

        status: "In Queue"

    };


    // Order ko array me add karna
    orders.push(newOrder);


    // Orders ko LocalStorage me save karna

    localStorage.setItem(
        "laundryOrders",
        JSON.stringify(orders)
    );


    // Next token number increase karna
    orderNumber++;


    // Table ko dobara display karna
    displayOrders();


    // Form empty karna
    laundryForm.reset();


    // Success message
    alert(
        "Laundry Order Added Successfully!\nYour Token is: " + token
    );

});


// Page load hote hi saved orders show karna
displayOrders();

    // Status filter change hone par orders filter karna
statusFilter.addEventListener("change", function() {

    const selectedStatus = statusFilter.value;

    const filteredOrders = orders.filter(function(order) {

        if (selectedStatus === "All") {
            return true;
        }

        return order.status === selectedStatus;

    });

    ordersTableBody.innerHTML = "";

    filteredOrders.forEach(function(order) {

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${order.token}</td>
            <td>${order.studentName}</td>
            <td>${order.roomNumber}</td>
            <td>${order.clothes}</td>
            <td>${order.weight} kg</td>
            <td>${order.service}</td>
            <td>${order.pickupDate}</td>
            <td>${order.status}</td>
        `;

        ordersTableBody.appendChild(newRow);

    });

});// Search box se order search karna
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const selectedStatus = statusFilter.value;

    const filteredOrders = orders.filter(function(order) {

        const matchesSearch =
            order.studentName.toLowerCase().includes(searchText) ||
            order.roomNumber.toLowerCase().includes(searchText) ||
            order.token.toLowerCase().includes(searchText);

        const matchesStatus =
            selectedStatus === "All" ||
            order.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });

    ordersTableBody.innerHTML = "";

    filteredOrders.forEach(function(order) {

        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${order.token}</td>
            <td>${order.studentName}</td>
            <td>${order.roomNumber}</td>
            <td>${order.clothes}</td>
            <td>${order.weight} kg</td>
            <td>${order.service}</td>
            <td>${order.pickupDate}</td>
            <td>${order.status}</td>
        `;

        ordersTableBody.appendChild(newRow);

    });

});
