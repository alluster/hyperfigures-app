import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { useParams } from 'react-router-dom';
import { device } from '../device';
import ImageCircle from './ImageCircle';
import IconCircle from './IconCircle';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import StyledLink from './StyledLink';

const Wrapper = styled(StyledLink)`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
    flex: 1 1 auto;
	position: relative;
	align-items: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	padding-left: ${props => props.theme.grid.divider_2};
	padding-top: ${props => props.theme.grid.divider_2};
	padding-bottom: ${props => props.theme.grid.divider_2};

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

const CardTitle = styled.h5`
	font-weight: bold;
`;
const CardType = styled.h6`

`;


const Card = ({ 
	to, 
	cardType, 
	title, 
	description, 
	image, 
	category,
	type 
}) => {
	const [isLoading, setIsLoading] = useState(false);
	let { id } = useParams();
	const context = useContext(AppContext);

	const CircleColorSelector = async () => {
	

		const result = context.practiceCategory.filter(item => item.name === category || 'sales');
		return (
			await result[0].circleColor 
		);
	};
	const selectedCard = () => {
		const IconSelector = async () => {

			const result = context.practiceCategory.filter(item => item.value === category || 'sales');
			return (
				await result[0].icon
			);
		};
		switch (cardType) {
 

		case 'practice': return <Wrapper  to={to || ''}>
		
			<IconCircle
				// circleColor={CircleColorSelector(category || "sales") }
				// iconColor={IconColorSelector(category || "sales")}
				icon={IconSelector()}
			/>
				
				
			<TextContainer>
				<p>{type || 'Ydintoiminto'}</p>
				<CardTitle>{title || ''}</CardTitle>
			</TextContainer>

		</Wrapper>;
		case 'application': return <Wrapper  to={to || ''}>
			<ImageCircle image={image || '/images/microsoft.png'} />
			<TextContainer >
				<p>{description || 'Ydintoiminto'}</p>
				<h5>{title || ''}</h5>
			</TextContainer>

		</Wrapper>;
		case 'link': return <Wrapper  to={to || ''}>
			<IconCircle
				circleColor={circleColor || '#FFC7EE'}
				iconColor={iconColor || '#FE45C6'}
				icon={icon || ['fas', 'comment']}
			/>			

			<TextContainer >
				<p>{description || ''}</p>
				<h5>{title || ''}</h5>
			</TextContainer>
		</Wrapper>;
		default: return <Wrapper  to={to || ''}>
			<IconCircle
				circleColor="#FFC7EE"
				iconColor="#FE45C6"
				icon={faComment}
			/>

			<TextContainer>
				<p>{description || ''}</p>
				<h5>{title || ''}</h5>
			</TextContainer>
		</Wrapper>;
		}
	};

	useEffect(() => {

	}, []);
	return (
		<div>
			{
		
				<div>
					{selectedCard()}
				</div>

			}
		</div>
	);
};

export default Card;