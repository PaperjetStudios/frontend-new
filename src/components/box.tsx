import classNames from "classnames";

type Props = {
  className?: string;
  style?: {};
  vcenter?: boolean;
  hcenter?: boolean;
  wrapper?: boolean;
  wrapperHCenter?: boolean;
  wrapperVCenter?: boolean;
  bg_img?: string;
  onClick?: () => void;
};

const Box: React.FC<Props> = ({
  children,
  className,
  style,
  vcenter,
  hcenter,
  wrapper,
  wrapperHCenter,
  wrapperVCenter,
  bg_img,
  onClick = null,
}) => {
  if (bg_img) {
    style = {
      ...style,
      backgroundImage: `url(${bg_img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  return (
    <div
      style={style}
      {...(onClick ? { onClick: onClick } : null)}
      className={classNames(className ? className : "", {
        flex: vcenter || hcenter,
        "justify-center": hcenter,
        "items-center": vcenter,
      })}
    >
      {wrapper && (
        <div
          className={classNames("max-w-wrapper w-full mx-5 lg:mx-0", {
            flex: vcenter || hcenter,
            "justify-center": wrapperHCenter,
            "items-center": wrapperVCenter,
          })}
        >
          {children}
        </div>
      )}
      {!wrapper && children}
    </div>
  );
};

export default Box;
