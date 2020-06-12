import React, { FunctionComponent } from 'react';
import { Waypoint } from 'react-waypoint';
import { RepositoriesProps } from '../../models/common';
import RepositoryItem from './repository-item.component';
import './repositories.styles.scss';

const Repositories: FunctionComponent<RepositoriesProps> = ({
  repos,
  loadMoreRepos,
}) => {
  return (
    repos && (
      <ul className="repository-list">
        {repos.map((repository, index) => {
          return (
            <div key={index}>
              <RepositoryItem repositoryDetails={repository} />
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
