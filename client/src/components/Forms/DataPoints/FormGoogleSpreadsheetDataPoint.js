import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../context/Context';

import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import FormCompiler from '../../../supportFunctions/FormComplier';
import { CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION } from '../../../GraphQL/Mutations';
import { LOAD_GOOGLE_SHEET, LOAD_GOOGLE_SPREADSHEET_DATA_POINTS, LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES } from '../../../GraphQL/Queries';
import { useAuth0 } from '@auth0/auth0-react';


const Title = styled.h4`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};

`;
const FormGoogleSpreadsheetDataPoint = ({
	openModal,
	onSubmitFunction,
	resetFunction,
	fields,
	buttonTitle,
	googleSheetsList,
	dashboardsList,
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
	const [sheetId, setSheetId] = useState('');
	const [spreadsheetId, setSpreadsheetId] = useState('');
	const [sheetTitle, setSheetTitle] = useState('');
	const [sheetIdFromDatabase, setSheetIdFromDatabase] = useState('');
	const [serviceAccount, setServiceAccount] = useState('No Data Source Detected');
	const [createGoogleSpreadsheetDataPoint] = useMutation(CREATE_GOOGLE_SPREADSHEET_DATA_POINT_MUTATION);

	const {  data: dataSource } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES, {
		variables: { org_id: user.org_id }
	});

	const { data: dataSheet } = useQuery(LOAD_GOOGLE_SHEET, {
		variables: { org_id: user.org_id, id: sheetIdFromDatabase }
	});

	const { setNotifyMessage } = useContext(AppContext);


	const onSubmit = async (data) => {

		try {
			// console.log(spreadsheetId);
			createGoogleSpreadsheetDataPoint({
				variables:{
					org_id: user.org_id,
					title: data.dataPointName,
					description: data.dataPointDescription,
					spreadsheet_id: spreadsheetId ,
					cell: data.cell.toUpperCase(),
					sheet_id: sheetId,
					sheet_title: sheetTitle,
					service_account: serviceAccount,
					deleted_at: null,
					dashboard_id: parseInt(data.dashboard_id)
				},
				refetchQueries: [LOAD_GOOGLE_SPREADSHEET_DATA_POINTS]

			});
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
	};
	useEffect(() => {
		if(dataSource) {
			setServiceAccount(dataSource.getAllGoogleSpreadsheetDataSources[0].service_account);
		}
		// console.log('options', options);
		
	},[dataSource]);

	useEffect(() => {
		if(dataSheet){
			
			setSheetId(dataSheet && dataSheet.getGoogleSheet.length > 0 ? dataSheet.getGoogleSheet[0].sheet_id : 'No sheet_id added');
			setSpreadsheetId(dataSheet && dataSheet.getGoogleSheet.length > 0 ? dataSheet.getGoogleSheet[0].spreadsheet_id : 'No spreadsheet_id added');
			setSheetTitle(dataSheet && dataSheet.getGoogleSheet.length > 0 ? dataSheet.getGoogleSheet[0].title : 'No title added');

		}
		
	}, [sheetIdFromDatabase, dataSheet]);


	return (
		<div>

			<Title>Add Data Point</Title>
	

		
			<FormCompiler
				reset={reset}
				openModal={() => setOpenModal()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={
					[

						{
							type: 'select',
							name: 'googleSheet',
							label: 'Select Google Sheet',
							options: googleSheetsList,
							placeholder: 'Select',
							required: true,
							errorMessage: 'Google Sheet is required. Add new Sheet in Data Sources view',
							onChange: (e) => setSheetIdFromDatabase(e)
						},
						{
							type: 'input',
							name: 'cell',
							label: 'Cell',
							options: '',
							required: true,
							errorMessage: 'Data Point cell is required',
							placeholder: 'Choose a Cell from spreadsheet'
						},
						{
							type: 'input',
							name: 'dataPointName',
							label: 'Display Name',
							options: '',
							required: true,
							errorMessage: 'Data Point name is required',
							placeholder: 'Display name will be shown on the dashboard'
						},
						{
							type: 'input',
							name: 'dataPointDescription',
							label: 'Data Point Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: 'Describe your Data Point'
						},
						{
							type: 'select',
							name: 'dashboard_id',
							label: 'Select Dashboard',
							options: dashboardsList,
							placeholder: 'Select',
							required: false,
							errorMessage: 'Dashboard',
							onChange: () => null
						},
					
					]
				}

			>


			</FormCompiler>


		</div>

	);
};

export default FormGoogleSpreadsheetDataPoint;