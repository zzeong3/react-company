import { Route, Switch } from 'react-router-dom';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';
import Parent from './Parent';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', user: '188875987@N03' }));
	}, [dispatch]);

	return (
		<>
			<Switch>
				{/* 각 메인, 서브페이지의 Header컴포넌트에 props로 전달 */}
				<Route exact path='/' render={() => <Main />} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />
			<Route path='/parent' component={Parent} />
			<Footer />
			<Menu />
		</>
	);
}

export default App;
