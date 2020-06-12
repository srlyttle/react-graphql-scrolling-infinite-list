import React, { FunctionComponent, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Input, Empty } from 'antd';
import { PageHeader } from 'antd';
import Repositories from '../components/repositories/repositories.component';
import Loading from '../components/loading/loading.component';
import {
  TRENDING_REPOSITORIES,
  filterRepositories,
} from '../apollo-client/queries/trendingRespositories';
import { ApolloError } from 'apollo-boost';
import { SearchData, RepositoryDetails } from '../models/common';
import './home.styles.scss';

const { Search } = Input;

const Home: FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  if (loading && networkStatus !== 3)
    return <Loading large={true} message="Loading data..."></Loading>;
  if (error) return <p>Error :(</p>;
  const repos = data && data.search ? data.search.edges : [];

  const onSearchChanged = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  const transformedRepos = repos
    .map((raw: any) => {
      const { node } = raw;
      return { ...node } as RepositoryDetails;
    })
    .filter((r) => {
      const term = searchTerm.toLowerCase();
      return searchTerm
        ? (r.description && r.description.toLowerCase().includes(term)) ||
            r.name.toLowerCase().includes(term) ||
            (r.primaryLanguage &&
              r.primaryLanguage.name.toLowerCase().includes(term))
        : r;
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
        const repositoryCount = fetchMoreResult.search.repositoryCount;
        return newEdges.length
          ? {
              search: {
                __typename: prevResult.search.__typename,
                edges: [...prevResult.search.edges, ...newEdges],
                pageInfo,
                repositoryCount,
              },
            }
          : prevResult;
      },
    });
  };

  return (
    <div className="home-page">
      <PageHeader
        className="site-page-header"
        title="Highest trending Repositories this week"
        subTitle="Based on stars"
      />
      <div className="home-search"></div>
      <Search
        placeholder="input search loading with enterButton"
        loading={networkStatus === 3}
        enterButton
        allowClear
        onChange={onSearchChanged}
      />
      {transformedRepos && transformedRepos.length > 0 ? (
        <Repositories repos={transformedRepos} loadMoreRepos={onLoadMore} />
      ) : (
        <Empty />
      )}
      {networkStatus === 3 && (
        <Loading large={false} message="Getting more data..."></Loading>
      )}
    </div>
  );
};

export default Home;
