import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23DBDBDBFF' stroke-width='2' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	height inherit;
	min-height: 80px;
	flex: 1 1 auto;
	min-width: 200px;
	&:hover {
		cursor: pointer;
	}
	}
`;


const CreateNew = ({ onClick, children }) => {
	return (
		<Wrapper onClick={onClick}>
			{children}
		</Wrapper>
	);
};

export default CreateNew;