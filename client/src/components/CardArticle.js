import React, { useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	// margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: column;
	flex-wrap: no-wrap;
	width: calc(33.3333% - 48px);
	position: relative;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: ${props => props.theme.grid.divider_2};
	box-shadow:  8px 3px 5px -8px rgb(0 0 0 / 8%);
	&:hover {
		transition: box-shadow 0.2s,  top 0.2s ease-out;
		top: -1px;
		box-shadow: 1px 1px 2px 2px  rgb(0 0 0 / 4%);
		cursor: pointer;
	}
	@media ${device.laptop} {
		width: calc(50% - 48px);

	}
`;

const ImageContainer = styled.div`
	height: 400px;
	background-repeat: no-repeat;
	background-size: auto;
	border-radius: 16px 16px 0px 0px;
	padding: 16px;
`;

const Image = styled.img`
	height: 100%;
	min-width: 100%;
	border-radius: 16px 16px 0px 0px;
	object-fit: cover;
	// object-position: 50% 0%
`;

const TextContainer = styled.div`
	border-radius: 16px 16px 0px 0px;
	padding: 24px;
	width: 80%;
	margin-left: auto;
	margin-right: auto;
	margin-top: -94px;
	background-color: ${props => props.theme.colors.white};

`;

const Title = styled.h5`
	font-weight: bold;
	margin-bottom: 24px;

`;

const Ingress = styled.p`

`;

const CategoryTag = styled.div`
	border-radius: 8px;
	background-color: ${props => props.theme.colors.primary_10};
	// padding-left: 24px;
	// padding-right: 24px;
	width: 100px;
	height: 40px;
	margin-top: 16px;
	margin-bottom: 16px;
	text-align: center;
`;

const CategoryTagText = styled.p`
	color: ${props => props.theme.colors.primary_100};
	line-height: 40px;
	font-weight: bold;
	margin-bottom: 16px;

`;


const CardArticle = ({
	title,
	image_url,
	url,
	info,
	category


}) => {

	const handleClick = () => {
		window.open(url);
	};

	useEffect(() => {
	}, []);
	return (

		<Wrapper onClick={handleClick}>
			<ImageContainer>
				<Image src={image_url || '/images/tahto-logo.png'} alt="Image" />
			</ImageContainer>
			<TextContainer>
				<CategoryTagText>
					{category || 'Category'}
				</CategoryTagText>
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

export default CardArticle;