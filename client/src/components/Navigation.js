import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faTh, faColumns, faWindowClose, faCog, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const SideNav = styled.div`
	position: fixed;
	background-color: ${props => props.theme.colors.white};
	border-right: 1px solid ${props => props.theme.colors.gray_60};
	width: 64px;
	height: 100vh;
	min-height: 500px;
	left: 0px;
	top: 0px;
	display: flex;
	flex-direction: column;
	z-index: 10000000;
	${({ open }) => open && `
		width: 280px;
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
	`}
	@media ${device.laptop} {
		display: none;
	}
`;

const Tooltip = styled.div`
	visibility: hidden;
	background-color: ${props => props.theme.colors.primary_100};
	color: ${props => props.theme.colors.white};
	text-align: left;
	line-height: 44px;
	padding: 32px;
	border-radius: 4px;
	position: absolute;
	margin-top: -4px;
	margin-left: 70px;
	width: 400px;
	box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px 0px;
	::before {
		content: "";
		position: absolute;
		width: 0;
		height: 0;
		border-width: 8px;
		border-style: solid;
		border-color: transparent ${props => props.theme.colors.primary_100} transparent transparent;
		top: 14px;
		left: -16px;
	  }
`;

const Links = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 60px;
	align-items: left;
	margin-top: 100px;
`;

const BarsIcon = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 20px;
	align-items: left;
	&:hover  {
		color: white;
		cursor: pointer;
	}
`;

const LogoIcon = styled.img`
	height: 18px;
`;
const Logo = styled.img`
	height: 26px;
	align-self: flex-start;
	margin-left: 16px;
`;
const ImageContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 40px;
	margin-top: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
`;

const IconContainer = styled.div`
	height: 40px;
	width: 40px;
	margin-left: 11px;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;

`;

const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.primary_120};
	height: 24px;
	min-width: 64px;
`;
// const IconPhone = styled(FontAwesomeIcon)`
// 	color: ${props => props.theme.colors.gray_100};
// 	height: 32px;
// 	min-width: 64px;
// `;
const LinkText = styled.h5`
	color: ${props => props.theme.colors.gray_fontDark};
	margin-left: 28px;
	white-space: nowrap;
	line-height: 40px;
	font-weight: 500;

`;

const LinkContainer = styled(Link)`
	display: flex;
	flex-direction: row;
	margin-top: 10px;
	padding-top: 10px;
	padding-bottom: 10px;
	&:hover  {
		cursor: pointer;
		color: ${props => props.theme.colors.fontDark};
		background-color: ${props => props.theme.colors.gray_20};
		${Tooltip} {
			visibility: visible;
		}
		${Icon} {
			color: ${props => props.theme.colors.primary_100};
		}
		${LinkText} {
			color: ${props => props.theme.colors.fontDark};
		}
	}
`;

// Mobile nav styles

const MobileNav = styled.div`
	position: absolute;
	width: 100%;
	min-height: 100vh;
	left: 0px;
	top: 0px;
	display: none;
	flex-direction: column;
	z-index: 10000000;
	background-color: ${props => props.theme.colors.white};

	${({ mobileNavOpen }) => mobileNavOpen && `
		display: flex;
		width: 100%;
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
	`}
	@media ${device.laptop} {
	}
`;

const MobileNavToggleContainer = styled.div`
	display: none;
	flex-direction: row;
	width: 100%;
	height: 80px;
	background-color: ${props => props.theme.colors.white};
	@media ${device.laptop} {
		display: flex;
		position: absolute;
	}



`;
const LogoMobile = styled.div`
	z-index: 2;
	max-height: 20px;
	padding-top: ${props => props.theme.grid.divider_4};
	padding-left: ${props => props.theme.grid.divider_2};
	padding-right: ${props => props.theme.grid.divider_2};


`;

const LogoMobileImage = styled.img`
	max-height: 100%;
`;

const MobileNavToggler = styled.div`
	margin-left: auto;
	justify-content: right;
	display: none;
	z-index: 10000000000;
	text-align: right;
	align-items: flex-end;

	@media ${device.laptop} {
		display: flex;
	}

`;

const ToggleIcon = styled(Icon)`
	align-self: center;
	color: ${props => props.theme.colors.fontDark};
	line-height: 30px;
	`;

