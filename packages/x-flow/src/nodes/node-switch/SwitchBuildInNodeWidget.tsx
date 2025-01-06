import { Space, Typography } from 'antd';
import classNames from 'classnames';
import React, { memo } from 'react';
import { shallow } from 'zustand/shallow';
import SourceHandle from '../../components/CustomNode/sourceHandle';
import { useStore } from '../../hooks/useStore';
import { uuid } from '../../utils';
import './index.less';

const { Paragraph } = Typography;

export default memo((props: any) => {
  const {
    data,
    position,
    isConnectable,
    selected,
    isHovered,
    handleAddNode,
    CustomNodeWidget,
    isSwitchBottom,
    nodeSetting,
  } = props;
  const { switchExtra } = nodeSetting;

  const { nodes, edges } = useStore(
    (state: any) => ({
      nodes: state.nodes,
      edges: state.edges,
    }),
    shallow
  );

  const renderTitle = (item, index) => (
    <div className="item-header">
      <div className="item-title">
        {switchExtra?.titleKey
          ? item[switchExtra?.titleKey]
          : item?.title || `条件${index}`}
      </div>
      <SourceHandle
        position={position}
        isConnectable={
          (edges || [])?.filter(flow => flow?.sourceHandle === item?._id)
            ?.length === 0
        }
        selected={selected}
        isHovered={isHovered}
        handleAddNode={data => {
          handleAddNode(data, item?._id);
        }}
        id={item?._id}
        className="item-handle"
      />
    </div>
  );

  const renderContent = (item, index) => {
    const value = switchExtra?.valueKey
      ? item[switchExtra?.valueKey]
      : item?.value;

    return (
      <div className="item-content">
        {CustomNodeWidget ? (
          <CustomNodeWidget data={item} index={index} />
        ) : (
          <>
            {value && (
              <Paragraph
                className="item-content-in"
                ellipsis={{
                  rows: 5,
                  tooltip: {
                    title: value,
                    color: '#ffff',
                    overlayInnerStyle: {
                      color: '#354052',
                      fontSize: '12px',
                    },
                    getPopupContainer: () =>
                      document.getElementById('xflow-container'),
                  },
                }}
              >
                {value}
              </Paragraph>
            )}
          </>
        )}
      </div>
    );
  };

  return (
    <Space
      direction={isSwitchBottom ? 'horizontal' : 'vertical'}
      className={classNames('node-switch-widget', {
        'node-switch-widget-bottom': isSwitchBottom,
      })}
      size={5}
    >
      {(data?.list || [{ _id: `id_${uuid()}` }])?.map((item, index) => (
        <div
          className={classNames('node-switch-widget-item', {
            'node-switch-bottom-item': isSwitchBottom,
          })}
          key={index}
        >
          {isSwitchBottom ? (
            <>
              {renderContent(item, index)}
              {renderTitle(item, index)}
            </>
          ) : (
            <>
              {renderTitle(item, index)}
              {renderContent(item, index)}
            </>
          )}
        </div>
      ))}
      {!switchExtra?.hideElse && (
        <div
          className={classNames('node-switch-widget-item', {
            'node-switch-bottom-item': isSwitchBottom,
          })}
        >
          <div className="item-header">
            <div className="item-title">默认</div>
            <SourceHandle
              position={position}
              isConnectable={
                (edges || [])?.filter(flow => flow?.sourceHandle === 'id_else')
                  ?.length === 0
              }
              selected={selected}
              isHovered={isHovered}
              handleAddNode={data => {
                handleAddNode(data, 'id_else');
              }}
              className="item-handle"
              id={'id_else'}
            />
          </div>
        </div>
      )}
    </Space>
  );
});
