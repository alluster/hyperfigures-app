import React from 'react';
import styled from 'styled-components';
import { device } from '../device';
import { useForm } from 'react-hook-form';

const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
	margin-right: ${props => props.theme.grid.divider_2};

`;

const StyledInput = styled.input`
background-color: ${props => props.theme.colors.white};
height: 56px;
width: calc(100% - 60px);
	border: 1px solid ${props => props.theme.colors.fontDark};
	border-radius: 8px;
	font-size: 18px;
	color: ${props => props.theme.colors.fontDark};
	padding-left: ${props => props.theme.grid.divider_4};
	padding-right: ${props => props.theme.grid.divider_2};
	// padding: 0.4%;
	line-height: 56px;
	-ms-box-sizing:content-box;
	-moz-box-sizing:content-box;
	-webkit-box-sizing:content-box; 
	box-sizing:content-box;
	${({ disabled }) => disabled && `
		border: 1px solid gray;
		background-color: #dddddd;

	`};
	@media ${device.laptop} {
	}
	`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: inline-block;
	
`;



const Input = ({ label, required, placeholder, name }) => {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	
	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			<StyledInput
				{...register(name, { required })}
				label={label}
				placeholder={placeholder}
				type="text"
			/>
		</Wrapper>

	);
};

export default Input;