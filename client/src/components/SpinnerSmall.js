import React from 'react';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import { device } from '../device';

const SpinnerContainer = styled.div`
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: auto;
		margin-right: auto;
		flex-direction: column;
		
			@media ${device.laptop} {
				width: 100%;
			}
	`;

	
const SpinnerSmall = () => {
	

	return (
		<SpinnerContainer>
			<PulseLoader color="#BDBDBD"/>
		</SpinnerContainer>

	);
};

export default SpinnerSmall;