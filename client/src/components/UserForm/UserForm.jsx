import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/user";
import routes from "../../config/routes";

import classNames from "classnames/bind";
import styles from "./UserForm.module.css";

const cls = classNames.bind(styles)

const schema = yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string().required("First Name is empty!"),
    lastName: yup.string().required("Last Name is empty!"),
    email: yup.string().email().required("Email is empty!"),

    username: yup.string().required("Username is empty!"),
    oldPassword: yup.string(),
    newPassword: yup.string(),
});

function UserForm() {
    const navigate = useNavigate();

    const imageInputRef = useRef();

    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...user }
    });

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const [message, setMessage] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const onSubmit = async data => {
        const detailsChanged = Object.keys(data).some(key => data[key] !== user[key]);

        if (!detailsChanged && !profilePicture && !data.oldPassword) {
            setMessage("No changes made!");
            return;
        }

        try {

            if (profilePicture) {
                const form = new FormData();
                form.append("image", profilePicture);
                await request.post(
                    `${apiRoutes.users.base}/${user.id}/edit-profile-picture`,
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                setProfilePicture(null);
                imageInputRef.current.value = '';
            }

            if (data.oldPassword) {
                data.passwordIsChanged = true;
            }
            await dispatch(update({
                newUser: data,
                session_reset: data.passwordIsChanged
            })).unwrap();

            setMessage("Update successful!")

            if (data.passwordIsChanged || data.email !== user.email) {
                request.post(apiRoutes.auth.logout);
                navigate(routes.login);
            }
        } catch (e) {
            setMessage(e);
        }
    };

    const inputItems = [
        {
            text: "First Name",
            name: "firstName",
        },
        {
            text: "Last Name",
            name: "lastName",
        },
        {
            text: "Email",
            name: "email",
        },
        {
            text: "Username",
            name: "username",
        },
        {
            text: "Old password",
            name: "oldPassword",
        },
        {
            text: "New password",
            name: "newPassword",
        },
    ];

    return (
        <>
            <h1>Edit User Detail</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register("id")} />

                {inputItems.map(item => (
                    <div key={item.name} className={cls("form-group")}>
                        <label className={cls("input-text")} for={item.name}>{`${item.text}:`}</label>
                        <input id={item.name} className={cls("input")} placeholder={item.text} {...register(item.name)} />
                        {formState.errors[item.name] &&
                            <span className={cls("error")}>{formState.errors[item.name].message}</span>
                        }
                    </div>
                ))}

                <div className={cls("form-group")}>
                    <label className={cls("input-text")} for="image">Upload new profile picture:</label>
                    <input
                        ref={imageInputRef}
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
                        }}
                    />
                </div>

                <button type="submit" className={cls("submit-button")}>
                    Save changes
                </button>

                {message && message}
            </form>
        </>
    )
}

export default UserForm;
