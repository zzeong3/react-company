import { useSelector } from 'react-redux';

function Pics({ Scrolled, pos }) {
	const currentPos = Scrolled - pos;
	const base = window.innerHeight / 2;
	const modified = currentPos + base;

	const Pics = useSelector((store) => store.flickr.data);
	console.log(Pics);

	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>
			<h2 style={{ transform: `translateX(${currentPos * 2}px)` }}>FLICKR</h2>
			{/* 기존 pos값에서 base값이 보정된 위치보다 현재 스크롤이 넘어가면 빼줘야 되는 현재 수치값에도 base값을 보정해서 적용 */}
			<article
				style={{
					opacity: `${Scrolled >= pos - base ? 1 - modified / 500 : 1}`,
					transform: `${Scrolled >= pos - base ? `translate(-50%,-50%) rotate(${modified}deg) scale(${1 + modified / 200})` : 'translate(-50%,-50%) rotate(0deg) scale(1)'}`,
				}}
			></article>

			<ul style={{ display: 'flex' }}>
				{Pics.map((pic, idx) => {
					if (idx >= 5) return null;
					return (
						<li key={idx}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
