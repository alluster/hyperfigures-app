import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../context/Context';
import Button from '../Button';
import Select from '../Select';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import 'react-datepicker/dist/react-datepicker.css';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const DateInput = styled.input`
	height: 56px;
	width: 100%;
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

const ListToggler = styled(Button)`
	margin-top: ${props => props.theme.grid.divider_4};
	width: calc(100% - ${props => props.theme.grid.divider_6});
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

const FormPractice = ({ title, open, toggleOpen }) => {
	const context = useContext(AppContext);
	const [fromList, setFromList] = useState(true);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		context.InsertOrganizationPractice({
			title: data.practiceName,
			owner: data.practiceOwner,
			category: data.practiceCategory,
			maturity: data.practiceMaturity,
			info: data.practiceInfo
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
						{
							fromList ?
								<div>
									<Select
										name="practiceName"
										label="Toiminnon nimi"
										placeholder=""
										register={register}
										required
										options={context.practicesList}
									/>
									<ListToggler type="reset" small white onClick={() => setFromList(!fromList)}>En löydä toimintoa listalta</ListToggler>

								</div>
								:
								<div>
									<Input
										label="Toiminnon nimi"
										name="practiceName"
										register={register}
										required

									/>
									<ListToggler type="reset" small white onClick={() => setFromList(!fromList)}>Haluan etsiä toiminnon listalta</ListToggler>
								</div>

						}
						{errors.practiceName && <p>Toiminnon nimi on pakollinen tieto.</p>}
						<Input
							label="Yleiskuva toiminnosta"
							name="practiceInfo"
							register={register}
							required

						/>
						<Select
							name="practiceCategory"
							label="Toiminnon tyyppi"
							placeholder=""
							register={register}
							required
							options={context.practiceCategories}
						/>
						{errors.practiceCategory && <p>Toiminnon tyyppi on pakollinen tieto.</p>}
						<Select
							name="practiceMaturity"
							label="Toiminnon maturiteetti"
							placeholder=""
							register={register}
							options={context.maturityList}
						/>

						<Input
							label="Toiminnon omistaja"
							name="practiceOwner"
							register={register}
							required

						/>
						{errors.practiceOwner && <p>Toiminnon omistaja on pakollinen tieto.</p>}
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

export default FormPractice;