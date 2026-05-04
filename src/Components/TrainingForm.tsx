import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import type { Training, CustomerData } from '../types';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Autocomplete } from '@mui/material';

type trainingFormType = {
    training: Training;
    setTraining: React.Dispatch<React.SetStateAction<Training>>;
    customers: CustomerData[];
}


export default function TrainingForm({ training, setTraining, customers }: trainingFormType) {
    return (
        <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label="Date and Time"
                value={training.date ? dayjs(training.date) : null}
                onChange={(newValue) => setTraining({ 
                    ...training, date: newValue ? newValue.toISOString() : "" })}
               slotProps={{ 
                textField: { 
                    fullWidth: true, 
                    variant: 'standard', 
                    margin: 'dense', 
                    required: true } }}
            />

            <TextField
                required
                margin="dense"
                label="Duration"
                value={training.duration}
                onChange={e => setTraining({ ...training, duration: parseInt(e.target.value) || 0 })}
                fullWidth
                variant="standard"
            />

            <TextField
                required
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={e => setTraining({ ...training, activity: e.target.value })}
                fullWidth
                variant="standard"
            />

            <Autocomplete
                options={customers}
                // Tell MUI to show "Firstname Lastname" in the list
                getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                // When a user picks a name, save the URL (href) to the state
                onChange={(_event, newValue) => {
                    setTraining({ ...training, customer: newValue ? newValue._links.self.href : "" });
                }}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Select Customer" 
                        variant="standard" 
                        margin="dense" 
                        required 
                    />
                )}
            />

        </LocalizationProvider>
        </DialogContent>
    );
}