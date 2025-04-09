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

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />

            <input placeholder="First Name" {...register("firstName")} />
            {formState.errors.firstName && formState.errors.firstName.message}

            <input placeholder="Last Name" {...register("lastName")} />
            {formState.errors.lastName && formState.errors.lastName.message}

            <input placeholder="Email" {...register("email")} />
            {formState.errors.email && formState.errors.email.message}

            <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
                }}
            />

            <input placeholder="Username" {...register("username")} />
            {formState.errors.username && formState.errors.username.message}

            <input
                type="password"
                placeholder="Old Password"
                {...register("oldPassword")}
            />
            {formState.errors.oldPassword && formState.errors.oldPassword.message}

            <input
                type="password"
                placeholder="New Password"
                {...register("newPassword")}
            />
            {formState.errors.newPassword && formState.errors.newPassword.message}


            <button type="submit">
                Save changes
            </button>

            {message && message}
        </form>
    )
}

export default UserForm;
