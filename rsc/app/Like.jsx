'use client';

import { useState } from 'react';

export default function Like({ className }) {
	const [likes, setLikes] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	return (
		<button
			onClick={() => {
				setLikes(likes + 1);
				setIsLiked(!isLiked);
			}}
			className={`text-xl focus:outline-none ${className} ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600 transition-colors duration-200`}
		>
			♥ {likes}
		</button>
	);
}
