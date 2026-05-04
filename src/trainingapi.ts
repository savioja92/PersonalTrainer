/* Tänne tulee kaikki API kutsut */



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