

import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { LOAD_GOOGLE_SHEETS } from '../GraphQL/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import HeaderText from '../components/HeaderText';
import Card from '../components/Card';
import FormGoogleSheet from '../components/Forms/FormGoogleSheet';
import Modal from '../components/Modal';
import GoogleSheetGetter from '../GraphQL/GetterFunctions/GoogleSheetGetter';

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
`;


const DataSourceGoogle = () => {
	

	const history = useHistory();
	const { user } = useAuth0();
	const { setNotifyMessage, setPath } = useContext(AppContext);
	const [openModal, setOpenModal] = useState(false);

	const { error, loading, data } = useQuery(LOAD_GOOGLE_SHEETS, {
		variables: { org_id: user.org_id  }
	});
	const [googleSheets, setGoogleSheets] = useState([]);


	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();


	useEffect(() => {
		GoogleSheetsList();
		if (data) {
			setGoogleSheets(data.getAllGoogleSheets);
			console.log('sheets from qraphql:', googleSheets);
		}
	}, [data]);

	useEffect(() => {
		setPath('/dataSourceGoogle');
		window.scroll(0, 0);
	}, []);

	const GoogleSheetsList = () => {
		if (loading) {
			return (
				<p>Loading data...</p>
			);
		}
		if (error) { console.log('error', error); }
		else {
			return(
				googleSheets.map((item, i) => {
					return(
						<Card
							key={i}
							
						>
						
							
							<HeaderText
								locationText="Google Sheet"
								title={item.title}
								description={item.description}
							/>
							<GoogleSheetGetter
								spreadsheetId={item.spreadsheet_id}
								sheetId={item.sheet_id}
								org_id={item.org_id}
							/>
						</Card>
					);
				})
			);
		}
	};
	const DataSourceContent = () => {
		if (loading) {
			return (
				<p>Loading data...</p>
			);
		}
		if (error) { console.log('error', error); }
		else {
			return (
				<div>
					<ButtonGoBack text="Go Back" />


					<div>

						<HeaderText
							buttonTitle="Integrate to a new Google Sheet"
							onClickFunction={() => setOpenModal(!openModal)}
							locationText="Business Data Superset™"
							title="Google Sheet Integrations"
							description="List of all Google Sheets Hyperfigures in currently integrated to:"
						/>
						
					</div>


				</div>


			);
		}
	};

	return (
		<div>

			<Container>
				{
					DataSourceContent()
				}
				{
					GoogleSheetsList()
				}
		
			</Container>
			<Modal

				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Integrate to Google Sheet"
			>
	

				<FormGoogleSheet 				openModal={() => setOpenModal()}
				/>
			</Modal>
		</div>

	);
};

export default DataSourceGoogle;