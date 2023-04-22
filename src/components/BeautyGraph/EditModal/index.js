import React, { useState } from "react"
import { Modal, Form, Input, Button, Space } from "antd"
import {
  CheckOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"

//将数据格式properties: {name: "Tom", age: 18}转换为properties: [{key: "name", value: "Tom"}, {key: "age", value: 18}]
const formatProperties = (properties) => {
  const result = []
  for (const key in properties) {
    result.push({ key, value: properties[key] })
  }
  return result
}
//将数据格式properties: [{key: "name", value: "Tom"}, {key: "age", value: 18}]转换为properties: {name: "Tom", age: 18}
const formatPropertiesBack = (properties) => {
  const result = {}
  properties.forEach((item) => {
    result[item.key] = item.value
  })
  return result
}

const EditModal = ({ visible, onCancel, onSave }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.Graph.deleteNodeBeforeMessage)
  const [form] = Form.useForm()
  const [labels, setLabels] = useState(data.labels || [])
  const [properties, setProperties] = useState(
    formatProperties(data.properties) || []
  )
  useEffect(() => {
    setLabels(data.labels || [])
    setProperties(formatProperties(data.properties) || [])
  }, [data])

  //   useEffect(() => {
  //     form.resetFields()
  //   }, [data, form, visible])

  // console.log("data---inmodal", data)
  const handleAddLabel = () => {
    setLabels([...labels, ""])
  }

  const handleRemoveLabel = (index) => {
    const newLabels = [...labels]
    newLabels.splice(index, 1)
    setLabels(newLabels)
  }

  const handleLabelChange = (value, index) => {
    const newLabels = [...labels]
    newLabels[index] = value
    setLabels(newLabels)
  }

  const handlePropertyAdd = () => {
    // 添加一个空的 key-value 对
    setProperties([...properties, { key: "", value: "" }])
  }

  const handlePropertyRemove = (key) => {
    // 创建新的 properties 对象，删除指定的 key-value 对
    const newProperties = [...properties]
    //遍历newProperties，找到key并删除这个对象

    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties.splice(i, 1)
      }
    }
    setProperties(newProperties)
  }

  const handlePropertyKeyChange = (value, key) => {
    // console.log("handlePropertyKeyChange", value, key)
    const newProperties = [...properties]
    //遍历newProperties，找到key对应的索引，修改key
    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties[i].key = value
      }
    }
    setProperties(newProperties)
  }

  const handlePropertyValueChange = (value, key) => {
    // console.log("handlePropertyValueChange", value, key)
    const newProperties = [...properties]
    //遍历newProperties，找到key对应的value，修改value
    for (let i = 0; i < newProperties.length; i++) {
      if (newProperties[i].key === key) {
        newProperties[i].value = value
      }
    }
    setProperties(newProperties)
  }

  const handleSave = () => {
    // 将 properties 转换为原始的格式
    onSave({ labels, properties: formatPropertiesBack(properties) })

    // 校验表单，校验通过后调用 onSave
    // form.validateFields().then((values) => {
    //   onSave({ labels, properties, ...values })
    // })
  }

  const renderLabelItem = (label, index) => (
    <Space className="render-item-container" key={index}>
      <Input
        value={label}
        onChange={(e) => handleLabelChange(e.target.value, index)}
      />
      <MinusCircleOutlined onClick={() => handleRemoveLabel(index)} />
    </Space>
  )

  const renderPropertyItem = (key, value) => {
    // console.log("renderPropertyItem", key, value)
    return (
      <Space className="render-item-container" key={key}>
        {/* key 的表单项 */}
        <Input
          value={key}
          onChange={(e) => {
            handlePropertyKeyChange(e.target.value, key)
          }}
        />
        {/* value 的表单项 */}
        <Input
          value={value}
          onChange={(e) => handlePropertyValueChange(e.target.value, key)}
        />
        <MinusCircleOutlined onClick={() => handlePropertyRemove(key)} />
      </Space>
    )
  }

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleSave}>
      <Form
        className="window-edit-modal-container"
        form={form}
        initialValues={data}
      >
        <Form.Item label="标签" name="labels">
          {labels.map(renderLabelItem)}
        </Form.Item>

        <Form.Item>
          <Button
            className="edit-modal-add-button"
            type="dashed"
            onClick={handleAddLabel}
          >
            <PlusOutlined /> 添加标签
          </Button>
        </Form.Item>

        <Form.Item label="属性" name="properties">
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

        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default EditModal
