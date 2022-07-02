import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';

import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import FormCompiler from '../../supportFunctions/FormComplier';
import TextWithLabel from '../TextWithLabel';
import { useAuth0 } from '@auth0/auth0-react';
import { CREATE_GOOGLE_SHEET } from '../../GraphQL/Mutations';
import { LOAD_GOOGLE_SHEETS } from '../../GraphQL/Queries';

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

`;
const Title = styled.h4`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};

`;
const FormGoogleSheet = ({
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
	const [createGoogleSheet] = useMutation(CREATE_GOOGLE_SHEET);
	const { error: errorSheet, loading: loadingSheet, data: dataSheet } = useQuery(LOAD_GOOGLE_SHEETS, {
		variables: { org_id: user.org_id }
	});

	const { setNotifyMessage } = useContext(AppContext);
	const onSubmit = async (data) => {
		try {
			createGoogleSheet({
				variables: {
					org_id: user.org_id,
					title: data.sheetName,
					description: data.sheetDescription,
					spreadsheet_id: data.spreadSheetId,
					sheet_id: data.sheetId
				},
				refetchQueries: [LOAD_GOOGLE_SHEETS]
	
			});
			setNotifyMessage(`New Data Point ${data.dataPointName} added`);
			setOpenModal(false);
			reset();
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
	

	return (
		<div>

			
			<TextWithLabel
				title={<p>Invite <a target="blank" style={{ color: 'blue' }} href='/datasources'>Hyperfigures Google Service Account</a> as viewer to the Google Sheet you want to connect to.</p>}
				label=''
			/>
			<HelperText>Spreadsheet ID:</HelperText>
			<img src="/spreadsheet_id.jpg" />
			<HelperText>Sheet ID:</HelperText>
			<img src="/sheet_id.jpg" />

		
			<FormCompiler
				reset={reset}
				openModal={() => setOpenModal()}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				fields={
					[
						{
							type: 'input',
							name: 'sheetName',
							label: 'Display Name',
							options: '',
							required: true,
							errorMessage: 'Sheet name is required',
							placeholder: ''
						},
						{
							type: 'input',
							name: 'sheetDescription',
							label: 'Sheet Description',
							options: '',
							required: false,
							errorMessage: '',
							placeholder: ''
						},
						{
							type: 'input',
							name: 'spreadSheetId',
							label: 'Spreadsheet ID',
							options: '',
							required: true,
							errorMessage: 'Spreadsheet ID is required',
							placeholder: ''
						},
						{
							type: 'input',
							name: 'sheetId',
							label: 'Sheet ID',
							options: '',
							required: true,
							errorMessage: 'Sheet ID is required',
							placeholder: ''
						}
					
						
					]
				}

			>


			</FormCompiler>
			

		</div>

	);
};

export default FormGoogleSheet;