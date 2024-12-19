import React, { memo, useContext } from 'react';
import NodeContainer from '../../components/NodeContainer';
import { ConfigContext } from '../../models/context';

export default memo((props: any) => {
  const { type, onClick, data } = props;
  const { settingMap, widgets, iconFontUrl,globalConfig } = useContext(ConfigContext);
  const nodeSetting = settingMap[type] || {};
  const NodeWidget = widgets[nodeSetting?.nodeWidget] || undefined;
  const nodeDescription = nodeSetting?.description || '';

  const hideDesc = nodeSetting?.nodePanel?.hideDesc ?? globalConfig?.nodePanel?.hideDesc ?? false;

  return (
    <NodeContainer
      className='custom-node-code'
      title={data?.title || nodeSetting.title}
      icon={{
        type: nodeSetting?.icon?.type,
        style: { fontSize: 14, color: '#fff' },
        bgColor: nodeSetting?.icon?.bgColor || '#F79009',
      }}
      onClick={onClick}
      hideDesc={hideDesc}
      desc={data?.desc}
      NodeWidget={NodeWidget ? <NodeWidget data={data} /> : undefined}
      iconFontUrl={iconFontUrl}
      description={nodeDescription} // 不允许用户更改的节点描述
      iconSvg={nodeSetting?.iconSvg}
    />
  );
});
