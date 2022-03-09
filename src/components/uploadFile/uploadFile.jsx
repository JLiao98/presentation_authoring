import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './style.css'

export default memo(({ data, isConnectable }) => {
    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    return (
        <div className='uploadFileNode'>
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
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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