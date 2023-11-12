'use client'
import React, { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { FaAngleUp } from 'react-icons/fa';

const ScrollToTop = () => {
	const [scrollPosition, setScrollPosition] = useState(0);

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener('scroll', updatePosition);

		return () => window.removeEventListener('scroll', updatePosition);
	}, []);
	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	return (
		<AnimatePresence>
			{scrollPosition > 100 && (
				<motion.div
					className="fixed bottom-0 right-4 mb-6 flex justify-center cursor-pointer
					rounded-full bg-slate-300 p-2 shadow-sm dark:bg-neutral-300/75"
					onClick={goToTop}
					initial={{ scale: 0, opacity: 0 }}
					animate={{ scale: 1, opacity: 1, transition: { duration: 0.2 } }}
					exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
					whileHover={{
						scale: 1.1,
						transition: { duration: 0.2 },
					}}
					whileTap={{ scale: 1 }}
				>
					{<FaAngleUp size={20} className='text-white' />}
				</motion.div>
			)}
		</AnimatePresence>
	);
};
export default ScrollToTop;
