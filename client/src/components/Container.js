import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	max-width: 1920px;
	margin-left: auto;
	margin-right: auto;
	@media ${device.laptop} {
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