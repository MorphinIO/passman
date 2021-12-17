import React, { Component, Fragment } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import axios from 'axios'

class CreateAccount extends Component {
    constuctor() {
        this.setState({
            entries: [],
        })
    }

    async componentDidMount() {
        let response = await axios.get('/records')
        this.setState({
            ...this.state,
            entries: response.entries
        })
    }

    
    
    render() {
        const navigate = useNavigate();
        return(
            <Grid container align="center" justify="center" spacing={2} xs={12}>
                <Grid item xs={5}>Select an entry to view your password</Grid>
                <Grid item xs={8}>
                    {this.state.entries.map(item => (
                        <div>
                            <div>
                                Title: {item.title}
                            </div>
                            <div>
                                Email: {item.email}
                            </div>
                            <div>
                                Password: {item.password}
                            </div>
                            <Button variant="contained" color="primary" onClick={() => {
                                //make request to get password, then show popup with password
                            }}>
                                show
                            </Button>
                        </div>
                    ))}
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" color="primary" onClick={async () => {
                        //make the user logout and send back to homepage
                        axios.get('http://localhost:3000/logout');
                        navigate.push('/');
                    }}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        )
    }
}

export default CreateAccount;