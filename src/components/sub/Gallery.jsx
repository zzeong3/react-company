import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';
import { fetchFlickr } from '../../redux/flickrSlice';
import { useSelector, useDispatch } from 'react-redux';

function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickr.data);
	const [Loading, setLoading] = useState(true);
	const init = useRef(false);
	const [Index, setIndex] = useState(0);
	const modal = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);

	const showInterest = () => {
		dispatch(fetchFlickr({ type: 'interest' }));
		setLoading(true);
		frame.current.classList.remove('on');
	};

	const showUser = (name) => {
		dispatch(fetchFlickr({ type: 'user', user: name }));
		setLoading(true);
		frame.current.classList.remove('on');
	};

	const showSearch = () => {
		init.current = true;
		const resulte = input.current.value.trim();
		if (resulte === '') return alert('검색어를 입력해주세요');
		dispatch(fetchFlickr({ type: 'search', tags: resulte }));
		setLoading(true);
		frame.current.classList.remove('on');
		input.current.value = '';
	};

	//컴포넌트 마운트시 데이터호출 함수 실행
	useEffect(() => {
		if (Items.length === 0 && init.current) {
			dispatch(fetchFlickr({ type: 'user', user: '188875987@N03' }));
			frame.current.classList.remove('on');
			setLoading(true);
			return alert('해당 검색어의 결과 이미지가 없습니다.');
		}
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 1000);
	}, [Items]);

	/*
	keyDown : 키보드 누르는거
	keyup : 눌렀다떼는거 (맥에서 이벤트 2번 발생)
	keyPress : 키보드 눌렀다 떼는거 (특수문자 지원X)
	*/

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='controls'>
					<div className='searchBox'>
						<input type='text' placeholder='검색어를 입력하세요.' ref={input} onKeyPress={(e) => e.key === 'Enter' && showSearch()} />
						<button onClick={showSearch}>Search</button>
					</div>
					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={() => showUser('188875987@N03')}>My Gallery</button>
					</nav>
				</div>

				{Loading && <img src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loading bar' className='loader' />}

				<div className='frame' ref={frame}>
					{/* <Masonry elementType={'어떤태그로 풀리게 될지'} options=> */}
					<Masonry elementType={'div'} options={{ transitionDuration: '.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												modal.current.open();
												setIndex(idx);
											}}
										>
											<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
												}}
											/>
											<span onClick={(e) => showUser(e.target.innerText)}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>
			<Modal ref={modal}>
				<img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt={Items[Index]?.title} />
			</Modal>
		</>
	);
}

export default Gallery;
