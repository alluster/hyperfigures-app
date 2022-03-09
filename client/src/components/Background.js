import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Background = styled.div`
	position: absolute;
	z-index: 1;
	width: 100%;
	height: 100%;
	top: 0px;
	left: 0px;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;

	opacity: 1;
	@keyframes gradient {
		0% {
			background-position: 0% 50%;

		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
}
`;

const Container = ({ children }) => {
	return (
		<Wrapper>
			{children}
		</Wrapper>
	);
};

export default Background;