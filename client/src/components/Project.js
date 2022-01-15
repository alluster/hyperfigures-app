import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../context/Context';
import { device } from '../device';
import CreateNew from '../components/CreateNew';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FormTask from './forms/FormTask';

const Wrapper = styled.div`
	@media ${device.laptop} {
	}
`;
const ProjectContainer = styled.div`
	// margin-top: ${props => props.theme.grid.divider_4};
	padding: ${props => props.theme.grid.divider_4};
	flex: 1 1 auto;
	background-color: white;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	box-shadow:  4px 4px 4px -4px rgb(0 0 0 / 8%);

`;

const TaskCard = styled.div`
	margin-top: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: flex;
	flex-direction: column;
    flex: 1 1 auto;
	position: relative;
	justify-content: center;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
	padding: ${props => props.theme.grid.divider_2};
	
`;
const Icon = styled(FontAwesomeIcon)`
	color: ${props => props.theme.colors.gray_60};
	font-size: 24px;
	`;

const ProjectTitle = styled.h5`
	font-weight: bold;
`;
const TaskTitle = styled.p`
	font-weight: bold;
`;
const TaskDescription = styled.p`

`;

const ProjectInfo = styled.div`
	margin-bottom: ${props => props.theme.grid.divider_4};
`;

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: ${props => props.theme.grid.divider_4};
`;


const Project = ({ id, projectTitle, end_date, start_date, owner }) => {
	const context = useContext(AppContext);
	const [panelToggle, setPanelToggle] = useState(false);	

	return (
		<Wrapper>
			<FormTask 
				title="Lisää tehtävä"
				toggleOpen={setPanelToggle}
				open={panelToggle}
				projectId={id}
			/>
			<ProjectContainer>
				<ProjectInfo>
					<p style={{fontSize: '14px', marginTop: '16px'}}>Projektin nimi:</p>
					<ProjectTitle>{projectTitle || '-'}</ProjectTitle>
					<p style={{fontSize: '14px', marginTop: '16px'}}>Aikataulu:</p> 
					<p>{moment(end_date).lang('fi').format('LL') || '-'} - {moment(start_date).lang('fi').format('LL') || '-'}</p>
					<p style={{fontSize: '14px', marginTop: '16px'}}>Omistaja:</p> 
					<p>{owner || '-'}</p>
				</ProjectInfo>
				
				{
					context.projectTasks.length > 0 ?

						<div>
							{
								context.projectTasks.filter(item => item.project === id).map((task, i) => {
									return (
										<TaskCard key={i}>
											<TaskTitle>{task.title}</TaskTitle>
											<TaskDescription>{task.info}</TaskDescription>
										</TaskCard>
									);
								}

								)
							}
						</div>
						:
						<p>Projektille ei ole luotu vielä yhtään tehtävää</p>
				}
				<CreateNew onClick={() => setPanelToggle(!panelToggle)} >
					<Icon icon={faPlusCircle} />
					<p style={{ marginLeft: '16px' }}>Lisää uusi tehtävä</p>
				</CreateNew>
			</ProjectContainer>
		</Wrapper>
	);
};

export default Project;