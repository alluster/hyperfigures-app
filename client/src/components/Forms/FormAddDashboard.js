import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from './../Button';
import { useForm } from 'react-hook-form';
import { device } from '../../device';
import FormCompiler from '../../supportFunctions/FormComplier';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
`;


const FormAddDashboard = ({
	openModal,
	onSubmitFunction,
	resetFunction,
	fields,
	buttonTitle,
}) => {
	const {
		control,
		register,
		handleSubmit,
		reset,

	} = useForm();

	

	return (
		<div>

			{FormCompiler({ fields: fields, onSubmit })}
			
		</div>

	);
};

export default FormAddDashboard;