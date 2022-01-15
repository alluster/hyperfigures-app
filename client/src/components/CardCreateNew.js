import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
	// margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
    flex: 1 1 auto;
	position: relative;
	align-items: center;
	background-color: ${props => props.theme.colors.primary_100};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: ${props => props.theme.grid.divider_2};
	padding: ${props => props.theme.grid.divider_2};
	box-shadow:  8px 3px 5px -8px rgb(0 0 0 / 8%);
	white-space: nowrap;
	@media ${device.laptop} {
	}
`;

const Icon = styled(FontAwesomeIcon)`
	align-self: flex-start;
	font-size: 32px;	
	justify-content: flex-start;
	color: ${props => props.theme.colors.white};
	margin: 16px;
	
	
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: ${props => props.theme.colors.white};
	margin-left: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
`;

const CardTitle = styled.h4`
	font-weight: bold;
`;

const ContentText = styled.h6`
	max-width: 100%;
`;

const CardCreateNew = ({
	title,
	to
}) => {

	return (
		<Wrapper to={to || '/'}>
			<Icon icon={faPlusCircle} />
			<TextContainer>
				<CardTitle>{title || '-'}</CardTitle>
			</TextContainer>
		</Wrapper>
	);
};

export default CardCreateNew;