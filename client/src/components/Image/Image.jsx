import classNames from "classnames"
import styles from "./Image.module.css"
import { useState } from "react"

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
                className={classNames(styles.wrapper, className)}
                src={image || fallback}
                onError={handleError}
            />
        </div>
    )
}

export default Image
