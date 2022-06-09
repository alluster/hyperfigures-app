import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context/Context';

import { useForm } from 'react-hook-form';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import FormCompiler from '../../../supportFunctions/FormComplier';
import TextWithLabel from '../../TextWithLabel';
import Card from '../../Card';
import { CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION } from '../../../GraphQL/Mutations';
import { LOAD_GOOGLE_SPREADSHEET_DATA_POINTS, LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES } from '../../../GraphQL/Queries';
import { useAuth0 } from '@auth0/auth0-react';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
`;
const HelperText = styled.p`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};

`
const Title = styled.h4`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};

`
const FormGoogleSpreadsheetDataPoint = ({
	openModal,
	onSubmitFunction,
	resetFunction,
	fields,
	buttonTitle,
	setOpenModal
}) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { user } = useAuth0();
	const [serviceAccount, setServiceAccount] = useState('No Data Source Detected');
	const [createGoogleSpreadsheetDataPoint] = useMutation(CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION);
	const { error: dataSourceError, loading: loadingDataSource, data: dataSource } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES, {
		variables: { org_id: user.org_id }
	});
	const fetchDataSource = async  () => {
		setServiceAccount(dataSource.getAllGoogleSpreadsheetDataSources[0].service_account)
	};
	const { setNotifyMessage } = useContext(AppContext);
	const onSubmit = async (data) => {
		try {
			createGoogleSpreadsheetDataPoint({
				variables: {
					org_id: user.org_id,
					title: data.dataPointName,
					description: data.dataPointDescription,
					spreadsheet_id: data.spreadSheetId,
					cell: data.cell,
					sheet_id: data.sheetId,
					service_account: serviceAccount
				},
				refetchQueries: [LOAD_GOOGLE_SPREADSHEET_DATA_POINTS]

			})
			setNotifyMessage(`New Data Point ${data.dataPointName} added`);

		}
		catch (error) {
			console.log(error);
			setNotifyMessage(`Something went wrong, ${error}`);
		}
		finally {
			setOpenModal(false);
			reset();
		}
	}
	useEffect(() => {
		if(dataSource) {
			setServiceAccount(dataSource.getAllGoogleSpreadsheetDataSources[0].service_account)
		}
		

	},[dataSource])

	return (
		<div>

			<Title>Google sheets</Title>
			<Card
				small
			>
				<TextWithLabel
					title={<p>Make sure you have invited your <a target="blank" style={{ color: 'blue' }} href='/datasources'>Hyperfigures Google Service Account</a> to the Google Spreadsheet you want to connect to. The required ID's for connection can be found from the Google Spreadsheet URL as displayed bellow.</p>}
					label='Requirements'
				/>
					<HelperText>Example spreadsheet id:</HelperText>
			<img src="/spreadsheet_id.jpg" />
			<HelperText>Example sheet id:</HelperText>
			<img src="/sheet_id.jpg" />
			</Card>

		
			<FormCompiler
				reset={reset}
				openModal={() => setOpenModal()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={
					[

						{
							type: "input",
							name: "spreadSheetId",
							label: "Spreadsheet ID",
							options: "",
							required: true,
							errorMessage: "Spreadsheet ID is required",
							placeholder: "ID can be found from the sheet URL"
						},
						{
							type: "input",
							name: "sheetId",
							label: "Sheet ID",
							options: "",
							required: true,
							errorMessage: "Sheet ID is required",
							placeholder: "ID can be found from the sheet URL"
						},
						{
							type: "input",
							name: "cell",
							label: "Sheet Cell",
							options: "",
							required: true,
							errorMessage: "Cell ID is required",
							placeholder: "Example: C4"
						},
						{
							type: "input",
							name: "dataPointName",
							label: "Display Name",
							options: "",
							required: true,
							errorMessage: "Data Point name is required",
							placeholder: "Display name will be shown on the dashboard"
						},
						{
							type: "input",
							name: "dataPointDescription",
							label: "Data Point Description",
							options: "",
							required: false,
							errorMessage: "",
							placeholder: "Describe your Data Point"
						}
					]
				}

			>


			</FormCompiler>


		</div>

	);
};

export default FormGoogleSpreadsheetDataPoint;