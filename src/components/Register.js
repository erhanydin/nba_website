import React, { useState, useEffect } from "react";
import authService from "../auth/auth-service";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required("Name is required").min(6, "Your name should contain min 6 chars"),
    username: yup.string().required("Username is required").min(3, "Your username should contain min 6 chars").max(10, "Your username should contain max 10 chars"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    password: yup.string().required("Password is required").min(8, "Your password should contain min 8 chars"),
})

const Register = (props) => {

    const history = useHistory();

    const [databaseErrors, setDatabaseErrors] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    const [formError, setFormError] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        schema.isValid(formData).then((valid) => setButtonDisabled(!valid));
    }, [formData])

    const checkFormErrors = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => {
                setFormError({
                    ...formError,
                    [name]: ""
                })
            })
            .catch((err) => {
                console.log("hata: ", err)
                setFormError({
                    ...formError,
                    [name]: err.errors[0]
                })
            })

    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        checkFormErrors(name, value);

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: formData.name.trim(),
            username: formData.username,
            email: formData.email,
            password: formData.password,
        }

        axios.post("https://erhanba-71679337ef80.herokuapp.com/api/auth/register", newUser)
            .then((res) => {
                setDatabaseErrors("")
                history.push("/login")
            }).catch((err) => {
                console.log(err.response.data.message)
                setDatabaseErrors(err.response.data.message)
            })
    }

    console.log(buttonDisabled)



    return (
        <div className="login-register-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <div>
                    <label>
                        <div className="span-container"><span>Name and Surname: </span></div>
                        <input
                            className="inputs"
                            type="text"
                            name="name"
                            placeholder="Please enter your name and your surname"
                            value={formData.name}
                            onChange={handleFormChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div className="span-container"><span>Username: </span></div>
                        <input
                            className="inputs"
                            type="text"
                            name="username"
                            placeholder="Please enter a username"
                            value={formData.username}
                            onChange={handleFormChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div className="span-container"><span>Email: </span></div>
                        <input
                            className="inputs"
                            type="email"
                            name="email"
                            placeholder="Please enter your email"
                            value={formData.email}
                            onChange={handleFormChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div className="span-container"><span>Password: </span></div>
                        <input
                            className="inputs"
                            type="password"
                            name="password"
                            placeholder="Please enter your password"
                            value={formData.password}
                            onChange={handleFormChange}
                        />
                    </label>
                </div>
                <p>
                    <input className={`form-button`} type="submit" value="Register" disabled={buttonDisabled} />
                </p>

                <div className="form-errors" style={{ color: "red" }}>
                    <div>{formError.name}</div>
                    <div>{formError.username}</div>
                    <div>{formError.email}</div>
                    <div>{formError.password}</div>
                    <div>{databaseErrors}</div>
                </div>

            </form>
        </div>
    );
}

export default Register;