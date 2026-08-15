import api from "../api/api.js";

export function getPharmacyProfile() {
    return api.get("/pharmacy/profile");
}

export function updatePharmacyProfile(data) {
    return api.put("/pharmacy/profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function getInventory(params = {}) {
    return api.get("/inventory", {
        params,
    });
}

export async function updateInventory(id, data) {
    return api.put(`/inventory/${id}`, data);
}

export async function deleteInventory(id) {
    return api.delete(`/inventory/${id}`);
}

export async function addInventory(data) {
    return api.post("/inventory", data);
}

export async function importInventory(file) {
    const formData = new FormData();

    formData.append("file", file);

    return api.post("/inventory/import", formData);
}

export async function getImportLogs() {
    return api.get("/inventory/import/logs");
}

export async function getPharmacyReservations(status = "") {
    return api.get("/pharmacy/reservations", {
        params: {
            ...(status && { status }),
        },
    });
}

export async function acceptReservation(id) {
    return api.post(`/reservations/${id}/accept`);
}

export async function rejectReservation(id) {
    return api.post(`/reservations/${id}/reject`);
}