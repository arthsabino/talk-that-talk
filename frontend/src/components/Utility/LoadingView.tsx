import svgs from "@/lib/Images";
import { FC } from "react";

export const LoadingView: FC<{
  show: boolean;
  fixed?: boolean;
  spinner?: boolean;
}> = ({ show, fixed = false, spinner = false }) => {
  return (
    <>
      {show ? (
        <div
          className={`${fixed ? "fixed-loader" : "inside-loader"} ${
            spinner ? "spinner" : ""
          } loader-container`}
        >
          {spinner ? svgs.spinner : svgs.loading_circles}
        </div>
      ) : null}
    </>
  );
};
export default LoadingView;
