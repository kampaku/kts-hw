import React from "react";

import cn from "classnames";

import styles from "./Loader.module.scss";
export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  return (
    <>
      {loading && (
        <div
          className={cn(styles.loader, className, {
            [styles.loader_size_l]: size === LoaderSize.l,
            [styles.loader_size_m]: size === LoaderSize.m,
            [styles.loader_size_s]: size === LoaderSize.s,
          })}
        ></div>
      )}
    </>
  );
};
