import Layout from '../common/Layout';
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function Members() {
	//불필요한 메모이제이션을 피하는 방법
	//화면에 직접적으로 변경점을 야기시키지 않는 값들을 useRef를 통해서 저장하면
	//useRef로 저장된 값을 useEffect에 의존성배열에 등록할 필요가 없고
	//의존성 배열에 등록할 필요가 없는 값들은 메모이제이션을 할 필요가 없어짐
	//useRef자체가 한번 값을 저장한 다음 컴포넌트가 재랜더링되더라도 값을 유지시켜 주므로
	//일종의 메모이제이션 역할을 수행
	const history = useHistory();
	const Submit = useRef(false);
	const initVal = useRef({
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		interests: false,
		comments: '',
		edu: '',
	});
	const [Val, setVal] = useState(initVal.current);
	const [Err, setErr] = useState({});

	//Val State값을 인증처리해주는 함수
	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (
			value.pwd1.length < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일 주소는 8글자 이상 @를 포함하세요.';
		}
		if (!value.gender) {
			errs.gender = '성별을 체크해주세요.';
		}
		if (!value.interests) {
			errs.interests = '관심사를 하나이상 체크하세요.';
		}
		if (value.comments.length < 10) {
			errs.comments = '남기는 말은 10글자 이상 입력하세요.';
		}
		if (value.edu === '') {
			errs.edu = '최종학력을 선택하세요';
		}

		return errs;
	};

	//인풋 요소의 값이 변경될때마다 실행될 함수
	const handleChange = (e) => {
		//현재 입력하고 있는 input요소의 name, value값을 비구조할당으로 뽑아서 출력
		const { name, value } = e.target;
		//객체의 property를 대괄호로 묶으면 변수로 치환 가능
		setVal({ ...Val, [name]: value });
	};

	//라디오버튼 값이 변경될떄마다 실행될 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		const isChecked = e.target.checked;
		setVal({ ...Val, [name]: isChecked });
	};

	//체크요소를 반복돌면서 체크유무 확인 함수
	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스를 반복돌면서 하나라도 체크된게 있으면 true값을 변경후 리턴
		inputs.forEach((el) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	//셀렉트 요소 이벤트 함수
	const handleSelect = (e) => {
		const { name } = e.target;
		setVal({ ...Val, [name]: e.target.value });
	};

	//전송 이벤트 발생시 실행될 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit.current) {
			alert('모든 인증을 통과했습니다.');
			setVal(initVal);
			history.push('/');
		}
	}, [Err, history]);

	return (
		<Layout name={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										name='userid'
										id='userid'
										placeholder='아이디를 입력하세요.'
										onChange={handleChange}
										value={Val.userid}
									/>
									<br />
									<p className='err'>{Err.userid}</p>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										onChange={handleChange}
										value={Val.pwd1}
									/>
									<br />
									<p className='err'>{Err.pwd1}</p>
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										onChange={handleChange}
										value={Val.pwd2}
									/>
									<br />
									<p className='err'>{Err.pwd2}</p>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요'
										onChange={handleChange}
										value={Val.email}
									/>
									<br />
									<p className='err'>{Err.email}</p>
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' id='male' value='male' onChange={handleRadio} />

									<label htmlFor='female'>FeMale</label>
									<input
										type='radio'
										name='gender'
										id='famale'
										value='female'
										onChange={handleRadio}
									/>
									<br />
									<p className='err'>{Err.gender}</p>
								</td>
							</tr>

							{/* interests */}
							<tr>
								<th scope='row'>INTERESTS</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input
										type='checkbox'
										name='interests'
										id='sports'
										value='sports'
										onChange={handleCheck}
									/>

									<label htmlFor='music'>Music</label>
									<input
										type='checkbox'
										name='interests'
										id='music'
										value='music'
										onChange={handleCheck}
									/>

									<label htmlFor='game'>Game</label>
									<input
										type='checkbox'
										name='interests'
										id='game'
										value='game'
										onChange={handleCheck}
									/>
									<br />
									<p className='err'>{Err.interests}</p>
								</td>
							</tr>

							{/* edu */}
							<tr>
								<th scope='row'>
									<label htmlFor='edu'>Education</label>
								</th>
								<td>
									<select name='edu' id='edu' onChange={handleSelect}>
										<option value=''>최종학력을 선택하세요.</option>
										<option value='elementary-school'>초등학교 졸업</option>
										<option value='middle-school'>중학교 졸업</option>
										<option value='high-school'>고등학교 졸업</option>
										<option value='college'>대학교 졸업</option>
									</select>
									<p className='err'>{Err.edu}</p>
								</td>
							</tr>

							{/* comments */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>COMMENTS</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='3'
										placeholder='남기는 말을 입력하세요'
										onChange={handleChange}
										value={Val.comments}
									></textarea>
									<br />
									<p className='err'>{Err.comments}</p>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' onClick={() => setVal(initVal)} />
									<input type='submit' value='SEND' onClick={() => (Submit.current = true)} />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Members;
