import {PageContainer} from '@ant-design/pro-components';
import {Descriptions, Input, message, Tag, Form, Button} from 'antd';
import {  useParams} from '@umijs/max';
import {Card, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  getInterfaceInfoByIdUsingGet
} from "@/services/api-backend/interfaceInfoController";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */


const InterfaceInfo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<API.InterfaceInfo>([])
  const params = useParams()

  const loadList = async () => {
    setLoading(true)
    try {
      const res = await getInterfaceInfoByIdUsingGet({
        id:Number(params.id)
      })
      setData(res?.data ?? {} )
    } catch (error) {
      message.error('加载失败‘,' + error.message);
    }
    setLoading(false)
  }

  useEffect(() => {
    loadList()
  }, [])
  return (
    <PageContainer  >
    <Card title={ data.status === 1 ? <Tag icon={<CheckCircleOutlined />} color="success">正常 </Tag> :
         <Tag icon={<CloseCircleOutlined />} color="error"> 已关闭 </Tag> }
          extra={<a href="#" onClick={() => history.back()}>返回</a>}>
      <Descriptions title={data.name} column={1}>

        <Descriptions.Item label="描述：">{data.description}</Descriptions.Item>
        <Descriptions.Item label="url：">{data.url}</Descriptions.Item>
        <Descriptions.Item label="方法：">{data.method}</Descriptions.Item>
        <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
        <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{data.createTime} </Descriptions.Item>
        <Descriptions.Item label="更新时间">{data.updateTime} </Descriptions.Item>
      </Descriptions>

    </Card>
      <Card>
        <Form
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={(values) => {
            console.log(values)
          } }
          autoComplete="off"
        >
          <Form.Item
            label="请求参数"
            name="requestParams"
            rules={[{ required: true, message: '请求参数不能为空!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item  >
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </PageContainer>
  );
};

export default InterfaceInfo;
