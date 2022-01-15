import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
`;

const StyledInput = styled.input`
	background-color: white;
	height: 48px;
	width: 100%;
	border: 1px solid ${props => props.theme.colors.gray_80};
	border-radius: 4px;
	font-size: 18px;
	color: ${props => props.theme.colors.fontDark};
	padding-left: ${props => props.theme.grid.divider_2};
	line-height: 40px;
	@media ${device.laptop} {
	}
`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: inline-block;
	
`;




const Input = ({ label, required, placeholder, register, name, maxLength }) => {
	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			<StyledInput
				{...register(name, { required, maxLength: maxLength })}
				label={label}
				placeholder={placeholder}
				type="number"
			/>
		</Wrapper>

	);
};

export default Input;