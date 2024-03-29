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


const Login = () => {
	const {
		setPath
	} = useContext(AppContext);
	const handleClick = () => {
		window.location = 'mailto:aleksanteri@helau.io';
	};

	useEffect(() => {
		setPath('/login');
		window.scroll(0, 0);
	}, []);
	return (
		<div>
			<Container>
				<WelcomeTitle>
					<Title>You need to sign in to view this!</Title>
					{/* <Ingress>Take control of your Business Data Supersets and get in touch now!</Ingress> */}
					<Ingress>We are looking for new customers to try our product. Get in touch and use this opportunity!</Ingress>
					{/* <a href="/login">
						<Button
							white
							type=""
						>
							Sign in
						</Button>
					</a>
					<h5 style={{ marginTop: '24px', marginBottom: '24px' }}>or</h5> */}
					<Button 		
						type='button'
						primary onClick={handleClick}>Get in touch</Button>

				</WelcomeTitle>
			</Container>
		</div>
	);
};

export default Login;