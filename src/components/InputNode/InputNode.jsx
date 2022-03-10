import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';
import { Input } from 'antd';
import './style.css'

export default memo((props) => {
    const { data, isConnectable } = props
    const { customNodeData } = props.data
    const [value, setValue] = useState(customNodeData || '');
    const change = (e) => {
        const val = e.target.value;
        setValue(val)
        props.data.inputValue = val
        // console.log(val, props);
    }
    return (
        <div className='inputNode' >
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
            <Input value={value} onInput={e => change(e)} />
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