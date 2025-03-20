import classNames from "classnames/bind"
import styles from './RegisterLogin.module.css'

const cls = classNames.bind(styles)

import { Link } from "react-router-dom"
import { PermIdentity, Password, Email } from "@mui/icons-material"
import Input from "./Input"
import { isEmail, isNotEmpty, hasMinLength } from "../../utils/validation"
import { useInput } from "../../hooks/useInput"

export default function Register({ login }) {
    const {
        value: enteredUsername,
        handleValueChange: handleUsernameChange,
        handleValueBlur: handleUsernameBlur,
        hasError: usernameInvalid,
        setEnteredValue: setEnteredUsername,
        setDidEditValue: setDidEditUsername
    } = useInput('', isNotEmpty)

    const {
        value: enteredPassword,
        handleValueChange: handlePasswordChange,
        handleValueBlur: handlePasswordBlur,
        hasError: passwordInvalid,
        setEnteredValue: setEnteredPassword,
        setDidEditValue: setDidEditPassword
    } = useInput('', (v) => hasMinLength(v, 8))

    const {
        value: enteredEmail,
        handleValueChange: handleEmailChange,
        handleValueBlur: handleEmailBlur,
        hasError: emailInvalid,
        setEnteredValue: setEnteredEmail,
        setDidEditValue: setDidEditEmail
    } = useInput('', isEmail)

    const handleReset = () => {
        setEnteredEmail('')
        setEnteredPassword('')
        setEnteredUsername('')
        setDidEditEmail(false)
        setDidEditPassword(false)
        setDidEditUsername(false)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (usernameInvalid || passwordInvalid || emailInvalid) {
            return
        }
    }

    return (
        <div className="container">
            <div className="img-container">
                <img src="logo.jpg" alt="" />
            </div>
            <div className="text"><h2>{login ? "Login" : "Sign Up"}</h2></div>
            <div className="form-container">
                <form onSubmit={handleSubmit} action="" className="form">
                    <Input
                        componentType="input"
                        type="text"
                        className="username"
                        id="username"
                        name="username"
                        onChange={handleUsernameChange}
                        value={enteredUsername}
                        icon={<PermIdentity />}
                        error={usernameInvalid && "Username is required"}
                        onBlur={handleUsernameBlur} />
                    <Input
                        componentType="input"
                        type="password"
                        className="password"
                        id="password"
                        name="password"
                        onChange={handlePasswordChange}
                        value={enteredPassword}
                        icon={<Password />}
                        error={passwordInvalid && "Password must contain at least 8 characters"}
                        onBlur={handlePasswordBlur} />
                    {!login &&
                        <Input
                            componentType="input"
                            type="email"
                            className="email"
                            id="email"
                            name="email"
                            onChange={handleEmailChange}
                            value={enteredEmail}
                            icon={<Email />}
                            error={emailInvalid && "Invalid email"}
                            onBlur={handleEmailBlur} />}
                    <div className="link-and-button">
                        {!login ? <div className="to-login"><span><Link to="/login">Already have an account?</Link></span></div> :
                            <div className="to-login"><span><Link to="/register">No account yet?</Link></span></div>}
                        {login && <div className="forgot-password"><span><Link>Forgot password?</Link></span></div>}
                        <div className="buttons">
                            <button type="button" onClick={handleReset} className="register-login-button">Reset</button>
                            <button className="register-login-button">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
