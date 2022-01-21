import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/Context';
import { device } from '../device';
import Button from './Button';
import SpinnerSmall from './SpinnerSmall';

const Wrapper = styled.div`
	background-color: ${props => props.theme.colors.white};
	height: 60px;
	max-width: 100%;
	top: 40px;
	display: flex;
	align-items: center;
	flex-direction: row;
	padding-left: ${props => props.theme.grid.divider_10};
	padding-right: ${props => props.theme.grid.divider_4};
	border-bottom: 1px solid ${props => props.theme.colors.gray_40};
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
	height: 60px;
	justify-content: flex-end;
	width: 100%;

`;

const WithMargin = styled.div`
	margin-right: ${props => props.theme.grid.divider_4};
`;
const Login = styled(Link)`

`;

const TopBar = () => {
	const { location, user, loading } = useContext(AppContext);

	return (
		<Wrapper>
			{/* <Header>{location || ''}</Header> */}
			<Links>
				{
					loading ?
						<SpinnerSmall />
						:
						user.success == true ?

							<Link to="/profilepage">
								<Button
									type=""
									white
								>
									{user.email}
								</Button>
							</Link>
							:
							<a href="/login">
								<Button
									primary
									small
									type=""
								>
									Register now
								</Button>
							</a>
				}
			</Links>





		</Wrapper>
	);
};

export default TopBar;