import React, { useState } from "react";
import { Modal, Form, Input, Button, Space, Select } from "antd";
import {
  MinusCircleOutlined,
  SwapRightOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { createRelationship, deleteRelationship } from "../../../Action";

//将数据格式properties: {name: "Tom", age: 18}转换为properties: [{key: "name", value: "Tom"}, {key: "age", value: 18}]
const formatProperties = (properties) => {
  const result = [];
  for (const key in properties) {
    result.push({ key, value: properties[key] });
  }
  return result;
};
//将数据格式properties: [{key: "name", value: "Tom"}, {key: "age", value: 18}]转换为properties: {name: "Tom", age: 18}
const formatPropertiesBack = (properties) => {
  const result = {};
  properties.forEach((item) => {
    if (item.key !== "") result[item.key] = item.value;
  });
  return result;
};

const CreateRelationShip = ({ visible, onCancel, setVisible }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [type, setType] = useState();
  const [properties, setProperties] = useState([{ key: "", value: "" }]);

  const handleLabelChange = (value) => {
    setType(value);
  };

  const handlePropertyAdd = () => {
    // 添加一个空的 key-value 对
    setProperties([...properties, { key: "", value: "" }]);
  };

  const handlePropertyRemove = (key) => {
    // 创建新的 properties 对象，删除指定的 key-value 对
    const newProperties = [...properties];
    //遍历newProperties，找到key并删除这个对象

    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties.splice(i, 1);
      }
    }
    setProperties(newProperties);
  };

  const handlePropertyKeyChange = (value, key) => {
    // console.log("handlePropertyKeyChange", value, key)
    const newProperties = [...properties];
    //遍历newProperties，找到key对应的索引，修改key
    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties[i].key = value;
      }
    }
    setProperties(newProperties);
  };

  const handlePropertyValueChange = (value, key) => {
    // console.log("handlePropertyValueChange", value, key)
    const newProperties = [...properties];
    //遍历newProperties，找到key对应的value，修改value
    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties[i].value = value;
      }
    }
    setProperties(newProperties);
  };

  const handleSave = () => {
    // 将 properties 转换为原始的格式
    if (showNodes === "select" || showNodes === "create") {
      const result = {
        start: {
          id: start.id,
          labels: start.labels,
          properties: start.properties,
        },
        end: { id: end.id, labels: end.labels, properties: end.properties },
        relationship: {
          type: type,
          properties: formatPropertiesBack(properties),
        },
      };
      console.log("handle save", showNodes, result);
      dispatch(createRelationship(result));
    } else {
      console.log("handle save", showNodes, relationShip);
      dispatch(deleteRelationship(relationShip));
    }

    setVisible(false);
  };

  const renderPropertyItem = (key, value) => {
    // console.log("renderPropertyItem", key, value)
    return (
      <Space className="render-item-container" key={key}>
        {/* key 的表单项 */}
        <Input
          value={key}
          placeholder="填写属性名"
          onChange={(e) => {
            handlePropertyKeyChange(e.target.value, key);
          }}
        />
        {/* value 的表单项 */}
        <Input
          value={value}
          placeholder="填写属性值"
          onChange={(e) => handlePropertyValueChange(e.target.value, key)}
        />
        <MinusCircleOutlined onClick={() => handlePropertyRemove(key)} />
      </Space>
    );
  };

  const [showNodes, setShowNodes] = useState("select");
  const types = useSelector((state) =>
    state.Graph.graphAllRelationName ? state.Graph.graphAllRelationName : []
  );
  const relationShip = useSelector((state) => state.Graph.createRelationship);
  const start = relationShip
    ? relationShip.start
    : { id: "", labels: [], properties: {} };
  const end = relationShip
    ? relationShip.end
    : { id: "", labels: [], properties: {} };

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleSave}>
      <div className="relation-switch-container">
        {showNodes === "select" && (
          <span className="select-title">选择已有关系</span>
        )}
        {showNodes === "create" && (
          <span className="select-title">创建新的关系 </span>
        )}
        {showNodes === "delete" && (
          <span className="select-title">删除两点关系 </span>
        )}
        <span className="relationship-switch">
          <span
            id="show-nodes-button"
            className={showNodes === "select" ? "relationship-selected" : ""}
            onClick={() => setShowNodes("select")}
          >
            Select
          </span>
          <span
            id="show-relationships-button"
            className={showNodes === "create" ? "relationship-selected" : ""}
            onClick={() => setShowNodes("create")}
          >
            Create
          </span>
          <span
            id="show-relationships-button"
            className={showNodes === "delete" ? "relationship-selected" : ""}
            onClick={() => setShowNodes("delete")}
          >
            Delete
          </span>
        </span>
      </div>
      <div className="code-message-container">
        <div className="node">id: {start.id}</div>
        <div className="node-cluster">
          <SwapRightOutlined />
        </div>
        <div className="node">id: {end.id}</div>
      </div>
      {showNodes === "select" && (
        <div className="relation-select-container">
          <div className="relation-select-title">关系类型: </div>
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="搜索关系类型并创建"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={types.map((item) => ({
              value: item,
              label: item,
            }))}
            onSelect={(value) => {
              setType(value);
            }}
          />
        </div>
      )}
      {showNodes === "create" && (
        <Form className="window-edit-modal-container" form={form}>
          <Form.Item label="关系类型" name="type">
            <Space className="render-item-container">
              <Input
                placeholder="填写关系类型"
                onChange={(e) => handleLabelChange(e.target.value)}
              />
            </Space>
          </Form.Item>

          <Form.Item label="关系属性" name="properties">
            {/* 渲染所有的 key-value 对 */}
            {properties.map((item) => renderPropertyItem(item.key, item.value))}
          </Form.Item>
          <Form.Item>
            <Button
              className="edit-modal-add-button"
              type="dashed"
              onClick={handlePropertyAdd}
            >
              <PlusOutlined /> 添加属性
            </Button>
          </Form.Item>
        </Form>
      )}
      {showNodes === "delete" && (
        <span className="relationship-second-title">点击OK删除两点关系 </span>
      )}
    </Modal>
  );
};

export default CreateRelationShip;
