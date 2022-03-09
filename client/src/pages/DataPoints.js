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
import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import TextWithLabel from '../components/TextWithLabel';
import Form from '../components/Form';
import Modal from '../components/Modal';
import Chart from '../components/Chart';

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


const DataPoints = () => {
	const {
		dashboardData,
		setAppLocation,
		loading,
		user,
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
		<div>

			<Container>
				<HeaderText
					buttonTitle="Connect to a new Datapoint"
					onClickFunction={() => setOpenModal(!openModal)}
					locationText="Business Data Superset™"
					title="Hyperfigures"
					description="All your organization Hyperfigures in one dashboard"
				/>
				<CardGrid>
					<Card
						to={"/datapoints/budget_2022"}
					>
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>

					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
						<p>Ipsum lorem doloris executive</p>
					</Card>
					<Card >
						<TextWithLabel
							title={`Total: ${CurrencyFormatter.format(34567)}`}
							label="HR Cost 2022"
						/>
						<p>Combined values from all sites</p>
						<Chart />
					</Card>
					<Card
						to={"/datapoints/budget_2022"}
					>
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>

					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
							
						/>
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make </p>

					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
					<Card
						to={"/datapoints/budget_2022"}
					>
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>

					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
					<Card
						to={"/datapoints/budget_2022"}
					>
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>

					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
					<Card >
						<TextWithLabel
							title={CurrencyFormatter.format(34567)}
							label="Budget 2022"
						/>
					</Card>
				</CardGrid>


			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Connect a datapoint"
			>
				<Form
					buttonTitle="Connect"
					openModal={() => setOpenModal()}
					fields={
						[
							{
								type: "input",
								name: "datapointName",
								label: "Datapoint name",
								options: "",
								required: true,
								errorMessage: "This input is required"
							},
							{
								type: "input",
								name: "selectDatastream",
								label: "Select Datastream",
								options: "",
								required: true,
								errorMessage: "This input is required"
							},
							{
								type: "input",
								name: "selectSheet",
								label: "Select sheet you want to connect to",
								options: "",
								required: true,
								errorMessage: "This input is required"
							},
							{
								type: "input",
								name: "selectCell",
								label: "Select Cell in your sheet",
								options: "",
								required: true,
								errorMessage: "This input is required"
							},
						]
					}

				>


				</Form>
			</Modal>
		</div>

	);
};

export default DataPoints;