import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Context';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Input from './Input';
import TasksCardItem from './TaskCardItem';
import SpinnerSmall from './SpinnerSmall';



const Modal = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	max-width: 100%;
	padding: ${props => props.theme.grid.divider_4};
	margin-top: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Comment = styled.div`

`;

const Date = styled.div`
	margin-bottom: 16px;
	font-size: 12px;

 `;


const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const Title = styled.div`
	display: flex;
	flex-direction: row;

`;


const TaskListItem = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: row;
    flex: 1 1 auto;
	position: relative;
	justify-content: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_60};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_2};
	

	
`;

const TaskTitle = styled.p`
	font-weight: bold;
	align-self: center;
`;
const TaskDescription = styled.p`

`;
const TasksCard = ({ project }) => {
	const [statusCheck, setStatusCheck] = useState(false);
	const {
		GetProjectTasks,
		projectTasks,
		InsertProjectTask,
		toggleTasks,
		setToggleTasks,
		user,
		loading

	} = useContext(AppContext);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		InsertProjectTask({
			project_id: project,
			title: data.title,
			status: false
		});
		reset();
		GetProjectTasks(project);
	};
	
	return (
		<Modal>

			<ModalContent>
				<Title>
					<div>
						<h4>Tehtävät</h4>
						<p>Luo projektille tehtäviä</p>
					</div>
					<div style={{ alignSelf: 'center', marginLeft: 'auto' }}>
						{/* {
							toggleTasks ?
								<Button white small type="" onClick={() => setToggleTasks(!toggleTasks)} >Piilota tehtävät</Button>
								:
								<Button white small type="" onClick={() => setToggleTasks(!toggleTasks)}>Näytä tehtävät</Button>
						} */}
					</div>
				</Title>
				{
					loading ?
						<SpinnerSmall />
						:
						toggleTasks ?
							<div>
								{
									projectTasks.map((item, i) => {
										return (
											<TasksCardItem key={i} title={item.title} status={item.status} id={item.id} project_id={project} />
										);
									})
								}
								<form onSubmit={handleSubmit(onSubmit)}>

									<Input
										label="Luo tehtävä"
										name="title"
										register={register}
										required
									/>
									{errors.title && <p>Tehtävä on pakollinen tieto.</p>}
									<ButtonRow>
										<Button primary dividerRight type="submit">Luo tehtävä</Button>
									</ButtonRow>
								</form>
							</div>

							:
							<div>

							</div>
				}


			</ModalContent>

		</Modal >

	);
};

export default TasksCard;