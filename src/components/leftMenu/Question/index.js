import React, { useState } from "react"
import { Modal, Button, Form, Input, Collapse } from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons"
import "./index.css" // 引入自定义样式

const { Panel } = Collapse

const FAQPage = () => {
  return (
    <>
      <div>
        <div className="question-box">
          <h1 className="title">常见问题</h1>
          <Collapse accordion>
            <Panel
              header="问题1：如何创建一个新的节点？"
              key="1"
              className="question"
            >
              <p>你可以使用Cypher语句创建一个新的节点，例如：</p>
              <code className="code">CREATE (:Label</code>
              <p>其中Label是节点的标签，key和value是属性的键值对。</p>
            </Panel>
            <Panel
              header="问题2：如何在两个节点之间创建一个关系？"
              key="2"
              className="question"
            >
              <p>你可以使用Cypher语句创建一个新的关系，例如：</p>
              <code className="code">MATCH (n1:Label1</code>
              <p>
                其中Label1和Label2是两个节点的标签，key和value是两个节点的属性键值对，RELATIONSHIP是关系的类型。
              </p>
            </Panel>
            <Panel
              header="问题3：如何删除一个节点？"
              key="3"
              className="question"
            >
              <p>你可以使用Cypher语句删除一个节点，例如：</p>
              <code className="code">MATCH</code>
              <p>其中Label是节点的标签，key和value是属性的键值对。</p>
            </Panel>
          </Collapse>
        </div>
        <AnonymousFeedback />
      </div>
    </>
  )
}

const FeedbackForm = ({ visible, onCancel, onSubmit }) => {
  const [feedback, setFeedback] = useState("")

  const handleOk = () => {
    onSubmit(feedback)
    setFeedback("")
  }

  return (
    <Modal
      title="匿名问题反馈"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={!feedback}
          onClick={handleOk}
        >
          提交
        </Button>,
      ]}
    >
      <Form>
        <Form.Item label="反馈内容" required>
          <Input.TextArea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="请输入您的问题或反馈内容"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

const AnonymousFeedback = () => {
  const [visible, setVisible] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSubmit = (feedback) => {
    setFeedbacks([...feedbacks, feedback])
    setVisible(false)
  }

  return (
    <div className="anonymous-feedback">
      <Button
        type="primary"
        icon={<QuestionCircleOutlined />}
        onClick={() => setVisible(true)}
      >
        提交匿名问题反馈
      </Button>
      <FeedbackForm
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
      <div className="feedback-list">
        <h4>最近的反馈:</h4>
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>{feedback}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FAQPage
