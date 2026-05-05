import { useEffect, useState } from "react";
import type { TrainingData, Training } from "../types";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { deleteTraining, fetchTrainings, saveTraining } from "../trainingapi";
import AddTraining from "./AddTraining";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";


const CustomerName = ({ url }: { url: string }) => {
    const [name, setName] = useState<string>("Loading...");

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setName(`${data.firstname} ${data.lastname}`);
            })
            .catch(() => setName("Error loading name"));
    }, [url]);
    return <span>{name}</span>;
};

function Trainings() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);
    const [open, setOpen] = useState(false);



    // API CALLS

    const getTrainings = () => {
        fetchTrainings()
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.log(err));
    };
    useEffect(() => {
        getTrainings();
    }, []);

    const handleAdd = (newTraining: Training) => {
        saveTraining(newTraining)
        .then(() => getTrainings())
        .catch(err => console.error(err))
    };

    const handleDelete = (url: string) => {
            if (window.confirm("Are you sure?")) {
                deleteTraining(url)
                    .then(() => {
                        getTrainings();
                        setOpen(true);
                    })
                    .catch(err => console.error(err));
            }
        };




    // COLUMNS

    const columns: GridColDef[] = [
        {
            field: "date",
            headerName: "Date",
            width: 200,

            valueFormatter: (value) => {
                if (!value) return '';

                return new Intl.DateTimeFormat('fi-FI', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).format(new Date(value));
            }
        },

        { field: "duration", headerName: "Duration" },
        { field: "activity", width: 150, headerName: "Activity" },
        {
            field: "customer",
            headerName: "Customer",
            width: 200,
            renderCell: (params: GridRenderCellParams) => (
                <CustomerName url={params.row._links.customer.href} />
            )
        },
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
        }
    ]






    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row">
                <h1>Trainings</h1>
            </Stack>
            <div style={{ width: "85%", height: 500, margin: "auto" }} >

                <DataGrid
                    columns={columns}
                    rows={trainings}
                    getRowId={row => row._links.self.href}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training session deleted succesfully"
            />
            <AddTraining handleAdd={handleAdd} />
        </>
    )

}

export default Trainings;