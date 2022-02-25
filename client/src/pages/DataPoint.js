

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
import Input from '../components/Input';
import InputNumber from '../components/InputNumber';
import InputTextarea from '../components/InputTextarea';
import TextWithLabel from '../components/TextWithLabel';


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
	const {
		dashboardData,
		setAppLocation,
		loading,
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

	const onSubmit = async (data) => {
		console.log(data)

	};
	useEffect(() => {
		reset(
			{
				imported_value: "1234",
				sheet: "finances_data.csv",
				page: "Calculations",
				cell: "c2",
				connected_dashboard: "Finance"
			}
		)
	}, [])
	return (
		<Container>
			<ButtonGoBack text="Go Back" />
			<HeaderText
				locationText=""
				title="Data Point"
				description="Budget 2022"
			/>
			<CardGrid>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>

			</CardGrid>
			<form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
				<CardGrid>
					<Input
						name="imported_value"
						label="Imported Value"
						placeholder="Testi"
						register={register}
					/>
					<Input
						name="sheet"
						label="Sheet"
						placeholder="Testi"
						register={register}
					/>
					<Input
						name="page"
						label="Page"
						placeholder="Testi"
						register={register}
					/>
					<Input
						name="cell"
						label="Cell"
						placeholder="Testi"
						register={register}
					/>
					<Input
						name="connected_dashboard"
						label="Connected Dashboard"
						placeholder="Testi"
						register={register}
					/>
				</CardGrid>

			</form>

		</Container>
	);
};

export default DataPoint;