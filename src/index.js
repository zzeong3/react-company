import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import youtubeReducer from './redux/youtubeSlice';
import flickrReducer from './redux/flickrSlice';
import menuReducer from './redux/menuSlice';

const store = configureStore({
	reducer: {
		youtube: youtubeReducer,
		flickr: flickrReducer,
		menu: menuReducer,
	},
});

ReactDOM.render(
	<HashRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</HashRouter>,
	document.getElementById('root')
);

/*
	redux saga vs redux-toolkit

	redux saga
		- 비동기 데이터를 호출 및 리듀서 상태변경 관련 함수를 saga에서 generator함수를 통해 동기화 처리
		- 컴포넌트 외부에서 독립적으로 비동기 데이터를 전역관리하기 위한 라이브러리

	redux-thunk
		- action

	redux-toolkit
		- redux-thunk 기반의 통합 라이브러리
		- 기존 action 객체 생성을 slice라는 파일형태로 컴포넌트 외부에서 간단하게 설정가능
*/
