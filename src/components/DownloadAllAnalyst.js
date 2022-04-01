import { SearchProvider } from '@elastic/react-search-ui/lib/cjs';
import { WithSearch } from '@elastic/react-search-ui/lib/cjs';
import { useEffect, useState } from 'react';
import DownloadFile from './DownloadFIleAnalyst';
import './DownloadFile.css';
export default function DownloadAllAnalyst(props) {
	const connector = props.connector;
	let filters = props.contextprops;
	let searchTerm = props.searchTerm;
	let data;
	let filterdata = [];
	let [ filterdatastate, setfliterdata ] = useState([ {} ]);
	useEffect(
		() => {
			filters.map((e) => {
				let tempObj = {};
				if (e.field) {
					tempObj.field = e.field;
				}
				if (e.values) {
					tempObj.values = [ ...e.values ];
				}
				filterdata.push(tempObj);
			});
			setfliterdata(filterdata);
		},
		[ filters, searchTerm ]
	);
	const configurationOptions = {
		apiConnector: connector,
		searchQuery: {
			query: searchTerm,
			filters: filterdatastate,
			resultsPerPage: 200,
			result_fields: {
				kol_id: { raw: {} },
				kol_name: { raw: {} },
				organization_name: { raw: {} },
				parent_org_name: { raw: {} },
				org_type: { raw: {} },
				parent_org_type: { raw: {} },
				board_comittee: { raw: {} },
				position_role: { raw: {} },
				affiliation_type: { raw: {} },
				city: { raw: {} },
				state: { raw: {} },
				country: { raw: {} },
				
			}
		}
	};

	const ConvertRawDatatoJson = (Results) => {
		let RawtoJsonArray = [];

		Results.map((e) => {
			RawtoJsonArray.push([
				{ kol_id: e.kol_id.raw },
				{ kol_name: e.kol_name.raw },
				{ organization_name: e.organization_name.raw },
				{ parent_org_name: e.parent_org_name.raw },
				{ org_type: e.org_type.raw },
				{ parent_org_type: e.parent_org_type.raw },
				{ board_comittee: e.board_comittee.raw },
				{ position_role: e.position_role.raw },
				{ affiliation_type: e.affiliation_type.raw },
				{ city: e.city.raw },
				{ state: e.state.raw },
				{ country: e.country.raw },
			]);
		});
		return RawtoJsonArray;
	};

	return (
		<div>
			<SearchProvider config={configurationOptions}>
				<WithSearch
					mapContextToProps={({ results }) => ({
						results
					})}
				>
					{({ results }) => {
						let resultdata = ConvertRawDatatoJson(results);
						data = resultdata;
						return (
							<div>
								<div className="Download-btn">
									<DownloadFile ResultData={data} />
								</div>
							</div>
						);
					}}
				</WithSearch>
			</SearchProvider>
		</div>
	);
}
