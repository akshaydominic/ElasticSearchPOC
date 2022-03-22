import { CSVLink } from 'react-csv';
import './DownloadFile.css';
export default function DownloadFileAnalyst(props) {
	const result = props.ResultData;
	let data = [];
	let fname, lname, cities, state, gender, studentstatus, major, country;
	result.map((e) => {
		e.map((e2) => {
			if (e2.firstname) {
				fname = e2.firstname;
			}
			if (e2.lastname) {
				lname = e2.lastname;
			}
			if (e2.city) {
				cities = e2.city;
			}
			if (e2.state) {
				state = e2.state;
			}
			if (e2.gender) {
				gender = e2.gender;
			}
			if (e2.studentstatus) {
				studentstatus = e2.studentstatus;
			}
			if (e2.major) {
				major = e2.major;
			}
			if (e2.country) {
				country = e2.country;
			}
		});
		data.push({
			firstname: fname,
			lastname: lname,
			city: cities,
			state: state,
			gender: gender,
			studentstatus: studentstatus,
			major: major,
			country: country
		});
	});
	const sendToConsole = () => {
		window.console.log(data);
	};
	const headers = [
		{
			label: 'LastName',
			key: 'lastname'
		},
		{
			label: 'FirstName',
			key: 'firstname'
		},
		{
			label: 'City',
			key: 'city'
		},
		{
			label: 'State',
			key: 'state'
		},
		{
			label: 'Gender',
			key: 'gender'
		},
		{
			label: 'StudentStatus',
			key: 'studentstatus'
		},
		{
			label: 'Major',
			key: 'major'
		},
		{
			label: 'Country',
			key: 'country'
		}
	];
	const csvLink = {
		headers: headers,
		data: data,
		filename: 'datafile-analyst.csv'
	};

	return (
		<div>
			<CSVLink {...csvLink} target="_blank">
				<button className="download-btn-all">Download All</button>
			</CSVLink>
		</div>
	);
}
