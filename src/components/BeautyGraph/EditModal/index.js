import React, { useState } from "react"
import { Modal, Form, Input, Button, Space } from "antd"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const EditModal = ({ visible, onCancel, onSave }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.Graph.deleteNodeBeforeMessage)
  const [form] = Form.useForm()
  const [labels, setLabels] = useState(data.labels || [])
  const [properties, setProperties] = useState(data.properties || {})
  useEffect(() => {
    setLabels(data.labels || [])
    setProperties(data.properties || {})
  }, [data])

  //   useEffect(() => {
  //     form.resetFields()
  //   }, [data, form, visible])

  console.log("data---inmodal", data)
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
    setProperties({ ...properties, [""]: "" })
  }

  const handlePropertyRemove = (key) => {
    // 创建新的 properties 对象，删除指定的 key-value 对

    const newProperties = { ...properties }
    console.log("newProperties-before delete", newProperties)
    delete newProperties[key]
    console.log("newProperties-after delete", newProperties)
    setProperties(newProperties)
  }

  const handlePropertyKeyChange = (value, key) => {
    console.count("handlePropertyKeyChange")
    // 创建新的 properties 对象，修改指定的 key
    const newProperties = { ...properties }
    const valueCopy = newProperties[key]
    delete newProperties[key]
    newProperties[value] = valueCopy
    setProperties(newProperties)
  }

  const handlePropertyValueChange = (value, key) => {
    console.count("handlePropertyValueChange")
    // 创建新的 properties 对象，修改指定的 value
    const newProperties = { ...properties }
    newProperties[key] = value
    setProperties(newProperties)
  }

  const handleSave = () => {
    onSave({ labels, properties })

    // 校验表单，校验通过后调用 onSave
    // form.validateFields().then((values) => {
    //   onSave({ labels, properties, ...values })
    // })
  }

  const renderLabelItem = (label, index) => (
    <Space key={index}>
      <Input
        value={label}
        onBlur={(e) => handleLabelChange(e.target.value, index)}
      />
      <Button onClick={() => handleRemoveLabel(index)}>删除</Button>
    </Space>
  )

  const renderPropertyItem = (key, value) => (
    <Space key={key}>
      {/* key 的表单项 */}
      <Input
        value={key}
        onChange={(e) => handlePropertyKeyChange(e.target.value, key)}
      />
      {/* value 的表单项 */}
      <Input
        value={value}
        onChange={(e) => handlePropertyValueChange(e.target.value, key)}
      />
      <Button onClick={() => handlePropertyRemove(key)}>删除</Button>
    </Space>
  )

  return (
    <Modal visible={visible} onCancel={onCancel} onOk={handleSave}>
      <Form form={form} initialValues={data}>
        <Form.Item label="标签" name="labels">
          {labels.map(renderLabelItem)}
          <Button onClick={handleAddLabel}>添加标签</Button>
        </Form.Item>
        <Form.Item label="属性" name="properties">
          {/* 渲染所有的 key-value 对 */}
          {Object.entries(properties).map(([key, value]) =>
            renderPropertyItem(key, value)
          )}
          <Button onClick={handlePropertyAdd}>添加属性</Button>
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
