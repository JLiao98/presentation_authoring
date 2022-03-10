import React, { useState } from 'react';
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
} from 'react-flow-renderer';
import { Input } from 'antd';
import './style.css';

const foreignObjectSize = 80;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
    alert(`remove ${id}`);
};

const InputEdge = (props) => {
    const {
        id,
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
        style = {},
        data,
        arrowHeadType,
        markerEndId,
    } = props
    const [visible, setVisible] = useState(false)
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });
    const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
    const [edgeCenterX, edgeCenterY] = getEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });
    // custom edge input
    const change = (e) => {
        const val = e.target.value;
        props.data.inputValue = val
        // console.log(val, props);
    }
    //  通过点击 显示 custom edge input
    const clickSpan = () => {
        setVisible(true)
    }
    //  关闭 custom edge input
    const close = () => {
        setVisible(false)
    }
    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize * 1.5}
                height={foreignObjectSize - 20}
                x={edgeCenterX - foreignObjectSize / 1.4}
                y={edgeCenterY - foreignObjectSize / 2}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <div className={visible ? "box clicked" : "box"}>
                        <span className='edge-span' onClick={clickSpan} style={{ display: visible ? "none" : 'inline-block' }}>点击输入</span>
                        <Input style={{ display: visible ? "" : 'none' }} className="edge-input" onInput={e => change(e)} />
                        <span className='close' style={{ display: visible ? "inline-block" : 'none' }} onClick={close}>X</span>
                    </div>
                </body>
            </foreignObject>
        </>
    );
}
export default InputEdge