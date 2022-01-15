import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import StyledLink from './StyledLink';

const Wrapper = styled(StyledLink)`
	// margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	flex: 1 1 auto;
	
	position: relative;
	align-items: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_2};

	
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




const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
`;

const CardTitle = styled.h5`
	font-weight: bold;
`;

const ContentText = styled.h6`
	max-width: 100%;
`;

const IconContainer = styled.div`
	display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
	height: 100%;
	
`;

const Icon = styled(FontAwesomeIcon)`
	align-self: flex-start;
	font-size: 32px;	
	justify-content: flex-start;
	color: ${props => props.theme.colors.primary_100};
	margin: 16px;
	
	
`;

const TextItems = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	flex: 1 1 auto;
	row-gap: 24px;
	column-gap: 24px;
	align-items: center;

`;



const CardContract = ({
	id,
	title,
	start_date,
	end_date
}) => {

	const context = useContext(AppContext);




	useEffect(() => {
	}, []);
	return (
		<div>
			{

				<Wrapper to={`/contracts/${id}` || ''}>
					<Icon icon={faFileContract} />
					<TextItems>
						<TextContainer>
							<p>Sopimuksen nimi</p>
							<CardTitle>{title || '-'}</CardTitle>
						</TextContainer>
						<TextContainer>
							<p>Aloituspäivä</p>
							<ContentText>{moment(start_date).lang('fi').format('LL') || '-'}</ContentText>
						</TextContainer>
						<TextContainer>
							<p>Päättymispäivä</p>
							<ContentText>{moment(end_date).lang('fi').format('LL') || '-'}</ContentText>
						</TextContainer>

					</TextItems>

				</Wrapper>

			}
		</div>
	);
};

export default CardContract;