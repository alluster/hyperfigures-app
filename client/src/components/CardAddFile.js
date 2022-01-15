import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/Context';
import styled from 'styled-components';
import Button from './Button';
import axios from 'axios';
import { saveAs } from 'file-saver';
import InputFile from './InputFile';
import SpinnerSmall from './SpinnerSmall';
import CardDownloadFile from './CardDownloadFile';

const ButtonRow = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: ${props => props.theme.grid.divider_4};
`;
const Modal = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	max-width: 100%;
	padding: ${props => props.theme.grid.divider_4};
	margin-top: ${props => props.theme.grid.divider_2};
	margin-right: ${props => props.theme.grid.divider_2};
	background-color: ${props => props.theme.colors.white};
	border: 1px solid ${props => props.theme.colors.gray_40};
	border-radius: 8px;
`;

const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Title = styled.div`
	display: flex;
	flex-direction: row;

`;

const CardAddFile = ({ id, table, title }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [downloading, setDownloading] = useState(false);
	const {
		setLoading,
		setNotifyMessage,
		files,
		GetFiles,
		DeleteFile
	} = useContext(AppContext);

	const FilesList = () => {
		return (
			files.length > 0 ?
				files.map((item, i) => {
					return (
						<div key={i}>
							<button onClick={() => DeleteFile({ 
								id: item.id,
								ref_table: 'contracts',
								ref_id: id
							})}>
								Poista tiedosto
							</button>
							<CardDownloadFile
								onClick={() => DownloadFile(item.unique_id)}
								title={item.original_name}
								info="Lataa tiedosto"
							/>
						</div>


					);
				})
				:
				<div></div>
		);

	};


	const UploadFile = async () => {
		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('ref_table', table);
		formData.append('ref_id', id);
		
		try {
			await axios.post('/api/uploadFile', formData, {
				headers: {
					'content-type': 'multipart/form-data',
					'accept': 'application/pdf'
				}
			});
			setNotifyMessage('Uusi tiedosto lisätty');
			GetFiles({ ref_table: table, ref_id: id });
		}
		catch (err) {
			console.error('Failed to submit file', err);
			setNotifyMessage('Ikävä kyllä jokin meni pieleen');
		}
		finally {
			reset();
		}
	};
	const DownloadFile = async (id) => {
		setDownloading(true);
		try {
			const response = await axios.post('/api/downloadFile', {
				file: id
			}, { contentType: 'arraybuffer' });
			if (response.status === 200) {
				const data = new Blob([response.data], { type: 'application/pdf' });
				saveAs(data, 'filename');
				console.log(response);
			}
		}
		catch (err) {
			console.log('Downloading file error:', err);
			setNotifyMessage('Ongelmia tiedoston lataamisessa');
		}
		finally {
			setDownloading(false);
		}



	};

	useEffect(() => {
		FilesList();
	}, [files]);
	return (
		<Modal>

			<ModalContent>
				<Title>
					<div>
						<h4>{title}</h4>
					</div>

				</Title>

				<form >

					<InputFile
						label="Valitse tiedosto"
						onFileSelectSuccess={(file) => setSelectedFile(file)}
						onFileSelectError={({ error }) => setNotifyMessage(error)}
					/>
					{
						selectedFile ?
							<ButtonRow>
								<Button primary dividerRight onClick={() => UploadFile()}>Tallenna</Button>
							</ButtonRow>
							:
							<div></div>
					}

				</form>
				{downloading ?
					<SpinnerSmall />
					:
					FilesList()
				}
			</ModalContent>

		</Modal >

	);
};

export default CardAddFile;