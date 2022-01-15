import React, { useContext, useState, useRef } from 'react';
import { AppContext } from '../context/Context';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from './Button';
import SpinnerSmall from './SpinnerSmall';


const TaskListItem = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: column;
    flex: 1 1 auto;
	position: relative;
	justify-content: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_60};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_2};
	
	${({ status }) => status && `
		background-color: #D6FFDA;
	`};

`;

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const TaskListItemContent = styled.div`
	display: flex;
	flex-direction: row;
`;

const TaskTitle = styled.p`
	font-weight: bold;
	align-self: center;

`;
const TaskTag = styled.div`
	background-color: ${props => props.theme.colors.gray_20};
	height: 42px;
	padding-left: 24px;
	padding-right: 24px;
	line-height: 42px;
	font-size: 16px;
	color: ${props => props.theme.colors.fontDark};
	margin-right: 42px;
	border-radius: 8px;
`;
const StyledForm = styled.form`
	margin-top: ${props => props.theme.grid.divider_4};
`;
const StyledInput = styled.input`
	margin-top: ${props => props.theme.grid.divider_4};
	background-color: white;
	height: 48px;
	width: calc(100% - 20px);
	border: 1px solid ${props => props.theme.colors.gray_80};
	border-radius: 4px;
	font-size: 18px;
	color: ${props => props.theme.colors.fontDark};
	padding-left: ${props => props.theme.grid.divider_2};
	line-height: 40px;
	
`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: inline-block;
	
	
`;
const TasksCardItem = ({ title, status, id, project_id }) => {

	const context = useContext(AppContext);
	const [InitialValue, setInitialValue] = useState('');
	const [loadingTaskDone, setLoadingTaskDone] = useState(false);
	const taskRef = useRef(InitialValue);
	const {
		InsertProjectTask,
		GetProjectTasks,
		DeleteProjectTask } = useContext(AppContext);
	const [edit, setEdit] = useState(false);
	const [done, setDone] = useState();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const Delete = () => {
		DeleteProjectTask({ id: id, project_id: project_id });

	};
	// 0 === not done
	// 1 === done

	const submit = (data) => {
		InsertProjectTask({
			id: id,
			title: taskRef.current.value,
			status: done,
			project_id: project_id
		});
		reset();
		setEdit(!edit);
		GetProjectTasks(project_id);
	};

	const handleTaskDone = () => {
		setLoadingTaskDone(true);
		InsertProjectTask({
			id: id,
			title: title,
			status: !status,
			project_id: project_id
		});
		GetProjectTasks(project_id);
		setLoadingTaskDone(false);


	};



	return (
		<TaskListItem status={status}>
			<TaskListItemContent>
				<TaskTitle status={status} >{title || '-'}</TaskTitle>
				<div style={{ alignSelf: 'center', marginLeft: 'auto', display: 'flex', flexDirection: 'row' }}>
					{status === 1 ? <TaskTag>Tehtävä suoritettu</TaskTag> : <div></div>}
					<Button white small type="button" onClick={() => setEdit(!edit)} >Muokkaa</Button>
				</div>
			</TaskListItemContent>

			{
				edit ?
					<form onSubmit={handleSubmit(submit)}>
						<StyledInput
							label="Muokkaa tehtävää"
							name="title"
							required
							type="text"
							ref={taskRef}
							defaultValue={title}
						/>


						{/* <div style={{ marginTop: '16px', marginBottom: '16px' }} >
							<InputCheckbox
								label="Tehtävä suoritettu"
								name="taskStatus"
								register={register}
								type="checkbox"
								defaultChecked={done}
								onClick={() => { setDone(!done) }}
							/>
						</div> */}
						<ButtonRow>
							<Button primary dividerRight type="submit" >Tallenna</Button>
							<Button dividerRight white type="reset" onClick={() => { setEdit(!edit); }}>
								Peruuta
							</Button>
							<Button
								onClick={() => Delete()}
								alert
								type="reset"
							>
								Poista tehtävä
							</Button>
						</ButtonRow>
					</form>

					:
					<div></div>
			}
			{
				loadingTaskDone ?
					<SpinnerSmall />
					:
					status ?
						<button
							onClick={() => { handleTaskDone(); }}
						>
							Merkitse suorittamattomaksi</button>
						:
						<button
							onClick={() => { handleTaskDone(); }}
						>
							Merkitse suoritetuksi
						</button>
			}

		</TaskListItem >

	);
};

export default TasksCardItem;