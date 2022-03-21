import React from 'react';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox, Facet, WithSearch } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';
import { MultiCheckboxFacet } from '@elastic/react-search-ui-views';
import { Paging } from '@elastic/react-search-ui';
import { PagingInfo } from '@elastic/react-search-ui';

import '@elastic/react-search-ui-views/lib/styles/styles.css';
import DownloadFile from './components/DownloadFile';

const connector = new AppSearchAPIConnector({
	searchKey: 'search-229rksjgu5nb5gm75fq9foxp',
	engineName: 'student-elasticsearch',
	endpointBase: 'https://student-elasticsearch.ent.us-central1.gcp.cloud.es.io',
	cacheResponses: true
});
const configurationOptions = {
	apiConnector: connector,

	searchQuery: {
		disjunctiveFacets: [ 'state', 'gender' ],
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
			country: { raw: {} },
			age: { raw: {} },
			grade: { raw: {} },
			height: { raw: {} }
		},
		facets: {
			state: { type: 'value' },
			gender: { type: 'value' }
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
			{ country: e.country.raw },
			{ age: e.age.raw },
			{ grade: e.grade.raw },
			{ height: e.height.raw }
		]);
	});
	return RawtoJsonArray;
};

export default function App() {
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
										<div>
											<PagingInfo />
											<br />
											<DownloadFile ResultData={resultdata} />
										</div>
									}
									bodyContent={results.map((r) => (
										<div>
											<h2>{r.lastname.raw}</h2>
											<p>{r.firstname.raw}</p>
											<p>{r.city.raw}</p>
											<p>{r.state.raw}</p>
											<p>
												{r.gender.raw} {r.studentstatus.raw}
											</p>
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
