import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import moment from 'moment';

import StyledLink from './StyledLink';

const Wrapper = styled(StyledLink)`
	display: flex;
	margin-top: ${props => props.theme.grid.divider_4};
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
	margin-left: ${props => props.theme.grid.divider_4};
	margin-right: ${props => props.theme.grid.divider_2};
`;

const CardTitle = styled.h5`
	font-weight: bold;
`;



const ProjectCard = ({
	to,
	title,
	practice,
	start_date,
	end_date
}) => {

	const context = useContext(AppContext);


	


	useEffect(() => {
	}, []);
	return (
		<div>
			{

				<Wrapper to={to || ''}>
				
					<TextContainer>
						<p>Projektin nimi</p>
						<CardTitle>{title || '-'}</CardTitle>
					</TextContainer>
					
					<TextContainer>
						<p>Aloituspäivä</p>
						<h5>{moment(start_date).lang('fi').format('LL') || '-'}</h5>
					</TextContainer>
					<TextContainer>
						<p>Lopetuspäivä</p>
						<h5>{moment(end_date).lang('fi').format('LL') || '-'}</h5>
					</TextContainer>
				</Wrapper>

			}
		</div>
	);
};

export default ProjectCard;