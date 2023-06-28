import svgs from "@/util/Images";
import { FC } from "react";

export const LoadingView: FC<{ show: boolean; fixed?: boolean }> = ({
  show,
  fixed = false,
}) => {
  return (
    <>
      {show && (
        <div
          className={`${
            fixed ? "fixed-loader" : "inside-loader"
          } loader-container`}
        >
          {svgs.loading_circles}
        </div>
      )}
    </>
  );
};
export default LoadingView;
