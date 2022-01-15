import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	z-index: 1000000000;
	position: fixed;
	height: 100%;
	background-color: ${props => props.theme.colors.gray_30};
	visibility: hidden;
	top: 0px;
	right: 0px;
	overflow-y: auto;
	min-width: 600px;
	max-width: 600px;
	border-left: 1px solid ${props => props.theme.colors.gray_30};
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Content = styled.div`
	margin: ${props => props.theme.grid.divider_8};

`;

const Overlay = styled.div`
	z-index: 1000000;
	position: fixed;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.5);
	top: 0px;
	left: 0px;
	visibility: hidden;
	width: 100%;
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Title = styled.h4`
	margin-bottom: ${props => props.theme.grid.divider_4};
`;

const RightSidePanel = ({ children, title, open }) => {
	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>
					{children}
				</Content>
			</Wrapper>
			<Overlay panelOpen={open} />
		</div>
	);
};

export default RightSidePanel;