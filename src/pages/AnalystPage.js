import React from 'react';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox, Facet, WithSearch } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import { MultiCheckboxFacet } from '@elastic/react-search-ui-views';
import { Paging } from '@elastic/react-search-ui';
import { PagingInfo } from '@elastic/react-search-ui';
import '../App.css';

import '@elastic/react-search-ui-views/lib/styles/styles.css';
import DownloadFileAnalyst from '../components/DownloadFIleAnalyst';
import Logoutbtn from '../components/Logoutbtn';

const connector = new AppSearchAPIConnector({
	searchKey: 'search-229rksjgu5nb5gm75fq9foxp',
	engineName: 'student-elasticsearch',
	endpointBase: 'https://student-elasticsearch.ent.us-central1.gcp.cloud.es.io',
	cacheResponses: false
});
const configurationOptions = {
	apiConnector: connector,

	searchQuery: {
		disjunctiveFacets: [ 'state', 'gender', 'major', 'studentstatus', 'country' ],
		disjunctiveFacetsAnalyticsTags: [ 'Ignore' ],
		search_fields: {
			lastname: {},
			city: {},
			firstname: {},
			country: {},
			gender: {}
		},
		result_fields: {
			lastname: { raw: {} },
			firstname: { raw: {} },
			city: { raw: {} },
			state: { raw: {} },
			gender: { raw: {} },
			studentstatus: { raw: {} },
			major: { raw: {} },
			country: { raw: {} }
		},
		facets: {
			state: { type: 'value' },
			gender: { type: 'value' },
			major: { type: 'value' },
			studentstatus: { type: 'value' },
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
			{ lastname: e.lastname.raw },
			{ firstname: e.firstname.raw },
			{ city: e.city.raw },
			{ state: e.state.raw },
			{ gender: e.gender.raw },
			{ studentstatus: e.studentstatus.raw },
			{ major: e.major.raw },
			{ country: e.country.raw }
		]);
	});
	return RawtoJsonArray;
};

export default function AnalystPage() {
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<WithSearch
					mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({
						searchTerm,
						setSearchTerm,
						results
					})}
				>
					{({ results }) => {
						let resultdata = ConvertRawDatatoJson(results);
						return (
							<div>
								<Layout
									header={<SearchBox inputProps={{ placeholder: 'Search for Student details' }} />}
									bodyHeader={
										<div className="container-btn">
											<Logoutbtn />
											<PagingInfo />
											<br />
											<div className="Download-btn">
												<DownloadFileAnalyst ResultData={resultdata} />
											</div>
										</div>
									}
									bodyContent={results.map((r) => (
										<div className="Card">
											<h2 style={{ color: '#3259ED' }}>{r.lastname.raw}</h2>
											<div className="Card-field">
												<p>Firstname : {r.firstname.raw}</p>
												<p>City : {r.city.raw}</p>
												<p>State : {r.state.raw}</p>
												<p>Gender: {r.gender.raw}</p>
												<p>Student Status: {r.studentstatus.raw}</p>
												<p>Major: {r.major.raw}</p>
												<p>Country: {r.country.raw}</p>
											</div>
										</div>
									))}
									sideContent={
										<div>
											<Facet
												field="state"
												label="States"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="gender"
												label="gender"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="major"
												label="major"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="studentstatus"
												label="studentstatus"
												view={MultiCheckboxFacet}
												filterType="any"
											/>
											<Facet
												field="country"
												label="country"
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
