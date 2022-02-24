import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import { device } from '../device';

const FooterWrapper = styled.div`
	bottom: 0px;
	height: 260px;
	margin-top: -260px;
	background-color: ${props => props.theme.colors.primary_200};
* {
	margin-bottom: ${props => props.theme.grid.divider_1}
   }
`;
   const FooterContent = styled.div`
   display: flex;
   flex-direction: column;
   max-width: 1500px;
   margin-left: auto;
   margin-right: auto;
   padding-top: ${props => props.theme.grid.divider_6};
   padding-left: ${props => props.theme.grid.divider_10};
   padding-right: ${props => props.theme.grid.divider_2};
   color: ${props => props.theme.colors.white};
   width: 100%;
   background-color: ${props => props.theme.colors.primary_200};

   @media ${device.laptop} {
	padding-left: 0px;
	text-align: center;

}
`;
const Links = styled.div`
	margin-top: 60px;
   display: flex;
   flex-direction: row;
   text-align: center;
   min-width: 100%;
   bottom: 0px;
   justify-content: space-between;
   background-color: ${props => props.theme.colors.primary_200};

   @media ${device.laptop} {
	flex-direction: column;
	padding-bottom: ${props => props.theme.grid.divider_2};

}
  
}
`;

const Logo = styled.div`
   max-width: 260px;
   margin-bottom: ${props => props.theme.grid.divider_2};
   @media ${device.laptop} {
	width: 100%;
	margin-left: auto;
	margin-right: auto;

}
`;
const Description = styled.h6`
	max-width: 500px;
	@media ${device.laptop} {
		max-width: 100vw;
		padding-left: ${props => props.theme.grid.divider_2};
		padding-right: ${props => props.theme.grid.divider_2};

	
	}
`;


const Footer = ({
	locationText,
	title,
	description
}) => {
	return (
		<FooterWrapper>
			<FooterContent>
				<Logo >
					<img src="/logo-text-light.svg" alt="Logo"/>
				</Logo>
				<Description>
					We help organizations to create Supersets™ from business data stored in online data providers.  
				</Description>
				<Links>
					<h6>info@helau.io</h6>
					<h6>www.hyperfigures.com</h6>
					<h6>© Copywrite 2022 Helau Solutions Oy</h6>
				</Links>
			</FooterContent>

		</FooterWrapper>

	)
}

export default Footer;