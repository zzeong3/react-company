import Child from './Child';
import { useRef } from 'react';

function Parent() {
	const childEl = useRef(null);
	//미션 - 유튜브 컴포넌트의 모달창을 forwardRef형식으로 변경 (40분 까지)
	return (
		<section>
			<button onClick={() => childEl.current.open()}>열기</button>
			<h1>Parent</h1>

			<Child ref={childEl} />
		</section>
	);
}

export default Parent;

/*
	가상돔 요소가 아닌 컴포넌트는 useRef로 참조 불가능
	
	forwardRef
	- 자식컴포넌트 자체를 참조해서 부모로 전달

	useImperativeHandle
	- 자식 컴포넌트 안쪽에서 특정 객체값을 부모로 전달
*/
