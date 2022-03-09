import React from 'react';
import './style.css'
import { Input, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };
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
        <aside className='right-aside'>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'selectorNode')} draggable>
                Default Node
                <Input />
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'uploadFile')} draggable>
                uploadFile Node
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </div>
        </aside>
    );
};