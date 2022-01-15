import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import 'react-datepicker/dist/react-datepicker.css';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const Wrapper = styled.div`
	z-index: 1000000000;
	position: fixed;
	height: 100%;
	background-color: ${props => props.theme.colors.gray_30};
	visibility: hidden;
	top: 0px;
	right: 0px;
	overflow-y: auto;
	min-width: 600px;
	max-width: 600px;
	border-left: 1px solid ${props => props.theme.colors.gray_30};
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Content = styled.div`
	margin: ${props => props.theme.grid.divider_8};

`;

const Overlay = styled.div`
	z-index: 1000000;
	position: fixed;
	min-height: 100%;
	background: rgba(0, 0, 0, 0.5);
	top: 0px;
	left: 0px;
	visibility: hidden;
	width: 100%;
	${({ panelOpen }) => panelOpen && `
		visibility: visible;
		-webkit-transition: right 0.8s ease-in-out;
		-moz-transition: right 0.8s ease-in-out;
		-o-transition: right 0.8s ease-in-out;
		transition: right 0.8s ease-in-out;
	`}
`;

const Title = styled.h4`
	margin-bottom: ${props => props.theme.grid.divider_4};
`;

const FormTask = ({ title, open, projectId, toggleOpen }) => {
	const context = useContext(AppContext);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		context.InsertProjectTask({
			title: data.taskTitle,
			info: data.taskInfo,
			project_id: projectId
		}
		);
		toggleOpen(false);
		reset();
	};
	return (
		<div>
			<Wrapper panelOpen={open}>
				<Content>
					<Title>{title || 'Täytä kentät'}</Title>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							label="Tehtävän nimi"
							name="taskTitle"
							register={register}
							required

						/>
						{errors.taskTitle && <p>Tehtävän nimi on pakollinen tieto.</p>}
						<Input
							label="Tehtävän kuvaus"
							name="taskInfo"
							register={register}
							required

						/>
						{errors.taskInfo && <p>Tehtävän kuvaus on pakollinen tieto.</p>}
						<ButtonRow>
							<Button primary dividerRight type="submit">Tallenna</Button>
							<Button type="reset" white onClick={() => toggleOpen(!toggleOpen)}>Peruuta</Button>
						</ButtonRow>
					</form>
				</Content>
			</Wrapper>
			<Overlay panelOpen={open} />
		</div>
	);
};

export default FormTask;