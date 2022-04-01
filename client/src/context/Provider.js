import React, { useState, useEffect } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';
import axios from 'axios';

const Provider = ({ children }) => {
	const [notifyMessage, setNotifyMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const [appLocation, setAppLocation] = useState("")
	const [user, setUser] = useState();
	// Delete functions 

	const Delete = async () => {
		setLoading(true);
		try {
			await axios.post('/api/delete', { id: id });
			GetFiles();
			setNotifyMessage('poistettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!', err);
		}
		finally {
			setLoading(false);
		}
	};


	// Insert functions:

	const InsertSomething = async ({

	}) => {
		setLoading(true);
		try {
			await axios.post('/api/insertSomething', {

			});

			setNotifyMessage('tallennettu!');
		}
		catch (err) {
			console.log(err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen!', err);
		}
		finally {
			setLoading(false);
		}
	};



	// Get functions

	const GetSomething = async () => {
		setLoading(true);
		try {
			const response = await axios.post('/api/getSomething', {

			});
			setSomething(response.data.data);
		}
		catch (err) {
			console.log('Fetching failed:', err);
		}
		finally {
			setLoading(false);
		}
	};


	useEffect(() => {

	}, []);
	return (
		<AppContext.Provider
			value={{
				appLocation,
				setAppLocation,
				notifyMessage,
				setNotifyMessage,
				user,
				setUser

			}}
		>
			{children}
		</AppContext.Provider>
	);
};

Provider.propTypes = {
	children: PropTypes.any
};

export default Provider;