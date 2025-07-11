import classNames from "classnames/bind";
import styles from "./Login.module.css";

const cls = classNames.bind(styles);

import configRoutes from "../../../config/routes";
import { useInput } from "../../../hooks/useInput";
import { isNotEmpty, hasMinLength } from "../../../utils/validation";
import Input from "../../../components/Input";
import { PermIdentity, Password } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../../../components/Form";
import CustomButton from "../../../components/CustomButton";
import { login } from "../../../store/user";
import { useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || configRoutes.home;

  const {
    value: enteredUsername,
    handleValueChange: handleUsernameChange,
    handleValueBlur: handleUsernameBlur,
    showErrorMessage: showErrorMessageUsername,
    hasError: usernameHasError,
    setEnteredValue: setEnteredUsername,
    setDidEditValue: setDidEditUsername,
  } = useInput("", isNotEmpty);

  const {
    value: enteredPassword,
    handleValueChange: handlePasswordChange,
    handleValueBlur: handlePasswordBlur,
    showErrorMessage: showErrorMessagePassword,
    hasError: passwordHasError,
    setEnteredValue: setEnteredPassword,
    setDidEditValue: setDidEditPassword,
  } = useInput("", (v) => hasMinLength(v, 8));

  const handleReset = () => {
    setEnteredPassword("");
    setEnteredUsername("");
    setDidEditPassword(false);
    setDidEditUsername(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (usernameHasError || passwordHasError) {
      return;
    }

    await dispatch(
      login({
        username: enteredUsername,
        password: enteredPassword,
      })
    );
    navigate(
      from !== configRoutes.login && from !== configRoutes.register
        ? from
        : configRoutes.home,
      { replace: true }
    );
  };

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
      onBlur={handleUsernameBlur}
    />,
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
      error={
        showErrorMessagePassword &&
        "Password must contain at least 8 characters"
      }
      onBlur={handlePasswordBlur}
    />,
  ];

  return (
    <div className={cls("wrapper")}>
      <div className={cls("container")}>
        <Form
          handleSubmit={handleSubmit}
          action="/register"
          method={"POST"}
          inputs={input}
          title={"Login"}
        >
          <div className={cls("link-and-button")}>
            <div className={cls("to-register")}>
              <span>
                <Link to="/register">No account yet?</Link>
              </span>
            </div>
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
  );
}
