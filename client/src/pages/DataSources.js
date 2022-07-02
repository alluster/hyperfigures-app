import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import TextWithLabel from '../components/TextWithLabel';
import { LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES } from '../GraphQL/Queries';
import { useQuery } from '@apollo/client';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/Button';
import DividerLine from '../components/DividerLine';

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
	const { user } = useAuth0();

	const [dataSources, setDataSources] = useState([]);
	const { data, error, loading } = useQuery(LOAD_GOOGLE_SPREADSHEET_DATA_SOURCES, {
		variables: { org_id: user.org_id  }
	});
	const DataSources = () => {

		if (loading) {
			return (
				<p>Loading data...</p>
			);
		}
		if (error) { console.log('error occured', error); }
		else {
			return (
				dataSources.map((item, i) => {
					return (
						<Card
							key={i}
							row
						>
							{/* <Logo>
								<img src="/google_sheets.png" alt="Google Sheets" />
							</Logo> */}

							<TextWithLabel
								title={item.title}
								label="Data Provider"
							/>
							<TextWithLabel
								title={item.service_account}
								label="Service Account Email"
							/>
							<DividerLine/>
							<Button primary to='/datasources/google'>Connect to a Google Sheet</Button>
						</Card>
					);
				})
			);
		}
	};


	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setDataSources(data.getAllGoogleSpreadsheetDataSources);
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