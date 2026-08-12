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