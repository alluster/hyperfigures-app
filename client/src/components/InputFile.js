import React, { useRef } from 'react';
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




const InputFile = ({ label, onFileSelectSuccess, onFileSelectError }) => {
	const fileInput = useRef(null);
	const handleFileInput = (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (file.size > 500000 || file.type != 'application/pdf') {
			onFileSelectError({ error: 'Tiedoston maksimikoko on 50 MB ja sen tulisi olla PDF' });
			e.target.value = null;
		}
		else onFileSelectSuccess(file);
	};

	return (
		<Wrapper>
			<Label>
				{label}
			</Label>
			<StyledInput
				type="file"
				onChange={handleFileInput}
			/>
			<button onClick={e => fileInput.current && fileInput.current.click()} />

		</Wrapper>

	);
};

export default InputFile;