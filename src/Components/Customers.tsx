import { useEffect, useState } from "react";
import type { CustomerData } from "../types";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";


function Customers() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching");

                return response.json();
            })

            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCustomers();
    }, []);


    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name" },
        { field: "lastname", headerName: "Last Name" },
        { field: "streetaddress", headerName: "Address" },
        { field: "postcode", headerName: "Post code" },
        { field: "city", headerName: "City" },
        { field: "email", headerName: "E-mail" },
        { field: "phone", headerName: "Phone" },
    ]






    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row">
                <h1>Customers</h1>
            </Stack>
            <div style={{ width: "85%", height: 500, margin: "auto" }} >

                <DataGrid
                    columns={columns}
                    rows={customers}
                    getRowId={row => row._links.self.href}
                />
            </div>
        </>
    )

}



export default Customers;