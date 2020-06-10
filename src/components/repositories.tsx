import React, { FunctionComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import { RepositoriesProps } from '../models/common';

const Repositories: FunctionComponent<RepositoriesProps> = ({
  loading,
  repos,
  loadMoreRepos,
}) => {
  // console.log('repos length', repos.length);
  return (
    repos && (
      <ul>
        {repos.map((repository, index) => {
          return (
            <div key={index}>
              <li>
                <h3>
                  {repository.name} - {repository.owner.login}
                </h3>
                <p>{repository.description}</p>
                <p>
                  ★ {repository.stargazers.totalCount} -{' '}
                  {repository.primaryLanguage &&
                    repository.primaryLanguage.name}{' '}
                </p>
              </li>
              {index === repos.length - 5 && (
                <Waypoint onEnter={() => loadMoreRepos()}></Waypoint>
              )}
            </div>
          );
        })}
      </ul>
    )
  );
};

export default Repositories;
