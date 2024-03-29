import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from "axios";
import Swal from "sweetalert2";

async function auth(formData) {
    return await axios.post(
        "https://lists-backend-web.herokuapp.com/api/signup/",
        formData
    ).then(response => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

const Signup = ({ setToken }) => {
    const [validated, setValidated] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const formData = new FormData();

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        setValidated(true);

        formData.append("username", username);
        formData.append("password", password);

        const data = await auth(formData);

        if (data?.token){
            window.location.href = "https://alberto512.github.io/ListsWeb/"

            setToken(data.token);
        } else if(data?.username[0] === "A user with that username already exists.") {
            Swal.fire({
                title: "Oops...",
                text: "A user with that username already exists",
                icon: "error",
                willClose: () => {
                  window.location.reload(false);
                },
              });
        } else {
            Swal.fire({
                title: "Oops...",
                text: "Something went wrong",
                icon: "error",
                willClose: () => {
                  window.location.reload(false);
                },
            });
        }
    };

    return (
        <React.Fragment>
            <br/>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
            </Form>
        </React.Fragment>
    );
};

export default Signup;