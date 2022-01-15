import React, { useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/Context';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Button from './Button';
import SpinnerSmall from './SpinnerSmall';



const Modal = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	max-width: 100%;
	padding: ${props => props.theme.grid.divider_4};
	margin-top: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};;
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Comment = styled.div`

`;

const Date = styled.div`
	margin-bottom: 16px;
	font-size: 12px;

 `;


const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: ${props => props.theme.grid.divider_4};
`;

const Title = styled.div`
	display: flex;
	flex-direction: row;

`;

const Note = styled.div`
	padding: 16px;
	margin-top: 16px;
	:nth-child(even) {
		background-color: ${props => props.theme.colors.gray_20};

	  }
`;
const StyledForm = styled.form`
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
	
`;

const Label = styled.label`
	font-size: 16px;
	font-weight: bold;
	margin-bottom: ${props => props.theme.grid.divider_2};
	display: inline-block;
	
	
`;

const CommentsCard = ({ ref_table, ref_id }) => {
	const commentRef = useRef('');

	const {
		GetNotes,
		notes,
		InsertNote,
		toggleComments,
		user,
		loading

	} = useContext(AppContext);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const Notes = () => {
		return (
			loading ?
				<SpinnerSmall />
				:
				notes.sort((a, b) => a.created_at - b.created_at).map((item, i) => {
					return (
						<Note key={i}>
				
							<Comment>
								{item.info || '-'}
							</Comment>
						</Note>

					);
				})

		);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	const onSubmit = () => {
		InsertNote({
			ref_table: ref_table,
			ref_id: ref_id,
			comment: `${user.email}: ${commentRef.current.value}`
		});
		GetNotes({ ref_id: ref_id, ref_table: ref_table });
	};

	useEffect(() => {
	}, []);

	useEffect(() => {
		Notes();
	}, [notes]);
	return (
		<Modal>
			<Title>


			</Title>
			<ModalContent>
				<Title>
					<div>
						<h4>Keskustelu</h4>
						<p>Voit keskustella tässä</p>
					</div>

				</Title>
				{
					loading ?
						<SpinnerSmall />
						:
						<div>
							<div>
								{Notes()}
								<StyledForm onSubmit={handleSubmit(onSubmit)}>
									<Label>Kirjoita kommenttisi tässä</Label>
									<StyledInput
										name="comment"
										required
										ref={commentRef}
									/>
									<ButtonRow>
										<Button primary dividerRight type="submit">Lähetä kommentti</Button>
									</ButtonRow>
								</StyledForm>
							</div>
						</div>
				}



			</ModalContent>

		</Modal>

	);
};

export default CommentsCard;