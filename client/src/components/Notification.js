import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import '../css/ReactToastify.css';

const Notification = () => {
	const { notifyMessage } = useContext(AppContext);
	const FireMessage = () => {
		if (notifyMessage != '') {
			toast(`${notifyMessage}`);
		}
	};
	useEffect(() => {
		FireMessage();
	}, [notifyMessage]);
	return (
		<ToastContainer />
	);
};

export default Notification;