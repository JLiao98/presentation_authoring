import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { Select } from 'antd';
import './style.css'
const { Option } = Select;

export default memo(({ data, isConnectable }) => {
    const handleChange = (value) => {
        data.selectValue = value
        console.log(`selected ${value}`, data);
    }
    return (
        <div className='selectNode'>
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
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                    Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <Handle
                type="source"
                position="right"
                id="a"
                isConnectable={isConnectable}
            />
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