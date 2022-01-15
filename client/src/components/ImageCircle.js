import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	height: 80px;
	width: 80px;
	border-radius: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: solid 1px ${props => props.theme.colors.gray_40};
	background-color: ${props => props.theme.colors.white};
	z-index: 100000;
	@media ${device.laptop} {
	}
`;

const Image = styled.img`
	object-fit: cover;
	height: 56px;
	width: 56px;
`;

const ImageCircle = ({image}) => {
	return (
		<Wrapper image={image}>
			<Image src={image} onError={(e) => {
				e.target.src = '/images/placeholder-logo.png'; // some replacement image
			}}/>
		</Wrapper>
	);
};

export default ImageCircle;