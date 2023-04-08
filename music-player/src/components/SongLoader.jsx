import React from "react";
import Skeleton from "react-loading-skeleton";

const SongsLoading = () => {
  return (
    <div className="pt-20 flex flex-col gap-10 sm:gap-20 lg:flex-row">
      {Array(8)
        .fill(0)
        .map((_, id) => (
          <div
            key={id}
            className="flex items-center justify-between px-40 sm:px-20 lg:px-60"
          >
            <div
              className="flex items-center gap-8 sm:gap-4 lg:gap-12"
            >
              <Skeleton circle height={55} width={55} borderRadius={"8rem"} />
              <div>
                <Skeleton height={26} width={200} borderRadius={"8rem"} />
                <Skeleton height={20} width={150} borderRadius={"8rem"} />
              </div>
            </div>
            <Skeleton height={20} width={50} borderRadius={"8rem"} />
          </div>
        ))}
    </div>
  );
};

export default SongsLoading;
