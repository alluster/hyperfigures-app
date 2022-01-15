import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Wrapper = styled.div`
	height: 80px;
	width: 80px;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${props => props.circleColor || 'gray'};
	z-index: 100000;
	@media ${device.laptop} {
	}
`;
const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.color};
	font-size: 24px;

`;

const IconCircle = ({
	iconColor,
	circleColor,
	icon
}) => {

	return (
		<Wrapper circleColor={circleColor}>
			<Icon icon={icon} color={iconColor} />
		</Wrapper>
	);
};

export default IconCircle;