import { SearchProvider } from '@elastic/react-search-ui/lib/cjs';
import { WithSearch } from '@elastic/react-search-ui/lib/cjs';
export default function DownloadAll(props) {
	let filters = props.contextprops;
	let connector = props.connector;
	let searchTerm = props.searchTerm;
	let data;
	const configurationOptions = {
		apiConnector: connector,

		searchQuery: {
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
				start_date: { raw: {} },
				end_date: { raw: {} },
				links: { raw: {} },
				additional_links: { raw: {} },
				gm_comments: { raw: {} }
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
				{ start_date: e.start_date.raw },
				{ end_date: e.end_date.raw },
				{ links: e.links.raw },
				{ additional_links: e.additional_links.raw },
				{ gm_comments: e.gm_comments.raw }
			]);
		});
		return RawtoJsonArray;
	};
	function consolelog() {
		console.log(data);
	}
	const consolelogsearch = () => {
		console.log(searchTerm);
		filters.map((e) => {
			console.log(e);
		});
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
								<button onClick={consolelog}>Download All Console </button>
								<button onClick={consolelogsearch}>Search and filters element Console</button>
							</div>
						);
					}}
				</WithSearch>
			</SearchProvider>
		</div>
	);
}
