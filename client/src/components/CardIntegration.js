import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
	display: flex;
    flex: 1 1 auto;
	position: relative;
	align-items: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
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
	color: ${props => props.theme.colors.primary_100};
	margin: 16px;
	
	
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

const CardIntegration = ({
	title,
	start_software,
	end_software
}) => {

	return (
		<div>
			{

				<Wrapper >
					<Icon icon={faGlobe} />
					<TextContainer>
						<p>Integraation nimi</p>
						<CardTitle>{title || '-'}</CardTitle>
					</TextContainer>
					<TextContainer>
						<p>Lähtösovellus</p>
						<ContentText>{start_software || '-'}</ContentText>
					</TextContainer>
					<Icon icon={faArrowAltCircleRight} />
					<TextContainer>
						<p>Saapumissovellus</p>
						<ContentText>{end_software || '-'}</ContentText>
					</TextContainer>
				</Wrapper>

			}
		</div>
	);
};

export default CardIntegration;