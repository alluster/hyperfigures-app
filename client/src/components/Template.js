import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import { device } from '../device';

const Hello = styled.div`
	@media ${device.laptop} {
	}
`;



const Component = () => {
	let { id } = useParams();
	const context = useContext(AppContext);
	useEffect(()  => {

	}, []);
	return (
		<Hello>
			
		</Hello>
	);
};

export default Component;