const Navigation = () => {
	const routeList = [
		{
			link: '/datapoints',
			icon: faTh,
			title: 'Hyperfigures',
			ingress: 'Welcome to Hyperfigures!',
			description: 'Business Data Supersets'
		},
		{
			link: '/dashboards',
			icon: faColumns,
			title: 'Dashboards',
			ingress: 'All data in one view!',
			description: 'Connect data points from various sources'
		},
		{
			link: '/datasources',
			icon: faDatabase,
			title: 'Data Sources',
			ingress: 'Your Business Data in One View!',
			description: 'Combined view to your business data'
		},
		// {
		// 	link: '/settings',
		// 	icon: faCog,
		// 	title: 'Settings',
		// 	ingress: 'Your Business Data in One View!',
		// 	description: 'Combined view to your business data'
		// },
		{
			link: '/user',
			icon: faUser,
			title: 'User',
			ingress: 'Your Business Data in One View!',
			description: 'Combined view to your business data'
		}

	];
	const [sideBarOpen, setSideBarOpen] = useState(false);
	const [mobileNavOpen, setMobileNavOpen] = useState(false);

	return (
		<div>
			<MobileNavToggleContainer mobileNavOpen={mobileNavOpen}
>

				<LogoMobile>
					<LogoMobileImage src="/arm-logo-dark.svg" />
				</LogoMobile>

				<MobileNavToggler
					mobileNavOpen={mobileNavOpen}
					onClick={() => setMobileNavOpen(!mobileNavOpen)}
				>
					{!mobileNavOpen && <ToggleIcon icon={faBars} />}
					{mobileNavOpen && <ToggleIcon icon={faTimes} />}
				</MobileNavToggler>
			</MobileNavToggleContainer>

			<MobileNav mobileNavOpen={mobileNavOpen}>

				<Links>
					{
						routeList.map((item, i) => {
							return (
								<LinkContainer key={i} to={item.link}
									onClick={() => setMobileNavOpen(false)}
								>
									<IconContainer>
										<Icon icon={item.icon} />
									</IconContainer>
									{
										// !sideBarOpen &&
										// <Tooltip>
										// 	<p style={{ fontWeight: 'bold' }}>
										// 		{item.ingress}
										// 	</p>
										// 	<h4 style={{ fontWeight: 'bold', marginTop: '8px', marginBottom: '8px' }}>
										// 		{item.title}
										// 	</h4>
										// 	{/* <p>
										// 		{item.description}
										// 	</p> */}
										// </Tooltip>
									}
									{
										mobileNavOpen && <LinkText>{item.title}</LinkText>
									}
								</LinkContainer>
							);
						})
					}

				</Links>
			</MobileNav>
			<SideNav open={sideBarOpen}>
				<BarsIcon onClick={() => setSideBarOpen(!sideBarOpen)}>
					{!sideBarOpen && <LogoIcon src="/arm.svg" />}
					{sideBarOpen && <Logo src="/arm-logo-dark.svg" />}

				</BarsIcon>
				<Links>
					{
						routeList.map((item, i) => {
							return (
								<LinkContainer key={i} to={item.link}
									onClick={() => setSideBarOpen(false)}
								>
									<IconContainer>
										<Icon icon={item.icon} />
									</IconContainer>
									{
										// !sideBarOpen &&
										// <Tooltip>
										// 	<p style={{ fontWeight: 'bold' }}>
										// 		{item.ingress}
										// 	</p>
										// 	<h4 style={{ fontWeight: 'bold', marginTop: '8px', marginBottom: '8px' }}>
										// 		{item.title}
										// 	</h4>
										// 	{/* <p>
										// 		{item.description}
										// 	</p> */}
										// </Tooltip>
									}
									{
										sideBarOpen && <LinkText>{item.title}</LinkText>
									}
								</LinkContainer>
							);
						})
					}

				</Links>
				{/* <Phone to="/contact"
				onClick={() => setSideBarOpen(false)}

			>
				<IconPhone icon={faPhone}></IconPhone>
				{!sideBarOpen && <Tooltip>Ota yhteyttä</Tooltip>}
				{sideBarOpen && <LinkText>Ota yhteyttä</LinkText>}
			</Phone> */}
			</SideNav>
		</div>

	);
};

export default Navigation;