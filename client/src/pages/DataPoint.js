

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
import { useParams, useHistory } from 'react-router-dom';

import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import TextWithLabel from '../components/TextWithLabel';
import { useQuery, gql } from '@apollo/client';
import { GET_VALUE_FROM_GOOGLE_SPREADSHEET, LOAD_GOOGLE_SPREADSHEET_DATA_POINT } from '../GraphQL/Queries';

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


const DataPoint = () => {
	let { id } = useParams();
	const [googleValue, setGoogleValue] = useState({
		value: 'Loading data...'
	});
	const [dataPoint, setDataPoint] = useState(
		{
			title: 'Loading data...',
			description: 'Loading data...',
			updated_at: 'Loading data...',
			deleted_at: 'Loading data...',
			value: 'Loading data...',
			cell: 'Loading data...',
			spreadsheetId: 'Loading data...',
			sheetId: 'Loading data...',
			creator: 'Loading data...',
			data_point_group: 'Loading data...'

		}
	);

	const { error, loading, data: dataPointData } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINT, {
		variables: { id: id }
	});
	const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_VALUE_FROM_GOOGLE_SPREADSHEET, {
		// skip: !dataPointData,
		variables: {
			cell: `${dataPoint.cell}`,
			spreadsheetId: `${dataPoint.spreadsheetId}`,
			sheetId: `${dataPoint.sheetId}`
		}
		// ,
		// pollInterval: 5000,

	});
	useEffect(() => {
		if (dataPointData) {
			window.scroll(0, 0);
			setDataPoint({
				...dataPoint,
				title: dataPointData.getGoogleSpreadsheetDataPoint[0].title,
				description: dataPointData.getGoogleSpreadsheetDataPoint[0].description,
				updated_at: dataPointData.getGoogleSpreadsheetDataPoint[0].updated_at,
				deleted_at: dataPointData.getGoogleSpreadsheetDataPoint[0].deleted_at,
				value: dataPointData.getGoogleSpreadsheetDataPoint[0].value,
				cell: dataPointData.getGoogleSpreadsheetDataPoint[0].cell,
				spreadsheetId: dataPointData.getGoogleSpreadsheetDataPoint[0].spreadsheet_id,
				sheetId: dataPointData.getGoogleSpreadsheetDataPoint[0].sheet_id,
				creator: dataPointData.getGoogleSpreadsheetDataPoint[0].creator,
				data_point_group: dataPointData.getGoogleSpreadsheetDataPoint[0].data_point_group
			})
		}
		DataPointContent();
	}, [dataPointData]);
	console.log("Datapoint data", dataPointData)
	useEffect(() => {
		if (googleData) {
			setGoogleValue({
				...googleValue,
				value: googleData.getValueFromGoogleSpreadsheet[0].value,

			})
		}
	}, [googleData]);



	const {
		dashboardData,
		setAppLocation,
		user,
		something
	} = useContext(AppContext);

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();


	const DataPointContent = () => {
		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) { console.log('error', error) }
		else {
			return (
				<div>
					<ButtonGoBack text="Go Back" />


					<div>

						<HeaderText
							locationText="Data Point"
							title={dataPoint.title || '-'}
							description={dataPoint.description || '-'}
						/>
						<Card>
							<TextWithLabel
								title={googleValue.value || '-'}
								label="Value"
							/>
						</Card>
						<Card>

							<TextWithLabel
								title={dataPoint.updated_at}
								label="Updated"
							/>
							<TextWithLabel
								title={dataPoint.created_at}
								label="Created"
							/>
							<TextWithLabel
								title={dataPoint.data_point_group}
								label="Group"
							/>
							<TextWithLabel
								title={dataPoint.creator}
								label="Creator"
							/>
						</Card>
						<Card>

							<TextWithLabel
								title={dataPoint.spreadsheetId}
								label="Spreadsheet"
							/>
							<TextWithLabel
								title={dataPoint.sheetId}
								label="Sheet"
							/>
							<TextWithLabel
								title={dataPoint.cell}
								label="Cell"
							/>

						</Card>

					</div>


				</div>


			)
		};
	};

	return (
		<Container>
			{
				DataPointContent()
			}
		</Container>
	);
};

export default DataPoint;