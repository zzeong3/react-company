import { createSlice } from '@reduxjs/toolkit';
// 정적인 데이터를 전역 관리하기 때문에 createAsyncThunk 함수 불필요
export const menuSlice = createSlice({
	name: 'menu',
	initialState: {
		open: false,
	},
	// 비동기 데이터를 관리하는 것이 아니므로  extraReducers 아닌 reducers로 설정
	// extraReducers는 createAsyncThunk가 반환하는 액션객체의 상태 (요청, 성공, 실패)에 따라서 자동으로 값을 저장하는 반면
	// reducers는 초기 state 값을 변경해주는 함수를 직접 등록
	reducers: {
		close: (state) => {
			state.open = false;
		},
		toggle: (state) => {
			state.open = !state.open;
		},
	},
});

// state 변경함수 export
export const { close, toggle } = menuSlice.actions;
// 위의 함수를 통해서 변경되는 state값을 export(추후 index.js에서 store에 저장될 값)
export default menuSlice.reducer;
