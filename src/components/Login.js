import React, { useState, useEffect } from "react";
import authService from "../auth/auth-service";
import { useHistory } from "react-router-dom";
import * as yup from 'yup'
import axios from "axios";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required")
})

const Login = (props) => {

    const history = useHistory();

    const [databaseErrors, setDatabaseErrors] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [formError, setFormError] = useState({
        username: '',
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
            username: formData.username,
            password: formData.password
        }

        axios.post("https://erhanba-71679337ef80.herokuapp.com/api/auth/login", newUser)
            .then((res) => {
                setDatabaseErrors("")
                localStorage.setItem("userinfo", JSON.stringify(res.data));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                history.push("/standings")
                window.location.reload();
            }).catch((err) => {
                console.log(err.response.data.message)
                setDatabaseErrors(err.response.data.message)
            })
    }

    console.log(buttonDisabled)



    return (
        <div className="login-register-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
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
                    <input className={`form-button`} type="submit" value="Login" disabled={buttonDisabled} />
                </p>

                <div className="form-errors" style={{ color: "red" }}>
                    <div>{formError.username}</div>
                    <div>{formError.password}</div>
                    <div>{databaseErrors}</div>
                </div>

            </form>
        </div>
    );
}

export default Login;