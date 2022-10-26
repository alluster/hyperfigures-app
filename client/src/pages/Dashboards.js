import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import HeaderText from '../components/HeaderText';
import Container from '../components/Container';
import ButtonGoBack from '../components/ButtonGoBack';
import { useForm } from 'react-hook-form';
import Modal from '../components/Modal';
import { useQuery } from '@apollo/client';
import { LOAD_DASHBOARDS } from '../GraphQL/Queries';
import { useMutation } from '@apollo/client';
import { CREATE_DASHBOARD_MUTATION } from '../GraphQL/Mutations';
import FormCompiler from '../supportFunctions/FormComplier';
import { AppContext } from '../context/Context';
import { useAuth0 } from '@auth0/auth0-react';

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


const Dashboards = () => {
	const { user } = useAuth0();
	var currentDate = (dateData) => new window.Date(dateData);
	const { setNotifyMessage } = useContext(AppContext);
	const { error, loading, data } = useQuery(LOAD_DASHBOARDS, {
		variables: { org_id: user.org_id  }
	});
	const [createDashboard] = useMutation(CREATE_DASHBOARD_MUTATION);
	const [dashboards, setDashboards] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const DashboardsList = () => {
		if (loading) {
			return (
				<p>Loading data...</p>
			);
		}
		if (error) { console.log('error', error); }
		else {
			return (
				<CardGrid>
					{
						dashboards !== [] && dashboards ?
							dashboards.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, i) => {

								return (
									<Card
										key={i}
										to={`/dashboards/${item.id}`}
									>
										<h4>{item.title}</h4>
										<p>{item.description}</p>

									</Card>
								);
							})
							:
							<p>No dashboards</p>
					}
				</CardGrid>
			);
		}
	};




	const onSubmit = async (data) => {
		try {
			createDashboard({
				variables: {
					title: data.dashboardName,
					description: data.dashboardDescription,
					org_id: user.org_id
				},
				refetchQueries: [LOAD_DASHBOARDS]

			});
			setNotifyMessage(`New dashboard ${data.dashboardName} added`);

		}
		catch (error) {
			console.log(error);
			setNotifyMessage('Something went wrong');
		}
		finally {
			setOpenModal(false);
			reset();
		}
	};

	useEffect(() => {
		window.scroll(0, 0);

		if (data) {
			setDashboards(data.getAllDashboards);
		}
	}, [data]);
	return (
		<div>
			<Container>
				<ButtonGoBack text="Go Back" />
				<HeaderText
					buttonTitle="Create a new Dashboard"
					onClickFunction={() => setOpenModal(!openModal)}
					locationText=""
					title="Dashboards"
					description="Your organization data dashboards"
				/>
				{DashboardsList()}

			</Container>
			<Modal
				open={openModal}
				openModal={() => setOpenModal()}
				modalTitle="Create a new Dashboard"
			>
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
								name: 'dashboardName',
								label: 'Dashboard name',
								options: '',
								required: true,
								errorMessage: 'Dashboard name is required',
								placeholder: 'Give your dashboard a name'
							},
							{
								type: 'textarea',
								name: 'dashboardDescription',
								label: 'Dashboard Description',
								options: '',
								required: false,
								errorMessage: '',
								placeholder: 'Describe your dashboard'
							}
						]
					}

				>


				</FormCompiler>
			</Modal>
		</div >
	);
};

export default Dashboards;