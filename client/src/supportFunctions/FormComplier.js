import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { device } from '../device';
import Button from '../components/Button';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	margin-top: ${props => props.theme.grid.divider_4};
`;
const Wrapper = styled.div`
	margin-top: ${props => props.theme.grid.divider_4};
`;


const StyledInput = styled.input`
	background-color: ${props => props.theme.colors.white};
	height: 56px;
	width: calc(100% - ${props => props.theme.grid.divider_6});
	border: 1px solid ${props => props.theme.colors.fontDark};
	border-radius: 8px;
	font-size: 18px;
	color: ${props => props.theme.colors.fontDark};
	padding-left: ${props => props.theme.grid.divider_2};
	padding-right: ${props => props.theme.grid.divider_2};
	margin-bottom: ${props => props.theme.grid.divider_1};
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
const ErrorMessage = styled.label`
	font-size: 14px;
	color: ${props => props.theme.colors.gray_80};

	
`;

const FormCompiler = ({fields, onSubmit, buttonTitle, errors, openModal, register}) => {
	return (
		<form onSubmit={onSubmit()}>
			{
				fields.length > 0 &&
				fields.map((item, i) => {
					let name = item.name
					switch (item.type) {
						case 'input':
							return <Wrapper key={i}>
								<Label>
									{item.label}
								</Label>
								<StyledInput
									type="text"
									{...register(item.name, { required:item.required } )}
									label={item.label}
									placeholder={item.placeholder}
									name={item.name}
								/>
						{

							name in errors ?
								<p>{item.errorMessage}</p>
								:
								null
					}	
							</Wrapper >

						default:
							return <p>No form element</p>;
					}
				})

			}
			<ButtonRow>
				<Button primary dividerRight type="submit">{buttonTitle || "Create"}</Button>
				<Button type="reset" white onClick={() => openModal(false)}>Peruuta</Button>
			</ButtonRow>
		</form>
	)
}






export default FormCompiler; 
