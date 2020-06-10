import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Repositories from './components/repositories';
import {
  TRENDING_REPOSITORIES,
  filterRepositories,
} from './apollo-client/queries/trendingRespositories';
import { ApolloError } from 'apollo-boost';
import { SearchData } from './models/common';

function App() {
  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  }: {
    loading: boolean;
    error?: ApolloError;
    data?: SearchData;
    fetchMore: Function;
    networkStatus: number;
  } = useQuery(TRENDING_REPOSITORIES, {
    variables: { query: filterRepositories },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error :(</p>;
  const repos = data && data.search ? data.search.edges : [];

  const transformedRepos = repos.map((raw: any) => {
    const { node } = raw;
    return { ...node };
  });

  const onLoadMore = () => {
    return fetchMore({
      variables: {
        variables: { query: filterRepositories },
        cursor: data && data.search ? data.search.pageInfo.endCursor : null,
      },
      updateQuery: (
        prevResult: any,
        { fetchMoreResult }: { fetchMoreResult?: any }
      ) => {
        if (!fetchMoreResult) {
          return prevResult;
        }

        const newEdges = fetchMoreResult.search.edges;
        const pageInfo = fetchMoreResult.search.pageInfo;
        return newEdges.length
          ? {
              search: {
                __typename: prevResult.search.__typename,
                edges: [...prevResult.search.edges, ...newEdges],
                pageInfo,
              },
            }
          : prevResult;
      },
    });
  };
  // console.log('data', data);
  return (
    <div>
      <Repositories
        repos={transformedRepos}
        loading={loading}
        loadMoreRepos={onLoadMore}
      />
      {networkStatus === 3 && <div>loading more repos ......</div>}
    </div>
  );
}

export default App;
