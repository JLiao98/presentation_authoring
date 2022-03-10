import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';
import { Input, Image } from 'antd';
import './style.css'

export default memo((props) => {
    const { data, isConnectable } = props
    const { customNodeData } = props.data
    const [value, setValue] = useState(customNodeData || '');
    const [src, setSrc] = useState('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
    const change = (e) => {
        const val = e.target.value;
        setSrc(val)
        props.data.imgSrc = val
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
                input img 输入框: <strong>{data.color}</strong>
            </div>
            <Input onInput={e => change(e)} />
            <Image
                className='antdImg'
                width={100}
                src={src}
            />
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