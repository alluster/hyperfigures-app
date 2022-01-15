import React from 'react';
import styled from 'styled-components';
import { device } from '../device';

const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
	min-width: 100%;
`;

const StyledInput = styled.textarea`
	background-color: white;
	width: 100%;
	border: 1px solid ${props => props.theme.colors.gray_80};
	border-radius: 4px;
	font-size: 24px;
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




const InputTextarea = ({ label, required, placeholder, register, name }) => {
	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			<StyledInput
				rows="4"
				{...register(name, { required })}
				label={label}
				placeholder={placeholder}
				type="textarea"
			/>
		</Wrapper>

	);
};

export default InputTextarea;