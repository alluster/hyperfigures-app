import React, { useState } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';

const Provider = ({ children }) => {
	const [notifyMessage, setNotifyMessage] = useState('');
	const [appLocation, setAppLocation] = useState('');
	const [user, setUser] = useState();
	// Delete functions 


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