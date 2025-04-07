import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";

import { useSelector } from "react-redux";

const schema = yup.object().shape({
    id: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
});

function UserForm() {
    const imageInputRef = useRef();

    const { user } = useSelector(state => state.user);

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { ...user }
    });

    const [message, setMessage] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);

    const onSubmit = async data => {
        const detailsChanged = Object.keys(data).some(key => data[key] !== user[key]);

        if (!detailsChanged && !profilePicture) {
            setMessage("No changed made!");
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

            await request.put(apiRoutes.users.base, data);

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

            <input placeholder="Username" {...register("username")} />
            {formState.errors.username && formState.errors.username.message}

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

            <button type="submit">
                Save changes
            </button>

            {message && message}
        </form>
    )
}

export default UserForm;
