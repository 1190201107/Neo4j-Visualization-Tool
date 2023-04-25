import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Space } from "antd"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import {
  AddNode,
  GetAllLabelData,
  GetAllRelationNameData,
  GetAllPropertiesNameData,
} from "../../../../../Action"
import { useEffect } from "react"

export function CreateRelationship(visible, onCancel, onSave) {
  const dispatch = useDispatch()

  const onFinish = (values) => {
    console.log("Received values of form:", values)
  }

  return (
    <>
      <Modal visible={visible} onCancel={onCancel} onOk={handleSave}>
        <div className="information-first-title-add"> Add Relationship </div>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
          // {...formItemLayoutWithOutLabel}
        >
          <div className="information-second-title-add"> Type:</div>
          <Form.List name="type">
            <Input placeholder="Type" />
          </Form.List>
          <div className="information-second-title-add"> Property:</div>
          <Form.List name="properties">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 4,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "key"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing property key",
                        },
                      ]}
                    >
                      <Input placeholder="Key" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "value"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing property value",
                        },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Properties
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
