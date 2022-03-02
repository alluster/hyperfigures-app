import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import axios from 'axios';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import CurrencyFormatter from '../supportFunctions/CurrencyFormatter';
import Select from '../components/Select';
import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import Modal from '../components/Modal';
import Button from '../components/Button';
import FormAddDataPoint from '../components/FormAddDataPoint';

const Value = styled.h3`
	font-weight: bold;
`;

const Divider = styled.div`
	border-bottom: 1px solid ${props => props.theme.colors.gray_60};
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
`;
const Label = styled.p`
	color: ${props => props.theme.colors.gray_130};
	font-size: 14px;
`


const Dashboards = () => {
	const {
	
		something
	} = useContext(AppContext);
	const [openModal, setOpenModal] = useState(false);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data)

	};
	return (
		<Container>
			<ButtonGoBack text="Go Back" />
			<Button primary onClick={() => setOpenModal(!openModal)}>
				Create
			</Button>
			<Modal open={openModal}>
				<FormAddDataPoint openModal={() => setOpenModal()}/>
			</Modal>
			<HeaderText
				locationText=""
				title="Dashboards"
				description="Your organization data dashboards"
			/>
			<CardGrid>
				<Card 
					to="/dashboards/finance"
				>
					<h4>Finance</h4>
				</Card>
				<Card
					to="/dashboards/hr"
				>
					<h4>HR</h4>
				</Card>
				<Card
					to="/dashboards/esg"
				>
					<h4>ESG</h4>
				</Card>
			</CardGrid>
			

		</Container>
	);
};

export default Dashboards;