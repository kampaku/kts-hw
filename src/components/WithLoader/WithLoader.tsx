import React from "react";

import styles from "./WithLoader.module.scss";
import { Loader } from "../Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <div>
      {loading ? (
        <div className={styles["with-loader"]}>
          <Loader className={styles["with-loader__loader"]} />
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
