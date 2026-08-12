import api from "../api/api.js";

export async function createReservation(data) {
    return api.post("/reservations" , data)
}

export async function getMyReservations() {
    return api.get("/reservations/my")
}

export async function getReservation(id) {
    return api.get(`/reservations/${id}`);
}

export async function cancelReservation(id) {
    return api.post(`/reservations/${id}/cancel`);
}