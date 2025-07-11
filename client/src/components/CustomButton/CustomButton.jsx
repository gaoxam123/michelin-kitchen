import classNames from "classnames/bind";
import styles from "./CustomButton.module.css";

const cls = classNames.bind(styles);

export default function CustomButton({
  icon,
  title = "NoText",
  className,
  active = false,
  onClick,
  isButton = false,
  ...props
}) {
  let Component = "div";
  if (isButton) {
    Component = "button";
  }
  return (
    <Component
      type={isButton ? "submit" : undefined}
      className={cls("wrapper", className)}
      onClick={onClick}
      {...props}
    >
      <div className={cls("button", { active: active })}>
        {icon && <div className={cls("icon")}>{icon}</div>}
        <span className={cls("title")}>{title}</span>
      </div>
    </Component>
  );
}
