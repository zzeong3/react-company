import { forwardRef, useImperativeHandle, useState } from 'react';

const Child = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	return (
		<>
			{Open && (
				<article ref={ref}>
					<h1>Child</h1>
					<button onClick={() => setOpen(false)}>닫기</button>
				</article>
			)}
		</>
	);
});

export default Child;
