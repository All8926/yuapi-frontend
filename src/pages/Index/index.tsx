import { PageContainer  } from '@ant-design/pro-components';
import {List, message} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  listInterfaceInfoByPageUsingGet,
} from "@/services/api-backend/interfaceInfoController";
/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */


const Index: React.FC = () => {
 const [loading, setLoading] = useState(false)
  const [list, setList] = useState<API.InterfaceInfo[]>([])
  const [total, setTotal] = useState(0)

  const loadList = async (current:number = 1, pageSize:number = 10) => {
   setLoading(true)
   try {
     const res = await listInterfaceInfoByPageUsingGet({
        current ,
        pageSize
     })
      setList(res?.data?.records ?? [])
      setTotal(res?.data?.total ?? 0)
   }catch (error){
     message.error('加载失败‘,' + error?.message);
   }
   setLoading(false)
  }

  useEffect(() => {
    loadList()
  },[])

  return (
    <PageContainer title={'接口中心'}>
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit" href={`/interface_info/${item.id}`}>查看</a> ]}
          >
              <List.Item.Meta
                title={<a href={`/interface_info/${item.id}`} >{item.name}</a>}
                description={item.description}
              />
          </List.Item>
        )}
        pagination={{
          onChange: page => {
            loadList(page)
          },
          total,
          pageSize: 10
        }
        }
      />
    </PageContainer>
  );
};

export default Index;
