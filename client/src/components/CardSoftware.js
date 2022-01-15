import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';

import StyledLink from './StyledLink';

const Wrapper = styled(StyledLink)`
	// margin-top: ${props => props.theme.grid.divider_2};
	// margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex: 1 1 auto;
	// min-height: 144px;
	position: relative;
	align-items: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_4};
	
	
	box-shadow:  8px 3px 5px -8px rgb(0 0 0 / 8%);
	white-space: nowrap;
	&:hover {
		transition: box-shadow 0.2s,  top 0.2s ease-out;
		top: -1px;
		box-shadow: 1px 1px 2px 2px  rgb(0 0 0 / 4%);
		cursor: pointer;
	}
	@media ${device.laptop} {
	}
`;


const DividerLine = styled.div`
	border: 1px solid ${props => props.theme.colors.gray_40};
	margin-top: 20px;
	position: absolute;
	width: 100%;
	margin-left: -16px;
	z-index: 1

`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
`;

const CardTitle = styled.h4`
	font-weight: bold;
`;



const CardSoftware = ({

	supplier,
	title,
	to
}) => {

	const context = useContext(AppContext);


	useEffect(() => {
	}, []);
	return (
		<div>
			{

				<Wrapper to={to || ''}>
					<TextContainer>

						<p>{supplier || '-'}</p>
						<CardTitle>{title || ''}</CardTitle>

					</TextContainer>
				</Wrapper>

			}
		</div>
	);
};

export default CardSoftware;