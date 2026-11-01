const addDeviceBtn = document.getElementById('addDeviceBtn');
const addDevicemodal = document.getElementById('addDeviceModal');
const closeModal = document.getElementById('closeModal');

addDeviceBtn.addEventListener('click', function () {
    addDevicemodal.style.display = 'flex';
});

closeModal.addEventListener('click', function () {
    addDevicemodal.style.display = 'none';
    addDeviceForm.reset();
    editingDeviceId = null;
    document.getElementById("modalTitle").textContent = "Add Device";
    document.getElementById("submitDeviceBtn").textContent = "Add Device";
});

addDevicemodal.addEventListener('click', function (event) {
    if (event.target === addDevicemodal) {
        addDevicemodal.style.display = 'none';
    }
});

const addDeviceForm = document.getElementById("addDeviceForm");
const infoTable = document.getElementById("infoTable");

let devices = [];

async function loadDevices() {
    try {
        const response = await fetch("http://127.0.0.1:8000/devices");

        if (!response.ok) {
            throw new Error("Failed to retrieve devices");
        }

        devices = await response.json();

        displayDevices();

    } catch (error) {
        console.error("Error loading devices:", error);
        alert("Could not load devices from the database.");
    }
}

let editingDeviceId = null;



addDeviceForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const newDevice = {
        deviceName: document.getElementById("deviceName").value,
        deviceType: document.getElementById("deviceType").value,
        user: document.getElementById("user").value,
        department: document.getElementById("department").value,
        purchaseDate: document.getElementById("purchaseDate").value,
        status: document.getElementById("status").value
    };

    try {
        let url = "http://127.0.0.1:8000/devices";
        let method = "POST";

        if (editingDeviceId !== null) {
            url = `http://127.0.0.1:8000/devices/${editingDeviceId}`;
            method = "PUT";
        }

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDevice)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        alert(editingDeviceId === null
            ? "Device added successfully!"
            : "Device updated successfully!");

        editingDeviceId = null;
        addDeviceForm.reset();

        document.getElementById("modalTitle").textContent = "Add Device";
        document.getElementById("submitDeviceBtn").textContent = "Add Device";

        addDevicemodal.style.display = "none";

        await loadDevices();

    } catch (error) {
        console.error("Error saving device:", error);
        alert("Could not save device. Please check your information.");
    }
});



function displayDevices() {

    infoTable.innerHTML = "";

    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const filteredDevices = devices.filter(function (device) {

        return device.deviceName.toLowerCase().includes(searchValue) ||
            device.user.toLowerCase().includes(searchValue);

    });

    filteredDevices.forEach(function (device) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${device.deviceName}</td>
            <td>${device.deviceType}</td>
            <td>${device.user || "-"}</td>
            <td>${device.department}</td>
            <td>${device.purchaseDate}</td>
            <td>${device.status}</td>
            <td>
                <button type="button" class="edit-btn"
                    onclick="editDevice(${devices.indexOf(device)})">
                    Edit
                </button>

                <button type="button" class="delete-btn"
                    onclick="deleteDevice(${devices.indexOf(device)})">
                    Delete
                </button>
            </td>
        `;

        infoTable.appendChild(row);

    });

    if (filteredDevices.length === 0) {
        infoTable.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">
                    No devices found
                </td>
            </tr>
        `;
    }

    updateDashboard();

}

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
    displayDevices();
});


function updateDashboard() {

    document.getElementById("totalDevices").textContent = devices.length;

    document.getElementById("availableDevices").textContent =
        devices.filter(device => device.status === "Available").length;

    document.getElementById("assignedDevices").textContent =
        devices.filter(device => device.status === "Assigned").length;

    document.getElementById("maintenanceDevices").textContent =
        devices.filter(device => device.status === "Maintenance").length;

}



async function deleteDevice(index) {
    const device = devices[index];

    const confirmDelete = confirm(
        "Are you sure you want to delete this device?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/devices/${device._id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete device");
        }

        alert("Device deleted successfully!");

        await loadDevices();

    } catch (error) {
        console.error("Error deleting device:", error);
        alert("Could not delete device.");
    }
}



function editDevice(index) {
    const device = devices[index];
    editingDeviceId = device._id;
    document.getElementById("deviceName").value = device.deviceName;
    document.getElementById("deviceType").value = device.deviceType;
    document.getElementById("user").value = device.user || "";
    document.getElementById("department").value = device.department;
    document.getElementById("purchaseDate").value = device.purchaseDate;
    document.getElementById("status").value = device.status;
    document.getElementById("modalTitle").textContent = "Edit Device";
    document.getElementById("submitDeviceBtn").textContent = "Save Changes";
    addDevicemodal.style.display = "flex";
}


loadDevices();
