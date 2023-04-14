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

export default function Add() {
  const dispatch = useDispatch()

  const onFinish = (values) => {
    if (values && values.labels && values.properties) {
      //格式化Labels
      let formatLabels = []
      values.labels.forEach((item) => {
        formatLabels.push(item.label)
      })
      values.labels = formatLabels

      //格式化Properties
      let formatProperties = {}
      values.properties.forEach((item) => {
        formatProperties[item.key] = item.value
      })
      values.properties = formatProperties
      dispatch(AddNode(values))
    }
  }

  const stateOfAdd = useSelector((state) => {
    return {
      stateOfAdd: state.Graph.addNode,
    }
  })

  useEffect(() => {
    if (stateOfAdd == "OK") {
      dispatch(GetAllLabelData())
      dispatch(GetAllRelationNameData())
      dispatch(GetAllPropertiesNameData())
    }
  }, [stateOfAdd])

  return (
    <>
      <div
        className="label-box"
        // 超出部分显示滚动条
        style={{
          "max-height": "500px",
          "overflow-y": "auto",
          "overflow-x": "hidden",
        }}
      >
        <div className="information-first-title-add"> 添加节点 </div>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
          // {...formItemLayoutWithOutLabel}
        >
          <div className="information-second-title-add"> Label:</div>
          <Form.List name="labels">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 2,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "label"]}
                      rules={[
                        {
                          required: true,
                          message: "需要填写节点标签",
                        },
                      ]}
                    >
                      <Input placeholder="Labels" />
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
                    Add labels
                  </Button>
                </Form.Item>
              </>
            )}
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
      </div>
    </>
  )
}
