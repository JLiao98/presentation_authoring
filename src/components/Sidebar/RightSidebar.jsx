import React from 'react';
import './style.css'
import { Input, Select, Image } from 'antd';

const { Option } = Select;
const RightSiderBar = () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
        if (nodeType === 'inputNode') {
            event.dataTransfer.setData('application/customNodeData', event.target.children[0].value || '');
        }

    };
    function handleChange(value) {
        // console.log(`selected ${value}`);
    }
    return (
        <aside className='right-aside '>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'inputNode')} draggable>
                input Node
                <Input />
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'select')} draggable>
                uploadFile Node
                <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
            <div className="dndnode inputImgNode" onDragStart={(event) => onDragStart(event, 'inputImg')} draggable>
                input img Node
                <Input />
                <Image
                    className='antdImg'
                    width={50}
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
            </div>
        </aside>
    );
};
export default RightSiderBar