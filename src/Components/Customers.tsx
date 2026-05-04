import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { fetchCustomers, saveCustomer } from "../trainingapi";
import AddCustomer from "./AddCustomer";


function Customers() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const getCustomers = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err))
    };

    useEffect(() => {
        getCustomers();
    }, []);


    const handleAdd = (customer: Customer) => {
        saveCustomer(customer)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    }

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
                <AddCustomer handleAdd={handleAdd} />
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