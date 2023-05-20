import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Btns from './Btns';

import { useState } from 'react';

/*
	Prop drilling
	자식 요소에 특정 props전달하기 위한 용도로 쓰이는 현상
	단지 값을 전달하기 위해서 불필요하게 많은 컴포넌트를 거쳐야됨

	해결
	-useContext를 활용하여 각 컴포넌트들이 공유해야 될 값을 props로 전달하는것이 아닌 
	-store라는 외부 저장공간을 활용해서 어떤 컴포넌트에서든지 바로 전달하거나 공유할 수 있게 처리 (Redux)
	- useContext hook -> Redux -> Redux saga -> Redux toolkit -> mobx -> Recoil -> react query

	
*/
function Main({ menu }) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} menu={menu} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} pos={Pos[2]} />
			<Vids />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
