import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled, setPos }) {
	console.log('btns');
	const [Num, setNum] = useState(0);
	const btnRef = useRef(null);
	const pos = useRef([]);

	//브라우저 리사이즈 호출되며 각 섹션별 세로 위치값 연산 함수
	const getPos = useCallback(() => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	//브라우저 스크롤시 호출되며 현재 스크롤 위치값에 따라 조건문으로 버튼활성화 함수
	const activation = useCallback(() => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, [getPos, activation]);

	return (
		<ul className='scroll_navi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let isOn = '';
					idx === 0 && (isOn = 'on');
					return (
						<li
							className={isOn}
							key={idx}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default memo(Btns);

/*
	eslint가 의존성 배열에 activation, getPos함수를 등록하고 권고문구를 띄우는 이유
	- useEffect내부에서 getPos, activation이라는 외부함수를 사용하고 있으므로 리액트 입장에서는 해당함수가 변경될수도 있을때를 대비해서 의존성 배열에 등록할 것을 권고
	- 이때 activation, getPos를 의존성 배열에 등록하면 해당 컴포넌트가 업데이트 될때마다 같은 함수임에도 불구하고 계속 호출하므로 불필요한 리소스가 낭비
	- 추후 useCallback을 이용해서 해당 activation, getPos함수를 미리 메모이제이션처리 (메모리에 강제로 특정 값을 할당해서 저장처리)
	- 메모이제이션 된 요소는 컴포넌트가 재호출되더라도 미리 메모리에 저장된 값을 재사용 (memo, useMemo, useCallback)
*/
