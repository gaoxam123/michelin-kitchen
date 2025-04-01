import classNames from "classnames/bind"
import styles from "./Image.module.css"
import { useState } from "react"

const cls = classNames.bind(styles)

function Image({
    src,
    className,
    fallback = "/profile_pics.jpg"
}) {
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
