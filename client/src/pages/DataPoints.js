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
import { LOAD_GOOGLE_SPREADSHEET_DATA_POINTS } from '../GraphQL/Queries';


const DataPoints = () => {
	const { error, loading, data } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINTS);

	const [openModal, setOpenModal] = useState(false);
	const [dataPoints, setDataPoints] = useState([]);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const DataPoints = () => {

		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) { console.log('error occured', error) }
		else {
			return (
				<CardGrid>
					{
						dataPoints.map((item, i) => {
							return (
								<Card
									key={i}
									to={`/datapoints/${item.id}`}
								>
									<TextWithLabel
										title={CurrencyFormatter.format(item.value)}
										label={item.title}
									/>
									<p>{item.description}</p>

								</Card>
							)
						})
					}
				</CardGrid>
			)
		};
	};
	const onSubmit = async (data) => {
		console.log(data)

	};
	useEffect(() => {
		if (data) {
			setDataPoints(data.getAllGoogleSpreadsheetDataPoints)
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

					{DataPoints()}


			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Connect a data point"
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
		</div >

	);
};

export default DataPoints;