import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_8};
	display: flex;
	flex-direction: row;
	flex-wrap: no-wrap;
	height: 100%;
	max-height: 200px;
	position: relative;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: ${props => props.theme.grid.divider_2};
	padding: ${props => props.theme.grid.divider_2};
	box-shadow:  8px 3px 5px -8px rgb(0 0 0 / 8%);
	@media ${device.laptop} {
		width: calc(50% - 48px);

	}
`;




const ImageContainer = styled.div`
	max-width: 200px;
	height: 100%;
	background-repeat: no-repeat;
	border-radius: 16px 0px 0px 16px;
	padding: 16px;
`;

const Image = styled.img`
	max-height: 100%;
	border-radius: 16px 0px 0px 16px;
	object-fit: cover;
	// object-position: 50% 0%
`;

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 24px;
	margin-top: auto;
	margin-bottom: auto;
	background-color: ${props => props.theme.colors.white};

`;

const Title = styled.h4`
	font-weight: bold;

`;

const Ingress = styled.h5`

`;

const CategoryTagText = styled.p`
	color: ${props => props.theme.colors.primary_100};
	line-height: 40px;
	font-weight: bold;
	margin-bottom: 16px;

`;

const Icon = styled(FontAwesomeIcon)`
	align-self: center;
	font-size: 32px;	
	justify-content: flex-start;
	color: ${props => props.theme.colors.primary_100};
	margin: 16px;
	
	
`;
const CardInstructions = ({
	title,
	info,


}) => {
	const context = useContext(AppContext);
	useEffect(() => {
	}, []);
	return (

		<Wrapper>
			{/* <ImageContainer>
				<Image src={image_url || "/images/tahto-logo.png"} alt="Image" />
			</ImageContainer> */}
			<Icon icon={faInfoCircle} />
			<TextContainer>
				{/* <CategoryTagText>
					{category || "Category"}
				</CategoryTagText> */}
				<Title>
					{title || 'Title'}
				</Title>

				<Ingress>
					{info || 'Description'}
				</Ingress>
			</TextContainer>
		</Wrapper>


	);
};

export default CardInstructions;