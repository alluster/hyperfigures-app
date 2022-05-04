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
import FormGoogleSpreadsheetDataPoint from '../components/Forms/DataPoints/FormGoogleSpreadsheetDataPoint';
import { GET_VALUE_FROM_GOOGLE_SPREADSHEET, LOAD_GOOGLE_SPREADSHEET_DATA_POINT } from '../GraphQL/Queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import DividerLine from '../components/DividerLine';

const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${props => props.theme.grid.divider_4};

}
`;
const GoBackContainer = styled.div`
	display: flex;
	flex-direction: row;
	
`;
const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.fontDark};
	font-size: 20px;
	margin-right: ${props => props.theme.grid.divider_1};
	align-self: center;
	margin-bottom: ${props => props.theme.grid.divider_2};

	&:hover {
		cursor: pointer;
	}

	`;
const Text = styled.h5`
	color: ${props => props.theme.colors.fontDark};
	white-space: nowrap;
	align-self: center;
	margin-bottom: ${props => props.theme.grid.divider_2};

	&:hover {
		cursor: pointer;
	}
`;
const DataPoints = () => {
	const { error, loading, data } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINTS);

	const [openModal, setOpenModal] = useState(false);
	const [dataPoints, setDataPoints] = useState([]);
	const [dataPointSelector, setDataPointSelector] = useState("");
	const [googleValue, setGoogleValue] = useState({
		value: 'Loading data...'
	});
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();


	const DataPointSelectorHandler = () => {
		switch (dataPointSelector) {
			case 'Google Sheets':
				return <FormGoogleSpreadsheetDataPoint setOpenModal={setOpenModal} />
			default:
				return;
		}

	}


	const GoogleValueGetter = (item) => {
		console.log(item)
		// const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_VALUE_FROM_GOOGLE_SPREADSHEET, {
		// 	variables: {
		// 		cell: `${item.cell}`,
		// 		spreadsheetId: `${item.spreadsheet}`,
		// 		sheetId: `${item.sheet}`
		// 	}
		// 	// ,
		// 	// pollInterval: 5000,

		// });
		// 	if (googleData) {
		// 		console.log(googleData);
		// 		return(
		// 			googleData.getValueFromGoogleSpreadsheet[0].value
		// 		)

		// 	}

	}
	const DataPoints = () => {

		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) { console.log('error occurred', error) }
		else {
			return (
				<div>
					<CardGrid>
						{
							dataPoints.map((item, i) => {
								return (
									<Card
										key={i}
										to={`/datapoints/${item.id}`}
									>
										<TextWithLabel
											title={GoogleValueGetter(item) || '-'}
											label={item.title}
										/>
										<p>{item.description}</p>

									</Card>
								)
							})
						}
					</CardGrid>
				</div>

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
					buttonTitle="Connect to a new Data Point"
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
				modalTitle="New Data Point"
			>
				{
					dataPointSelector === '' ?
						<div>
							<GoBackContainer>
								<h5>Select Data Source</h5>
							</GoBackContainer>
							<DividerLine />

							<Card
								onClick={() => setDataPointSelector("Google Sheets")}
								row
							>
								<Logo>
									<img src="/google_sheets.png" alt="Google Sheets" />
								</Logo>
								<TextWithLabel
									title="Google Sheets"
									label="Integration"
									small="true"
								/>
							</Card>
						</div>
						:
						<div>

							<GoBackContainer onClick={() => setDataPointSelector('')}>
								<Icon icon={faArrowLeft} />
								<Text>
									Go Back
								</Text>
							</GoBackContainer>
							<DividerLine />

						</div>


				}

				{
					DataPointSelectorHandler()
				}
			</Modal>
		</div >

	);
};

export default DataPoints;