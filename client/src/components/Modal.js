import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Container from './Container';
import { device } from '../device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalWrapper = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	height: 100%;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5) ;
	visibility: hidden;
	z-index: 4;
	@media ${device.laptop} {
		background: rgba(0, 0, 0, 0.0) ;
		background-attachment: fixed;



	}
	${({ open }) => open && `
		visibility: visible
	`}
	
`;

const ModalBox = styled.div`
	width: 400px;
	max-width: 90%;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.primary_200};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_4};
	display: flex;
	flex-direction: column;
	margin-left: auto;
	margin-right: auto;
	margin-top: ${props => props.theme.grid.divider_8};
	margin-bottom: ${props => props.theme.grid.divider_8};
	@media ${device.laptop} {
		// border: none;
		// width: 100%;
		// max-width: 100%;
		// min-height: 100%;
		// border-radius: 0px;


	}
`;

const Content = styled.div`
	// max-width: calc(100% - 64px);
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.fontDark};
	font-size: 20px;
	margin-right: ${props => props.theme.grid.divider_1};
	align-self: flex-end;
	margin-bottom: ${props => props.theme.grid.divider_4};
	

	`;

	const ModalTitle = styled.h4`

	
	`;

const Modal = ({
		children,
		open,
		openModal,
		modalTitle
}) => {
	
	// useEffect(() => {
	// 	setModalOpen(!modalOpen)
	// }, [open]);

	return (
		<ModalWrapper open={open} >
			<ModalBox>
			<Content>

					<Icon onClick={() => openModal(false)} icon={faTimes} />
					<ModalTitle>{modalTitle || "" }</ModalTitle>
					{children}

					</Content>
			</ModalBox>
		</ModalWrapper>

	)
}

export default Modal;