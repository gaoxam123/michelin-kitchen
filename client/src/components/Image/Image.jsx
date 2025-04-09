import { defaultProfilePicture } from "../../config/imagesPaths"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

import classNames from "classnames/bind"
import styles from "./Image.module.css"

const cls = classNames.bind(styles)

function Image({
    src,
    srcBase64,
    className,
    fallback = defaultProfilePicture,
    to
}) {
    const navigate = useNavigate();

    if (srcBase64) {
        src = `data:image/jpeg;base64,${srcBase64}`
    }

    const [image, setImage] = useState(src)

    const handleError = () => setImage(fallback)

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    }

    return (
        <div onClick={handleClick}>
            <img
                className={cls("wrapper", className)}
                src={image || fallback}
                onError={handleError}
            />
        </div>
    )
}

export default Image
