import React from 'react';
import AppSearchAPIConnector from '@elastic/search-ui-app-search-connector';
import { SearchProvider, Results, SearchBox } from '@elastic/react-search-ui';
import { Layout } from '@elastic/react-search-ui-views';

import '@elastic/react-search-ui-views/lib/styles/styles.css';

const connector = new AppSearchAPIConnector({
	searchKey: 'search-229rksjgu5nb5gm75fq9foxp',
	engineName: 'student-elasticsearch',
	endpointBase: 'https://student-elasticsearch.ent.us-central1.gcp.cloud.es.io',
	cacheResponses: false
});
export default function App() {
	return (
		<SearchProvider
			config={{
				apiConnector: connector
			}}
		>
			<div className="App">
				<Layout header={<SearchBox />} bodyContent={<Results titleField="firstname" />} />
			</div>
		</SearchProvider>
	);
}
