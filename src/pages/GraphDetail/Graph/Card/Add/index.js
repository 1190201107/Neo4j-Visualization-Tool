import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Space } from "antd"

const onFinish = (values) => {
  console.log("Received values of form:", values)
  alert("提交的values", values)
}
//配置输入框的位置
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
}
//配置输入框的位置
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
}
const Add = () => (
  <div
    // 超出部分显示滚动条
    style={{
      "max-height": "500px",
      "overflow-y": "auto",
      "overflow-x": "hidden",
    }}
  >
    <div>添加节点</div>
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      // {...formItemLayoutWithOutLabel}
    >
      <div>标签：</div>
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
                  // {...(key === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  name={[name, "标签"]}
                  // label={key === 0 ? "标签" : ""}
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
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div>属性：</div>
      <Form.List name="property">
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
                  // {...(key === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  name={[name, "属性"]}
                  // label={key === 0 ? "属性" : ""}
                  rules={[
                    {
                      required: true,
                      message: "需要填写节点属性",
                    },
                  ]}
                >
                  <Input placeholder="Property" />
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
                Add field
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
)
export default Add
