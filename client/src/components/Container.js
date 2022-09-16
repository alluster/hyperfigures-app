import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	z-index: 2;
	max-width: 1200px;
	margin-left: auto;
	margin-right: auto;
	min-height: 100vh;
	padding-bottom: 200px;
	padding-top: ${props => props.theme.grid.divider_4};
	padding-left: calc(220px + ${props => props.theme.grid.divider_2});
	padding-right: ${props => props.theme.grid.divider_2} ;
	@media ${device.laptop} {
		padding-left: ${props => props.theme.grid.divider_2};
		padding-top: ${props => props.theme.grid.divider_12}

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