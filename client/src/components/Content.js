import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	padding-left: ${props => props.theme.grid.divider_8} ;
	margin: ${props => props.theme.grid.divider_4} ;
	@media ${device.laptop} {
	}
`;

const Content = ({ children }) => {
	return (
		<Wrapper>
			{children}
		</Wrapper>
	);
};

export default Content;