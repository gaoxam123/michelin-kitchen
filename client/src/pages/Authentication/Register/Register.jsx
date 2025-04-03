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
import { register } from "../../../store/user"
import { useDispatch } from 'react-redux'

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        value: enteredUsername,
        handleValueChange: handleUsernameChange,
        handleValueBlur: handleUsernameBlur,
        showErrorMessage: showErrorMessageUsername,
        hasError: usernameHasError,
        setEnteredValue: setEnteredUsername,
        setDidEditValue: setDidEditUsername
    } = useInput('', isNotEmpty)

    const {
        value: enteredPassword,
        handleValueChange: handlePasswordChange,
        handleValueBlur: handlePasswordBlur,
        showErrorMessage: showErrorMessagePassword,
        hasError: passwordHasError,
        setEnteredValue: setEnteredPassword,
        setDidEditValue: setDidEditPassword
    } = useInput('', (v) => hasMinLength(v, 8))

    const {
        value: enteredEmail,
        handleValueChange: handleEmailChange,
        handleValueBlur: handleEmailBlur,
        showErrorMessage: showErrorMessageEmail,
        hasError: emailHasError,
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

        if (usernameHasError || passwordHasError || emailHasError) {
            return
        }

        navigate(configRoutes.home)
        dispatch(register({
            email: enteredEmail,
            username: enteredUsername,
            password: enteredPassword,
            // TODO: Add input fields for first-lastname
            firstName: "Max",
            lastName: "Mustermann",
        }))
        navigate(configRoutes.login)
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
            error={showErrorMessageUsername && "Username is required"}
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
            error={showErrorMessagePassword && "Password must contain at least 8 characters"}
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
            error={showErrorMessageEmail && "Invalid email"}
            onBlur={handleEmailBlur} />,
    ]

    return (
        <div className={cls("wrapper")}>
            <div className={cls("container")}>
                <Form handleSubmit={handleSubmit} action="/register" method={"POST"} inputs={input} title={"Register"}>
                    <div className={cls("link-and-button")}>
                        <div className={cls("to-login")}><span><Link to="/login">Already have an account?</Link></span></div>
                        <div className={cls("buttons")}>
                            <CustomButton
                                className={cls("submit-btn")}
                                title="Submit"
                                isButton
                            />
                            <CustomButton
                                className={cls("reset-btn")}
                                title="Reset"
                                onClick={handleReset}
                                isButton
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}
