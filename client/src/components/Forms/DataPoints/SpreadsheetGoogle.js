import React, { useState } from 'react';
import styled from 'styled-components';

import { useForm } from 'react-hook-form';
import Spreadsheet from 'react-spreadsheet';
import FormCompiler from '../../../supportFunctions/FormComplier';


const Title = styled.h4`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};

`;
const SpreadsheetGoogle = ({
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

	const [selectedSheet, setSelectedSheet] = useState();
	const [data, setData] = useState([
		[{ value: 'Vanilla' }, { value: 'Chocolate' }],
		[{ value: 'Strawberry' }, { value: 'Cookies' }],
	]);

	const onSubmit = async (data) => {

		try {
			// console.log(spreadsheetId);


		}
		catch (error) {
			console.log(error);
		}
		finally {
			reset();
		}
	};

	return (
		<div>
			<FormCompiler
				reset={reset}
				errors={errors}
				onSubmit={() => handleSubmit(onSubmit)}
				register={register}
				noButtons={true}
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
							onChange: (e) => setSelectedSheet(e)
						}
					]
				}

			>
			</FormCompiler>

			<Spreadsheet data={data} onChange={setData} />


		</div>

	);
};

export default SpreadsheetGoogle;