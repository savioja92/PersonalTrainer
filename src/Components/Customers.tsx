import { useEffect, useState } from "react";
import type { CustomerData, Customer } from "../types";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { deleteCustomer, fetchCustomers, saveCustomer, updateCustomer } from "../trainingapi";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Button from "@mui/material/Button";



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

    // COLUMNS
    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name" },
        { field: "lastname", headerName: "Last Name" },
        { field: "streetaddress", headerName: "Address" },
        { field: "postcode", headerName: "Post code" },
        { field: "city", headerName: "City" },
        { field: "email", headerName: "E-mail" },
        { field: "phone", headerName: "Phone" },
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) =>
                <Button
                    color="error"
                    size="small"
                    onClick={() => handleDelete(params.row._links.self.href)}>
                    DELETE
                </Button>
        },
        {
            field: "_links.car.href",
            headerName: "",
            sortable: false,
            disableColumnMenu: false,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer customer={params.row} handleUpdate={handleUpdate} />
        }
    ]



    // API CALLS
    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteCustomer(url)
                .then(() => {
                    getCustomers();
                })
                .catch(err => console.error(err));
        }
    };

    const handleAdd = (customer: Customer) => {
        saveCustomer(customer)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    };

    const handleUpdate = (url: string, updatedCustomer: Customer) => {
        updateCustomer(url, updatedCustomer)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    };






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
                <AddCustomer handleAdd={handleAdd} />
            </div>
        </>
    )

}



export default Customers;