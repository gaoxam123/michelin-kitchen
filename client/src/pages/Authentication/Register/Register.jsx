import classNames from "classnames/bind"
import styles from './Register.module.css'

const cls = classNames.bind(styles)

import configRoutes from "../../../config/routes"
import { useInput } from "../../../hooks/useInput"
import { isEmail, isNotEmpty, hasMinLength } from "../../../utils/validation"
import Input from "../../../components/Input"
import { PermIdentity, Password, Email } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import Form from "../../../components/Form"
import CustomButton from "../../../components/CustomButton/CustomButton"

export default function Register() {
    const navigate = useNavigate()

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

        navigate(configRoutes.home)
    }

    const input = [
        <Input
            key={1}
            componentType="input"
            type="text"
            className="username"
            id="username"
            name="username"
            onChange={handleUsernameChange}
            value={enteredUsername}
            icon={<PermIdentity />}
            error={usernameInvalid && "Username is required"}
            onBlur={handleUsernameBlur} />,
        <Input
            key={2}
            componentType="input"
            type="password"
            className="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            value={enteredPassword}
            icon={<Password />}
            error={passwordInvalid && "Password must contain at least 8 characters"}
            onBlur={handlePasswordBlur} />,
        <Input
            key={3}
            componentType="input"
            type="email"
            className="email"
            id="email"
            name="email"
            onChange={handleEmailChange}
            value={enteredEmail}
            icon={<Email />}
            error={emailInvalid && "Invalid email"}
            onBlur={handleEmailBlur} />
    ]

    return (
        <div className={cls("wrapper")}>
            <div className={cls("container")}>
                <Form handleSubmit={handleSubmit} action="/register" method={"POST"} inputs={input} title={"Register"}>
                    <div className={cls("link-and-button")}>
                        <div className={cls("to-login")}><span><Link to="/login">Already have an account?</Link></span></div>
                        <div className={cls("buttons")}>
                            {/* <button type="button" onClick={handleReset} className="register-login-button">Reset</button> */}
                            <CustomButton style={{ border : "none", backgroundColor : "lightblue"}} title="Reset" onClick={handleReset} isButton={true} />
                            {/* <button className="register-login-button">Submit</button> */}
                            <CustomButton style={{ border : "none", backgroundColor : "lightblue"}} title="Submit" isButton={true} />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
