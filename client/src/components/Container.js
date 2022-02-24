import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	max-width: 1500px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 400px;
	min-height: 100vh;
	padding-top: ${props => props.theme.grid.divider_2};
	padding-left: ${props => props.theme.grid.divider_10};
	padding-right: ${props => props.theme.grid.divider_2} ;
	@media ${device.laptop} {
		padding-left: ${props => props.theme.grid.divider_2};

	}
`;

const Container = ({ children }) => {
	return (
		<Wrapper>
			{children}
		</Wrapper>
	);
};

export default Container;