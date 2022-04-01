import { CSVLink } from 'react-csv';
import './DownloadFile.css';
export default function DownloadFile(props) {
	const result = props.ResultData;

	let data = [];
	let kol_id,
		kol_name,
		organization_name,
		parent_org_name,
		org_type,
		parent_org_type,
		board_comittee,
		position_role,
		affiliation_type,
		city,
		state,
		country

	result.map((e) => {
		e.map((e2) => {
			if (e2.kol_id) {
				kol_id = e2.kol_id;
			}
			if (e2.kol_name) {
				kol_name = e2.kol_name;
			}
			if (e2.organization_name) {
				organization_name = e2.organization_name;
			}
			if (e2.parent_org_name) {
				parent_org_name = e2.parent_org_name;
			}
			if (e2.org_type) {
				org_type = e2.org_type;
			}
			if (e2.parent_org_type) {
				parent_org_type = e2.parent_org_type;
			}
			if (e2.board_comittee) {
				board_comittee = e2.board_comittee;
			}
			if (e2.position_role) {
				position_role = e2.position_role;
			}
			if (e2.affiliation_type) {
				affiliation_type = e2.affiliation_type;
			}
			if (e2.city) {
				city = e2.city;
			}
			if (e2.state) {
				state = e2.state;
			}
			if (e2.country) {
				country = e2.country;
			}
			
		});
		data.push({
			kol_id: kol_id,
			kol_name: kol_name,
			organization_name: organization_name,
			parent_org_name: parent_org_name,
			org_type: org_type,
			parent_org_type: parent_org_type,
			board_comittee: board_comittee,
			position_role: position_role,
			affiliation_type: affiliation_type,
			city: city,
			state: state,
			country: country,
			
		});
	});
	const sendToConsole = () => {
		window.console.log(data);
	};
	const headers = [
		{
			label: 'kol_id',
			key: 'kol_id'
		},
		{
			label: 'kol_name',
			key: 'kol_name'
		},
		{
			label: 'organization_name',
			key: 'organization_name'
		},
		{
			label: 'parent_org_name',
			key: 'parent_org_name'
		},
		{
			label: 'org_type',
			key: 'org_type'
		},
		{
			label: 'parent_org_type',
			key: 'parent_org_type'
		},
		{
			label: 'board_comittee',
			key: 'board_comittee'
		},
		{
			label: 'position_role',
			key: 'position_role'
		},
		{
			label: 'affiliation_type',
			key: 'affiliation_type'
		},
		{
			label: 'city',
			key: 'city'
		},
		{
			label: 'state',
			key: 'state'
		},
		{
			label: 'country',
			key: 'country'
		},
	];
	const csvLink = {
		headers: headers,
		data: data,
		filename: 'datafileAnalyst.csv'
	};

	return (
		<div>
			<CSVLink {...csvLink} target="_blank">
				<button className="download-btn-all">Download</button>
			</CSVLink>
		</div>
	);
}
