import React, { FunctionComponent } from 'react';
import { Spin, Row, Col } from 'antd';
import cx from 'classnames';
import './loading.styles.scss';

export interface MessageProps {
  message: string;
  large: boolean;
}
const Loading: FunctionComponent<MessageProps> = ({ message, large }) => {
  return (
    <>
      <>
        <Row
          className={cx({
            'loading-wrapper-large': large,
          })}
        >
          <Col span={24} offset={12}>
            <Spin tip={message} />
          </Col>
        </Row>
      </>
    </>
  );
};

export default Loading;
