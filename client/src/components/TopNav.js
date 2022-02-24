import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../device';
import Button from './Button';
import SpinnerSmall from './SpinnerSmall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faComments } from '@fortawesome/free-solid-svg-icons';
import { useAuth0 } from "@auth0/auth0-react";

const Wrapper = styled.div`
	height: 48px;
	max-width: 100%;
	top: 96px;
	display: flex;
	align-items: center;
	flex-direction: row;
	padding-left: ${props => props.theme.grid.divider_10};
	padding-right: ${props => props.theme.grid.divider_4};
	@media ${device.laptop} {
	}
`;
const Header = styled.h5`
	line-height: ${props => props.theme.grid.divider_8};
	white-space: nowrap;
	@media ${device.laptop} {
	}
`;

const Links = styled.div`
	display: flex;
	flex-wrap: no-wrap;
	flex-direction: row;
	align-items: center;
	height: 64px;
	justify-content: flex-end;
	width: 100%;

`;
const Icon = styled(FontAwesomeIcon) `
	color: ${props => props.theme.colors.primary_100};
	font-size: 40px;
	margin-right: 40px;
	margin-left: 20px;

`

const LinkContainer = styled(Link)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const WithMargin = styled.div`
	margin-right: ${props => props.theme.grid.divider_4};
`;
const Login = styled(Link)`

`;

const TopNav = () => {
	const { logout, loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

	return (
		<Wrapper>

			{
					isAuthenticated ?
						<Links>
						
							<Link to="/user">
								<p>
								{user.email}
								</p>
								
							</Link>
						</Links>

						:
						<Links>
							<a onClick={() => loginWithRedirect()}>
								<Button
									primary
									type=""
									small
								>
									Login
								</Button>
							</a>
						</Links>
			}





		</Wrapper>
	);
};

export default TopNav;