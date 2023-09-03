import React, { useEffect, useState } from 'react';
import { AppContext } from './Context';
import PropTypes from 'prop-types';

const Provider = ({ children }) => {
	const [notifyMessage, setNotifyMessage] = useState('');
	const [appLocation, setAppLocation] = useState('');
	const [user, setUser] = useState();
	const [navigationOpen, setNavigationOpen] = useState(false);
	const [sideBarOpen, setSideBarOpen] = useState(true);
	const [path, setPath] = useState();

	useEffect(() => {
		localStorage.setItem('path', path);
		if(path != '/dashboard') setSideBarOpen(false);
		else{
			setSideBarOpen(true);
		}
	}, [path]);
	
	

	return (
		<AppContext.Provider
			value={{
				path,
				setPath,
				appLocation,
				setAppLocation,
				notifyMessage,
				setNotifyMessage,
				user,
				setUser,
				navigationOpen,
				sideBarOpen,
				setSideBarOpen,
				setNavigationOpen

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