//npm i framer-motion@6
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, scale: 0, rotate: 70 }}
					animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -300, transition: { duration: 0.5 } }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ opcity: 0 }}
					>
						{props.children}
					</motion.div>

					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						//x, y, scale, rotate, opacity
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1, transition: { duration: 0.5, delay: 1 } }}
						exit={{ x: -100, opcity: 0 }}
					>
						Close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;
