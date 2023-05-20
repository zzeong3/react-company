import axios from 'axios';
import Layout from '../common/Layout';
import { useEffect, useState } from 'react';

function Department() {
	const [Members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			setMembers(data.data.members);
		});
	}, []);

	return (
		<Layout name={'Department'}>
			{Members.map((member, idx) => {
				let style = { color: '#555' };
				if (idx === 2) style = { color: 'aqua' };

				return (
					<article key={idx}>
						<div className='pic'>
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
						</div>
						<h2 style={style}>{member.name}</h2>
						<p>{member.position}</p>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
