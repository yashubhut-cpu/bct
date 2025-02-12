import { Ellipsis } from "react-css-spinners";

export default function Loading({
  position = "center",
  color = "rgba(81,119,255,1)",
}) {
  const getStyles = () => {
    if (position === "center") {
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      };
    } else if (position === "top") {
      return {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      };
    }
    if (color === "white") {
      return {
        color: "white",
      };
    }
  };

  return (
    <div style={getStyles()}>
      <Ellipsis size={100} />
    </div>
  );
}
