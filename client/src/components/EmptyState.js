import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import Button from './Button';
import Content from './Content';
import Spinner from './Spinner';

const Wrapper = styled.div`
	padding-top: ${props => props.theme.grid.divider_12};
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	@media ${device.laptop} {
	}
`;

const StyledButton = styled(Button)`
	margin-left: auto;
	margin-right: auto;
`;

const Title = styled.h4`
	margin-top: ${props => props.theme.grid.divider_4};
	font-weight: bold;
	text-align: center;
`;
const Ingress = styled.h5`
	margin-top: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_4};
	text-align: center;

`;
const EmptyState = ({ title, ingress, children }) => {
	const { loading, user } = useContext(AppContext);
	return (
		<Content>
			<Wrapper>
				{
					loading ?
						<Spinner />
						:
						user.success === true
							?
							<div>
								<Title>{title}</Title>
								<Ingress>{ingress}</Ingress>
								{children}
							</div>

							:
							<div>
								<Title>
									Sinun tulisi kirjautua palveluun.
								</Title>
								<Ingress>
									Tämä toiminnallisuus on käytettävisä ainoastaan kirjautuneille käyttäjille.
								</Ingress>
								<a href="/login">
									<StyledButton
										primary
										type=""
									>
										Kirjaudu palveluun
									</StyledButton>
								</a>
							</div>

				}
			</Wrapper>
		</Content>

	);
};

export default EmptyState;