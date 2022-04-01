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
import Modal from '../components/Modal';
import Chart from '../components/Chart';
import { useQuery, gql } from '@apollo/client';
import { LOAD_DATAPOINTS } from '../GraphQL/Queries';


const DataPoints = () => {
	const { error, loading, data } = useQuery(LOAD_DATAPOINTS);

	const [openModal, setOpenModal] = useState(false);
	const [datapoints, setDatapoints] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const Datapoints = () => {

		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) {console.log('error occured', error)}
		else {
			return (
				datapoints.map((item, i) => {
					return (
						<Card
							key={i}
							to={`/datapoints/${item.title}`}
						>
							<TextWithLabel
								title={CurrencyFormatter.format(item.value)}
								label={item.title}
							/>
							<p>{item.description}</p>

						</Card>
					)
				})
			)
		};
	};
	const onSubmit = async (data) => {
		console.log(data)

	};
	useEffect(() => {
		if (data) {
			setDatapoints(data.getAllDatapoints)
		}
	}, [data])
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

					{/* <Card >
						<TextWithLabel
							title={`Total: ${CurrencyFormatter.format(34567)}`}
							label="HR Cost 2022"
						/>
						<p>Combined values from all sites</p>
						<Chart />
					</Card> */}
					{Datapoints()}
				</CardGrid>


			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Connect a datapoint"
			>
				{/* <Form
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


				</Form> */}
			</Modal>
		</div>

	);
};

export default DataPoints;