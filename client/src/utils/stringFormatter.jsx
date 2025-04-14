import { Fragment } from "react";

export const newlineToBr = text => text.split("\n").map(
    (item, index) => (
        <Fragment key={index}>
            {item}
            {index !== text.split('\n').length - 1 && <br />}
        </Fragment>
    )
);
