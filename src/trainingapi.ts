import type { Customer } from "./types";
import type { Training } from "./types";

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





// CUSTOMER 

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


// CUSTOMER UPDATE

export const updateCustomer = (url: string, customer: Customer) => {
    return fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when updating a customer");

        return response.json();
        })
}


// DELETE CUSTOMER

export const deleteCustomer = (url : string) => {
    return fetch(url, {
        method: "DELETE"
    
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when deleting a customer");

        return response;
        })
}


 // CUSTOMER NAME

export const fetchCustomerByUrl = (url: string) => {
    return fetch(url)
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customer details");

            return response.json();
        });
}





// TRAININGS

// ADD TRAINING 

export const saveTraining = (training: Training) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when adding a training");

        return response.json();
        })
}


// DELETE TRAINING

export const deleteTraining = (url : string) => {
    return fetch(url, {
        method: "DELETE"
    
    })
    .then(response => {
        if (!response.ok)
            throw new Error("Error when deleting a customer");

        return response;
        })
}