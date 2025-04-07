import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/user";

import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";

const schema = yup.object().shape({
    id: yup.string().required(),
    username: yup.string(),
    oldPassword: yup.string(),
    newPassword: yup.string(),
});

function ChangeCredentialsForm() {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...user }
    });

    const [message, setMessage] = useState("")

    const onSubmit = async data => {
        if (data.oldPassword) {
            data.passwordIsChanged = true;
        }

        dispatch(update({ newUser: data, session_reset: true }));

        if (data.passwordIsChanged) {
            request.get(apiRoutes.auth.logout);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" {...register("id")} />

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

export default ChangeCredentialsForm;
