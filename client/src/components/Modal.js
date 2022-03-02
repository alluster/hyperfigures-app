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
	height: 100vh;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
	visibility: hidden;
	z-index: 1000000000;
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

`;

const ModalClose = styled.div`

`;

const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.fontDark};
	font-size: 20px;
	margin-right: ${props => props.theme.grid.divider_1};
	align-self: flex-end;


	`;

const Modal = ({
		children,
		open
}) => {
	const [ modalOpen, setModalOpen ] = useState(open);
	
	useEffect(() => {
		setModalOpen(!modalOpen)
	}, [open]);

	return (
		<ModalWrapper open={modalOpen} >
			<ModalBox>
					<Icon onClick={() => setModalOpen(false)} icon={faTimes} />
				{children}
			</ModalBox>
		</ModalWrapper>

	)
}

export default Modal;