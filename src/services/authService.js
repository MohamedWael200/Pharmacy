import api from "../api/api.js";

export async function registerPatient(data) {
    return api.post("auth/register/patient" , data)
}

export async function registerPharmacy(data) {
    return api.post("auth/register/pharmacy" , data)
}

export async function login(data) {
    return api.post("auth/login" , data)
}

export async function logout() {
    return api.post("auth/logout")
}


export async function getUser(){
    return api.get("auth/me")
}