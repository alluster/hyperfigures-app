import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../device';
import Button from '../components/Button';
import Container from '../components/Container';
import { AppContext } from '../context/Context';
import Background from '../components/Background';

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
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
	@media ${device.laptop} {
	}
`;
const Title = styled.h1`
	text-align: center;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_4};
	color: transparent;
	-webkit-text-stroke: 2px #fff;
`;
const Ingress = styled.h3`
	text-align: center;
	margin-bottom: ${props => props.theme.grid.divider_4};
	color: ${props => props.theme.colors.white};
	
`;

const List = styled.div`
	margin-top: 30px;
	color: ${props => props.theme.colors.white};
	
`;
const Image = styled.img`
	margin-bottom: ${props => props.theme.grid.divider_8};
	
`;

const Home = () => {
	const {
		setAppLocation
	} = useContext(AppContext);
	const handleClick = () => {
		window.location = 'mailto:aleksanteri@helau.io';
	};

	useEffect(() => {
		window.scroll(0, 0);
		setAppLocation('Home');
	}, []);
	return (
		<div>

			<Container>
				<WelcomeTitle>
					<Title>Connect and share all your business data with anyone.</Title>
					{/* <Image src="/logo.svg" /> */}

					{/* <Title>Take control over your data!</Title> */}
					{/* <Ingress>Take control of your Business Data Supersets and get in touch now!</Ingress> */}
					<Ingress>Connect data sources* into one dashboard to gain unseen power over your data!</Ingress>
					<Button primary onClick={handleClick}>Not yet a user? Get in touch</Button>
					{/* <h5 style={{ marginTop: '24px', marginBottom: '24px' }}>or</h5>
					<a href="/login">
						<Button
							white
							type=""
						>
							Sign in
						</Button>
					</a> */}
					<List>
						<p>
							* Google Sheets, Teams Excel
						</p>
					</List>
				</WelcomeTitle>




			</Container>
			<Background />
		</div>

	);
};

export default Home;