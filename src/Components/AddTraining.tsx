import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Training, CustomerData } from '../types';
import TrainingForm from './TrainingForm';
import { fetchCustomers } from '../trainingapi';

type AddTrainingProps = {
    handleAdd: (training: Training) => void;
}

export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [training, setTraining] = useState<Training>({
        date: "",
        duration: 0,
        activity: "",
        customer: ""
    })

    const handleClickOpen = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleAdd(training);
        handleClose();
    };

    return (
        <>
            <Button sx={{ ml: 3, height: 80, mb: 'auto', mt: 3 }} 
            variant="outlined" 
            onClick={handleClickOpen}>
                New training session
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
                <TrainingForm 
                training={training} 
                setTraining={setTraining}
                customers={customers} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );



}