import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};

	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);
	//getLocalData함수의 리턴값으로 Posts 스테이트 초기화
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		setPosts([{ title: input.current.value, content: textarea.current.value }, ...Posts]);
		resetForm();
	};

	const deletePost = (delIndex) => {
		//삭제될 글의 순번이 delndex로 전달됨
		//Posts배열을 반복돌면서 현재 반복도는 순번과 삭제할 delIndex의 순번이 같지 않은 요소의 값만 배열로 deep copy해서 리턴
		//그렇게 리턴된 배열값을 setPosts로 기존 Posts스테이트에 저장
		if (!window.confirm('해당 게시물을 삭제하겠습니다?')) return;
		setPosts(Posts.filter((_, idx) => idx !== delIndex));
	};

	//post 수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (!Allowed) return;
		setAllowed(false);

		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = true;
				return post;
			})
		);
	};

	//post 출력모드 변경함수
	const disableUpdate = (editIndex) => {
		setPosts(
			Posts.map((post, postIndex) => {
				if (postIndex === editIndex) post.enableUpdate = false;
				return post;
			})
		);
		setAllowed(true);
	};

	//post 수정함수
	const updatePost = (editIndex) => {
		if (!editInput.current.value.trim() || !editTextarea.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, postIndex) => {
				//현재 반복되는 포스트 순번과 파라미터로 전달받은 수정할 포스트의 순번이 같으면
				if (postIndex === editIndex) {
					//해당 포스트의 객체값을 변경하고
					post.title = editInput.current.value;
					post.content = editTextarea.current.value;
					//해당 포스트를 출력모드 변경하게 속성값 수정
					post.enableUpdate = false;
				}
				//위에서 변경한 내용을 post객체 리턴
				//Posts가 반복될때 위의 변경된 객체값반 갱신
				return post;
			})
		);

		//수정 완료시 다른글 수정모드 진입가능하도록 변경
		setAllowed(true);
	};

	useEffect(() => {
		//Posts값이 변경될때마다 해당 데이터를 문자화해서 localStorage에 저장
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='3' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정모드 렌더링
								<>
									<div className='txt'>
										<input type='text' defaultValue={post.title} ref={editInput} />
										<br />
										<textarea
											cols='30'
											rows='3'
											defaultValue={post.content}
											ref={editTextarea}
										></textarea>
									</div>

									<nav className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATE</button>
									</nav>
								</>
							) : (
								//출력모드 렌더링
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>
									<nav className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</nav>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;

/*
	local Storage
	- 각 브라우저마다 가지고 있는 로컬 저장공간
	- 문자값만 저장가능 (문자값이 아닌 데이터는 강제로 문자화 시켜서 저장 json)
	- 5MB까지만 저장 가능한 경량의 저장 공간
	- {key: '문자열'}
	- localStorage.setItem({key:'value'}) - 값 저장
	- localStorage.getItem(key) - 값 불러오기
*/
