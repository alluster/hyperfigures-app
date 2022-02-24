import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Card from '../components/Card';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import CurrencyFormatter from '../supportFunctions/CurrencyFormatter';
import { useForm } from 'react-hook-form';
import TextWithLabel from '../components/TextWithLabel';


const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${props => props.theme.grid.divider_4};

}
`;

const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
`;

const DataStreams = () => {
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
			<ButtonGoBack text="Go Back" />
			<HeaderText
				locationText=""
				title="Data Streams"
				description="List of all data connectors available for your organization."
			/>
			<Wrapper>

				<Card
					to={"/datapoints/budget_2022"}
				>
					<Logo>
						<img src="/google_sheets.png" alt="Google Steets" />
					</Logo>
					
					<TextWithLabel
						title="Google Sheets"
						label="Data Provider"
					/>
					<TextWithLabel
						title="hyperfigures-test-company@gmail.com"
						label="Service Account Email"
					/>

				</Card>
				
			</Wrapper>


		</Container>
	);
};

export default DataStreams;