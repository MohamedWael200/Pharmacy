import api from "../api/api.js";

export async function getPatientProfile() {
    return api.get("/patient/profile");
}

export async function updatePatientProfile(data) {
    return api.put("/patient/profile", data);
}