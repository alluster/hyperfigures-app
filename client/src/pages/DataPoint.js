

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
import { useAuth0 } from '@auth0/auth0-react';

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
	const { user } = useAuth0();

	let { id } = useParams();
	const [googleValue, setGoogleValue] = useState({
		value: 'Loading data...'
	});
	const [dataPoint, setDataPoint] = useState(
		{
			created_at: 'Loading data...',
			title: 'Loading data...',
			description: 'Loading data...',
			updated_at: 'Loading data...',
			deleted_at: 'Loading data...',
			value: 'Loading data...',
			cell: 'Loading data...',
			spreadsheetId: 'Loading data...',
			sheetId: 'Loading data...',
			creator: 'Loading data...',
			data_point_group: 'Loading data...',
			serviceAccount: 'Loading data...'

		}
	);

	const { error, loading, data: dataPointData } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_POINT, {
		variables: { id: id, org_id: user.org_id }
	});
	const { error: googleError, loading: googleLoading, data: googleData } = useQuery(GET_VALUE_FROM_GOOGLE_SPREADSHEET, {
		// skip: !dataPointData,
		variables: {
			cell: `${dataPoint.cell}`,
			spreadsheetId: `${dataPoint.spreadsheetId}`,
			sheetId: `${dataPoint.sheetId}`,
			serviceAccount: `${dataPoint.serviceAccount}`
		}
		// ,
		// pollInterval: 5000,

	});
	useEffect(() => {
		if (dataPointData) {
			console.log(dataPointData)
			window.scroll(0, 0);
			setDataPoint({
				...dataPoint,
				title: dataPointData.getGoogleSpreadsheetDataPoint[0].title,
				description: dataPointData.getGoogleSpreadsheetDataPoint[0].description,
				created_at: dataPointData.getGoogleSpreadsheetDataPoint[0].created_at,
				updated_at: dataPointData.getGoogleSpreadsheetDataPoint[0].updated_at,
				deleted_at: dataPointData.getGoogleSpreadsheetDataPoint[0].deleted_at,
				value: dataPointData.getGoogleSpreadsheetDataPoint[0].value,
				cell: dataPointData.getGoogleSpreadsheetDataPoint[0].cell,
				spreadsheetId: dataPointData.getGoogleSpreadsheetDataPoint[0].spreadsheet_id,
				sheetId: dataPointData.getGoogleSpreadsheetDataPoint[0].sheet_id,
				creator: dataPointData.getGoogleSpreadsheetDataPoint[0].creator,
				data_point_group: dataPointData.getGoogleSpreadsheetDataPoint[0].data_point_group,
				serviceAccount: dataPointData.getGoogleSpreadsheetDataPoint[0].service_account
			})
		}
		DataPointContent();
	}, [dataPointData]);

	useEffect(() => {
		if (googleData) {
			console.log('data from google', googleData.getValueFromGoogleSpreadsheet)
			setGoogleValue({
				...googleValue,
				value: googleData.getValueFromGoogleSpreadsheet[0].value,

			})
		}
	}, [googleData]);





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