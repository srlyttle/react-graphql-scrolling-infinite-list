import React, { FunctionComponent } from 'react';
import { RepositoryItemProps } from '../../models/common';
import { Card } from 'antd';

const RepositoryItem: FunctionComponent<RepositoryItemProps> = ({
  repositoryDetails,
}) => {
  const {
    description,
    name,
    owner,
    primaryLanguage,
    stargazers,
  } = repositoryDetails;

  const title = `${name} - ${owner.login}`;
  const language = primaryLanguage ? primaryLanguage.name : 'uknown';
  return (
    <li>
      <Card title={title}>
        <Card type="inner" title={description}>
          {language}
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Stars">
          {stargazers.totalCount}
        </Card>
      </Card>
    </li>
  );
};

export default RepositoryItem;
