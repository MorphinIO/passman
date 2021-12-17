import React, { Component, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import axios from 'axios'

class SetPassword extends Component {
    constructor() {
        this.setState({
            password: ""
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    render(){
        const navigate = useNavigate();
        return(
            <Grid container align="center" justify="center" spacing={2} xs={12}>
                <Grid item xs={5}>Kindly enter and or set your password</Grid>
                <Grid item xs={8}>
                    <TextField key="email" id="standard-basic" label="email" variant="standard" onChange={this.handlePasswordChange} value={this.state.password}>

                    </TextField>
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={async () => {
                        let response;
                        if (this.state.password.length > 0) {
                            response = await axios.post('http://localhost:8080/setpassword', {
                                email: localStorage.getItem('email'),
                                password: this.state.password
                            })
                        }
                        if (response) {
                            navigate.push('/loggedin')
                        }
                    }}>
                        Go
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default SetPassword;