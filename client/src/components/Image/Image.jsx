import { defaultProfilePicture } from "../../config/imagesPaths"

import { useState } from "react"

import classNames from "classnames/bind"
import styles from "./Image.module.css"

const cls = classNames.bind(styles)

function Image({
    src,
    srcBase64,
    className,
    fallback = defaultProfilePicture
}) {
    if (srcBase64) {
        src = `data:image/jpeg;base64,${srcBase64}`
    }

    const [image, setImage] = useState(src)

    const handleError = () => setImage(fallback)

    return (
        <div>
            <img
                className={cls("wrapper", className)}
                src={image || fallback}
                onError={handleError}
            />
        </div>
    )
}

export default Image
