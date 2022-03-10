import React, { useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  MiniMap
} from 'react-flow-renderer';
import { Button } from 'antd';

import RightSidebar from '../Sidebar/RightSidebar.jsx';
import LeftSidebar from '../Sidebar/LeftSidebar.jsx';
import TopBar from '../TopBar/TopBar'

//  custom node
import InputNode from '../InputNode/InputNode';
import Select from '../select/select'
import InputImg from '../InputImgNode/InputImgNode'


//  custom edge
import InputEdge from '../CustomEdge/InputEdge/InputEdge.jsx';

import './style.css'



//  初始 画布数据
const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input node' },
    position: { x: 250, y: 5 },
  },
];
//  配置 custom node
const nodeTypes = {
  inputNode: InputNode,
  select: Select,
  inputImg: InputImg
};
//  配置 custom edg
const edgeTypes = {
  inputEdge: InputEdge,
};
let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  //  当用户连接两个节点时调用
  const onConnect = (params) => {
    params.data = {}
    params.type = 'inputEdge'
    setElements((els) => addEdge(params, els))
    console.log(JSON.stringify(elements, 'NODE JSON'));
  };
  const getDataBtnClick = () => {
    console.log(elements);
  }
  //  当用户在画布上右击时调用
  const onPaneContextMenu = (event) => {
    console.log(elements);
  }
  //  当用户删除节点或边时调用  使用退格键
  const onElementsRemove = (elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }
  //   在流程初始化后调用
  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  }
  //  拖拽 移动
  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  //  拖拽 结束
  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const customNodeData = event.dataTransfer.getData('application/customNodeData');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node`, customNodeData },
    };
    setElements((es) => es.concat(newNode));
    console.log(JSON.stringify(elements, 'NODE JSON'));
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <TopBar />
        <div className="reactflow-wrapper" ref={reactFlowWrapper} style={{ height: "100vh" }}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onPaneContextMenu={onPaneContextMenu}
          >
            <MiniMap
              nodeColor={(node) => {
                switch (node.type) {
                  case 'input':
                    return '#ea7ccc';
                  case 'select':
                    return '#5470c6';
                  case 'inputNode':
                    return '#91cc75';
                  default:
                    return '#fac858';
                }
              }}
              nodeStrokeWidth={3}
            />
            <Controls />
          </ReactFlow>
        </div>
        <RightSidebar />
        <LeftSidebar />
        <Button className='getDataBtn' type='primary' onClick={getDataBtnClick}>获取node、edge数据</Button>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;