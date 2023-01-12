import * as React from 'react';

import Container from '@mui/material/Container';
import HttpsIcon from '@mui/icons-material/Https';
import { FormControl, TextField, Typography, Button } from '@mui/material';

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const SignUp = () => {
    const [date, setDate] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setDate(newValue);
      };

    const postFetch = async (body) => {
        try {
            await fetch('http://localhost:3000/users/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(body)
                })
            window.location = "/"
        }
        catch(error) {
            console.log('POST error: ', error)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.elements.passwordInput.value !== e.target.elements.passwordValidation.value) {
            alert("Votre mot de passe n'est pas confirmé")
            return
        }
        const body = {
            userName: e.target.elements.nameInput.value,
            surname: e.target.elements.surnameInput.value,
            email: e.target.elements.emailInput.value,
            birthday: date,
            password: e.target.elements.passwordInput.value,
            admin: false
        }
        postFetch(body)
        e.target.reset()
        setDate(dayjs())
    }

    return (
        <Container maxWidth="xs" className='signIn-container' sx={{ mb: 5 }}>
            <div className='lock-background'>
                <HttpsIcon color="secondary"/>
            </div>
            <Typography variant='h5'>
                Inscription
            </Typography>
            <form id="form" onSubmit={(e) => handleSubmit(e)}>
                <FormControl fullWidth>
                <div className='signUp-name-surname-inputs'>
                    <TextField id="nameInput" fullWidth={false} sx={{mt: 2, }} variant='outlined' type='text' label="Prénom" required>
                    </TextField>
                    <TextField id="surnameInput" fullWidth={false} sx={{mt: 2}} variant='outlined' type="text" label='Nom' required>
                    </TextField>
                </div>
                    <TextField id="emailInput" sx={{mt: 2}} variant='outlined' type="email" label='Email' required>
                    </TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                    label="Date de naissance"
                    inputFormat="DD/MM/YYYY"
                    value={date}
                    onChange={handleChange}
                    renderInput={(params) => <TextField sx={{ mt: 2 }} {...params} />}
                    />
                </LocalizationProvider>
                    <TextField id="passwordInput" sx={{mt: 2}} variant='outlined' type="password" label='Mot de passe' required>
                    </TextField>
                    <TextField id="passwordValidation" sx={{mt: 2}} variant='outlined' type="password" label='Confirmer votre mot de passe' required>
                    </TextField>
                    <Button 
                        sx={{ mt: 2 }} 
                        color='info' 
                        variant="contained" 
                        type="submit">
                        S'inscrire
                    </Button>
                </FormControl>
            </form>
        </Container>
    );
}

export default SignUp;
