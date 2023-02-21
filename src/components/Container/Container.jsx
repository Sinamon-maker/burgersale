import style from "./Container.module.css";
import classNames from "classnames";

export const Container = ({ children, styleName }) => {
  return (
    <div className={classNames(style.container, styleName)}>{children}</div>
  );
};
