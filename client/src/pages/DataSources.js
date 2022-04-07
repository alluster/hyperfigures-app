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
import { LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES } from '../GraphQL/Queries';
import { useQuery, gql } from '@apollo/client';

const Logo = styled.div`
   	max-width: 40px;
	align-self: center;
	margin-right: ${props => props.theme.grid.divider_4};

}
`;

const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
`;

const DataSources = () => {
	const [dataSources, setDataSources] = useState([]);
	const { data, error, loading } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES);
	const DataSources = () => {

		if (loading) {
			return (
				<p>Loading data...</p>
			)
		}
		if (error) { console.log('error occured', error) }
		else {
			return (
				dataSources.map((item, i) => {
					return (
						<Card
							key={i}
							row
						>
							<Logo>
								<img src="/google_sheets.png" alt="Google Steets" />
							</Logo>

							<TextWithLabel
								title={item.title}
								label="Data Provider"
							/>
							<TextWithLabel
								title={item.service_account}
								label="Service Account Email"
							/>

						</Card>
					)
				})
			)
		};
	};
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

	const onSubmit = async (data) => {
		console.log(data)

	};
	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setDataSources(data.getAllGoogleSpreadsheetDataSources)
		}
	}, [data]);

	return (
		<Container>
			<ButtonGoBack text="Go Back" />
			<HeaderText
				locationText=""
				title="Data Sources"
				description="List of all data connectors available for your organization."
			/>
			<Wrapper>
				{DataSources()}
			</Wrapper>


		</Container>
	);
};

export default DataSources;