import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { Input, Button } from 'antd';
import './style.css'

export default memo(({ data, isConnectable }) => {
    return (
        <div className='inputNode'>
            <Handle
                type="target"
                position="left"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
                isConnectable={isConnectable}
            />
            <div>
                input 输入框: <strong>{data.color}</strong>
            </div>
            {/* <input
                className="nodrag"
                type="color"
                onChange={data.onChange}
                defaultValue={data.color}
            /> */}
            <Input />
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ background: '#555', width: 10, height: "100%" }}
                isConnectable={isConnectable}
            />
            <Button type="primary" style={{ marginTop: 10 }}>按钮</Button>
            {/* <Handle
                type="source"
                position="right"
                id="b"
                style={{ bottom: 10, top: 'auto', background: '#555' }}
                isConnectable={isConnectable}
            /> */}
        </div>
    );
});