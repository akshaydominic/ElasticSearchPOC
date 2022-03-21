import { CSVLink } from 'react-csv';

export default function DownloadFile(props) {
	const result = props.ResultData;
	let data = [];
	let fname, lname, cities, state, gender, studentstatus, major, country, age, grade, height;
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
			if (e2.age) {
				age = e2.age;
			}
			if (e2.grade) {
				grade = e2.grade;
			}
			if (e2.height) {
				height = e2.height;
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
			country: country,
			age: age,
			grade: grade,
			height: height
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
		},
		{
			label: 'Age',
			key: 'age'
		},
		{
			label: 'Grade',
			key: 'grade'
		},
		{
			label: 'Height',
			key: 'height'
		}
	];
	const csvLink = {
		headers: headers,
		data: data,
		filename: 'datafile.csv'
	};

	return (
		<div>
			<CSVLink {...csvLink} target="_blank">
				<button>Download All</button>
			</CSVLink>
		</div>
	);
}
