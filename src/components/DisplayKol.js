import { useState, useEffect } from 'react';
import '../App.css';
export default function DisplayKol(props) {
	let data = props.Results;
	let results = [];
	const [ displayKol, setdisplayKol ] = useState([ {} ]);
	useEffect(
		() => {
			data.map((e) => {
				let tempobj = {};
				tempobj.isClicked = false;
				tempobj.name = e.kol_name.raw;
				tempobj.ID = e.kol_id.raw;
				tempobj.Organization = e.organization_name.raw;
				tempobj.ParentOrganization = e.parent_org_name.raw;
				tempobj.OrganizationType = e.org_type.raw;
				tempobj.ParentOrganizationType = e.parent_org_type.raw;
				tempobj.BoardComittee = e.board_comittee.raw;
				tempobj.PositionRole = e.position_role.raw;
				tempobj.AffiliationType = e.affiliation_type.raw;
				tempobj.City = e.city.raw;
				tempobj.State = e.state.raw;
				tempobj.Country = e.country.raw;
				tempobj.StartDate = e.start_date.raw;
				tempobj.EndDate = e.end_date.raw;
				tempobj.Links = e.links.raw;
				tempobj.AdditionalLinks = e.additional_links.raw;
				tempobj.GmComments = e.gm_comments.raw;

				results.push(tempobj);
			});
			setdisplayKol(results);
		},
		[ data ]
	);
	const viewMoreClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = true;
		setdisplayKol(newdisplayKol);
	};
	const viewLessClick = (index) => {
		const newdisplayKol = [ ...displayKol ];
		newdisplayKol[index].isClicked = false;
		setdisplayKol(newdisplayKol);
	};

	return (
		<div>
			{displayKol.map((e, index) => (
				<div className="Card">
					<h2 style={{ color: '#3259ED' }}>{e.name}</h2>
					<div className="Card-field">
						<p>Oraganization : {e.Organization}</p>
						<p>ParentOrganization : {e.ParentOrganization}</p>
						<p>Country : {e.Country}</p>
						{e.isClicked ? null : (
							<button
								onClick={() => {
									viewMoreClick(index);
								}}
							>
								View more
							</button>
						)}
						{e.isClicked ? (
							<div>
								<p>Organization Type :{e.OrganizationType}</p>
								<p>ParentOrganization Type :{e.ParentOrganizationType}</p>
								<p>BoardComittee :{e.BoardComittee}</p>
								<p>Position Role :{e.PositionRole}</p>
								<p>Affiliation Type :{e.AffiliationType}</p>
								<p>City :{e.City}</p>
								<p>State :{e.State}</p>
								<p>StartDate :{e.StartDate}</p>
								<p>EndDate : {e.EndDate}</p>
								<p>Links :{e.Links}</p>
								<p>AdditionalLinks :{e.AdditionalLinks}</p>
								<p>GmComments : {e.GmComments}</p>
								<button
									onClick={() => {
										viewLessClick(index);
									}}
								>
									View Less
								</button>
							</div>
						) : null}
					</div>
				</div>
			))}
		</div>
	);
}
