/* Tänne tulee kaikki API kutsut */
import type { Customer } from "./types";

// BASIC FETCH

export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching");

            return response.json();
        });
}



export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching");

            return response.json();
        })
}




// NEW CUSTOMER

export const saveCustomer = (customer: Customer) => {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding a new customer");

        return response.json();
        })
}