import api from "../api/api.js";

export async function searchMedicines(q = "", category_id = "") {
    return api.get("/medicines/search", {
        params: {
            q,
            ...(category_id && { category_id }),
        },
    });
}

export async function detailsMedicines(id){
    return api.get(`/medicines/${id}`);
}

export function getCategories(){
    return api.get("/categories")
}