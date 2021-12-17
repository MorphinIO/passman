import React, { Component, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import axios from 'axios'

class CreateAccount extends Component {
    constuctor() {
        this.setState({
            email: "",
        })
    }

    
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    
    
    render() {
        const navigate = useNavigate();
        return(
            <Grid container align="center" justify="center" spacing={2} xs={12}>
                <Grid item xs={5}>Kindly enter your email address</Grid>
                <Grid item xs={8}>
                    <TextField key="email" id="standard-basic" label="email" variant="standard" onChange={this.handleEmailChange} value={this.state.email}>

                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={async () => {
                        let response;
                        if (this.state.email.length > 0) {
                            response = await axios.post('/register', {
                                email: this.state.email
                            })
                        }
                        if (response) {
                            localStorage.setItem('email', this.state.email);
                            navigate.push('/setpassword')
                        }
                    }}>
                        Go
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default CreateAccount;