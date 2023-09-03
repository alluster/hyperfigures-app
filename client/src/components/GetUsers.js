import React, { useEffect, useState } from 'react';

import { useQuery } from '@apollo/client';
import { LOAD_USERS } from '../GraphQL/Queries';

const GetUsers = () => {
	const [users, setUsers] = useState([]);
	const { error, loading, data } = useQuery(LOAD_USERS);
	const Users = () => {
		return (
			users.map((item, i) => { return (<p key={i}>{item.first_name}</p>); })
		);
	};
	useEffect(() => {
		Users();
		if (data) {
			setUsers(data.getAllUsers);

		}
	}, [data]);
	return (
		<div>
			{Users()}
		</div>
	);
};

export default GetUsers;