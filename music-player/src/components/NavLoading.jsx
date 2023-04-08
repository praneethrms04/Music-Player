import React from "react";
import Skeleton from "react-loading-skeleton";

const NavLoading = () => {
	return (
		<div className='flex flex-col item-start gap-24 ml-27 mt-100 sm:ml-10 lg:gap-32'>
			<Skeleton height={30} width={90} borderRadius={"8rem"} />
			<Skeleton height={30} width={110} borderRadius={"8rem"} />
			<Skeleton height={30} width={120} borderRadius={"8rem"} />
			<Skeleton height={30} width={160} borderRadius={"8rem"} />
		</div>
	);
};

export default NavLoading;
