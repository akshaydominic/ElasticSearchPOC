import React from 'react';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox, Facet, WithSearch, ResultsPerPage } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import { MultiCheckboxFacet } from '@elastic/react-search-ui-views';
import { Paging } from '@elastic/react-search-ui';
import { PagingInfo } from '@elastic/react-search-ui';
import '../App.css';
import DownloadAllAnalyst from '../components/DownloadAllAnalyst';

import '@elastic/react-search-ui-views/lib/styles/styles.css';
import DownloadFile from '../components/DownloadFile';
import Logoutbtn from '../components/Logoutbtn';

const connector = new AppSearchAPIConnector({
	searchKey: 'search-95qzx7tqsh6aa1tb2u2wg9cu',
	engineName: 'kol-engine',
	endpointBase: 'https://kol-elasticsearch.ent.us-central1.gcp.cloud.es.io',
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,

	searchQuery: {
		disjunctiveFacets: [
			'organization_name',
			'parent_org_name',
			'org_type',
			'parent_org_type',
			'board_comittee',
			'position_role',
			'affiliation_type',
			'city',
			'state',
			'country'
		],
		disjunctiveFacetsAnalyticsTags: [ 'Ignore' ],
		search_fields: {
			kol_id: {},
			kol_name: {},
			organization_name: {},
			parent_org_name: {},
			org_type: {},
			parent_org_type: {},
			board_comittee: {},
			position_role: {},
			affiliation_type: {},
			city: {},
			state: {},
			country: {}
		},

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
			end_date: { raw: {} }
		},
		facets: {
			organization_name: { type: 'value' },
			parent_org_name: { type: 'value' },
			org_type: { type: 'value' },
			parent_org_type: { type: 'value' },
			board_comittee: { type: 'value' },
			position_role: { type: 'value' },
			affiliation_type: { type: 'value' },
			city: { type: 'value' },
			state: { type: 'value' },
			country: { type: 'value' }
		}
	},

	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
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
			{ end_date: e.end_date.raw }
		]);
	});
	return RawtoJsonArray;
};

export default function AdminPage() {
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, setSearchTerm, results, filters }) => ({
						searchTerm,
						setSearchTerm,
						results,
						filters
					})}
				>
					{({ results, searchTerm, filters }) => {
						let resultdata = ConvertRawDatatoJson(results);
						return (
							<div>
								<Layout
									header={<SearchBox inputProps={{ placeholder: 'Search for KOL Data' }} />}
									bodyHeader={
										<div className="container-btn">
											<ResultsPerPage />
											<Logoutbtn />
											<PagingInfo />
											<br />
											<div className="Download-btn">
												<DownloadAllAnalyst
													searchTerm={searchTerm}
													connector={connector}
													contextprops={filters}
												/>
											</div>
										</div>
									}
									bodyContent={results.map((r) => (
										<div className="Card">
											<h2 style={{ color: '#3259ED' }}>{r.kol_name.raw}</h2>
											<div className="Card-field">
												<p>ID : {r.kol_id.raw}</p>
												<p>Organization : {r.organization_name.raw}</p>
												<p>Parent Organization : {r.parent_org_name.raw}</p>
												<p>Organization Type: {r.org_type.raw}</p>
												<p>Parent Organization Type: {r.parent_org_type.raw}</p>
												<p>Board Comittee: {r.board_comittee.raw}</p>
												<p>Position Role: {r.position_role.raw}</p>
												<p>Affiliation Type : {r.affiliation_type.raw}</p>
												<p>City: {r.city.raw}</p>
												<p>State: {r.state.raw}</p>
												<p>Country: {r.country.raw}</p>
											</div>
										</div>
									))}
									sideContent={
										<div>
											<Facet
												field="organization_name"
												label="Organization Name"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="parent_org_name"
												label="Parent Organization Name"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="org_type"
												label="Organization Type"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="parent_org_type"
												label="Parent Organization Type"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="board_comittee"
												label="Board Comittee"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="position_role"
												label="Position Role"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="affiliation_type"
												label="Affiliation Type"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="city"
												label="City"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="state"
												label="State"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="country"
												label="Country"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
										</div>
									}
									bodyFooter={<Paging />}
								/>
							</div>
						);
					}}
				</WithSearch>
			</div>
		</SearchProvider>
	);
}
