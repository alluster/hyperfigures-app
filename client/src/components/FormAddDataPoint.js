import React, { useEffect } from 'react';
import styled from 'styled-components';
import Select from './Select';
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
`;


const FormAddDataPoint = ({
	openModal
}) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		console.log(data)
		reset();
	};

	useEffect(() => {
		reset();
	}, []);


	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input
				label="Testi"
				name="test"
				register={register}
			/>
			{errors.test && <p>Testi on pakollinen tieto.</p>}
			<ButtonRow>
				<Button primary dividerRight type="submit">Create</Button>
				<Button type="reset" white onClick={() => openModal(false)}>Peruuta</Button>
			</ButtonRow>
		</form>
	);
};

export default FormAddDataPoint;