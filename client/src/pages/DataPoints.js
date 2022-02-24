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


const DataPoints = () => {
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

	return (
		<Container>
			<HeaderText
				locationText="Business Data Superset™"
				title="Hyperfigures"
				description="All your organization Hyperfigures in one dashboard"
			/>
			<CardGrid>
				<Card
					to={"/datapoints/budget_2022"}
				>
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>

				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card
					to={"/datapoints/budget_2022"}
				>
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>

				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card
					to={"/datapoints/budget_2022"}
				>
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>

				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card
					to={"/datapoints/budget_2022"}
				>
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>

				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
				<Card >
					<TextWithLabel
						title={CurrencyFormatter.format(34567)}
						label="Budget 2022"
					/>
				</Card>
			</CardGrid>


		</Container>
	);
};

export default DataPoints;