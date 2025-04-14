import Image from "../Image";

import { useEffect, useState } from "react";
import { newlineToBr } from "../../utils/stringFormatter";

import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";
import { getProfilePictureURL } from "../../utils/getImages";

import classNames from "classnames/bind";
import styles from "./Comment.module.css"

const cls = classNames.bind(styles)

function Comment({ content, userId, commentDate }) {
    const [name, setName] = useState("Loading...");

    const text = newlineToBr(content);

    useEffect(() => {
        const fetchUserById = async (id) => {
            const response = await request.get(`${apiRoutes.users.base}/${id}`);
            const user = response.data;
            setName(`${user.firstName} ${user.lastName}`);
        }

        if (userId) {
            fetchUserById(userId);
        }
    }, [userId]);

    return (
        <div className={cls("wrapper")}>
            <Image src={getProfilePictureURL(userId)} className={cls("avatar")} />
            <div className={cls("content")}>
                <strong>{name}</strong>
                <p>{text}</p>
            </div>
        </div >
    )
}

export default Comment;
