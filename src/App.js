import React from 'react';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';

import '@elastic/react-search-ui-views/lib/styles/styles.css';

const connector = new AppSearchAPIConnector({
	searchKey: 'search-229rksjgu5nb5gm75fq9foxp',
	engineName: 'student-elasticsearch',
	endpointBase: 'https://student-elasticsearch.ent.us-central1.gcp.cloud.es.io',
	cacheResponses: true
});
const configurationOptions = {
	apiConnector: connector,
	searchQuery: {
		disjunctiveFacets: [ 'gender' ],
		disjunctiveFacetsAnalyticsTags: [ 'Ignore' ],
		search_fields: {
			lastname: {},
			city: {},
			firstname: {},
			country: {},
			gender: {}
		},
		result_fields: {
			lastname: {
				snippet: {
					size: 100,
					fallback: true
				}
			},
			studentstatus: {
				snippet: {
					size: 100,
					fallback: true
				}
			},

			firstname: {
				snippet: {
					size: 100,
					fallback: true
				}
			}
		},
		facets: {
			state: { type: 'value', size: 30 }
		}
	},
	hasA11yNotifications: true,
	a11yNotificationMessages: {
		searchResults: ({ start, end, totalResults, searchTerm }) =>
			`Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
	},
	alwaysSearchOnInitialLoad: true
};

export default function App() {
	return (
		<SearchProvider config={configurationOptions}>
			<div className="App">
				<Layout header={<SearchBox />} bodyContent={<Results titleField="lastname" />} />
			</div>
		</SearchProvider>
	);
}
