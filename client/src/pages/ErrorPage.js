import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import Button from '../components/Button';
import Container from '../components/Container';
import { AppContext } from '../context/Context';

const Grid = styled.div`
	margin-top: ${props => props.theme.grid.divider_12};
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;
	row-gap: 48px;
	column-gap: 48px;
	width: 100%;
	
	@media ${device.laptop} {
	}
`;

const WelcomeTitle = styled.div`
	margin-top: ${props => props.theme.grid.divider_12};
	margin-bottom: ${props => props.theme.grid.divider_8};

	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
	@media ${device.laptop} {
	}
`;
const Title = styled.h2`
	text-align: center;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_4};
`;
const Ingress = styled.h3`
	text-align: center;
	margin-bottom: ${props => props.theme.grid.divider_4};
`;


const ErrorPage = () => {
	const context = useContext(AppContext);

	useEffect(() => {
		context.setAppLocation('Error');

	}, []);
	useEffect(() => {
		context.setPath('/error');
		window.scroll(0, 0);
	}, []);
	return (
		<Container>
			<WelcomeTitle>
				<Title>Jokin meni pieleen</Title>
				<Ingress>Selvitämme ongelmaa!</Ingress>
				<Button to="/" primary>Ota palvelu käyttöön</Button>
			</WelcomeTitle>
				

		</Container>
	);
};

export default ErrorPage;