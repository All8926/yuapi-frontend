import {addRule, removeRule, updateRule} from '@/services/ant-design-pro/api';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message} from 'antd';
import React, {useRef, useState} from 'react';
import type {FormValueType} from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {SortOrder} from "antd/lib/table/interface";
import {
  addInterfaceInfoUsingPost,
  deleteInterfaceInfoUsingPost,
  listInterfaceInfoByPageUsingGet,
  offLineInterfaceInfoUsingPost,
  onLineInterfaceInfoUsingPost,
  updateInterfaceInfoUsingPost
} from "@/services/api-backend/interfaceInfoController";
import {RequestData} from "@ant-design/pro-table/lib";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";


const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);


  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    console.log(fields)
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPost({
        ...fields,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
      handleModalOpen(false)
    } catch (error) {
      console.log(error)
      hide();
      message.error('操作失败，' + error.message);
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfo) => {
    const updateFields = {...currentRow, ...fields}
    const hide = message.loading('更新中');
    try {
      await updateInterfaceInfoUsingPost({...updateFields});
      hide();
      message.success('操作成功');
      handleUpdateModalOpen(false)
      actionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('操作失败，' + error.message);
    }
  };

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRow: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');

    try {
      await deleteInterfaceInfoUsingPost({
        id: selectedRow.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('操作失败‘,' + error.message);
    }
  };

  /**
   *  OnLine node
   * @zh-CN 开启
   *
   * @param selectedRows
   */
  const handleOnLine = async (record: API.IdRequest) => {
    const hide = message.loading('正在开启');

    try {
      await onLineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('操作失败‘,' + error.message);
    }
  };

  /**
   *  OnLine node
   * @zh-CN 关闭
   *
   * @param selectedRows
   */
  const handleOffLine = async (record: API.IdRequest) => {
    const hide = message.loading('正在关闭');

    try {
      await offLineInterfaceInfoUsingPost({
        id: record.id,
      });
      hide();
      message.success('操作成功');
      actionRef.current?.reloadAndRest?.();
    } catch (error) {
      hide();
      message.error('操作失败‘,' + error.message);
    }
  };


  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: "index",
    },
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '接口名称不能为空'
          }
        ]
      }
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请求方法不能为空'
          }
        ]
      }
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'url不能为空'
          }
        ]
      }
    },

    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '描述不能为空'
          }
        ]
      }
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请求头不能为空'
          }
        ]
      }
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '响应头不能为空'
          }
        ]
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'time',
      hideInForm: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'time',
      hideInForm: true
    },
    {
      title: '创建人id',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record: API.InterfaceInfo) => [
        <a
          key="update"
          onClick={() => {
            console.log(record)
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,

        record.status === 0 ? <a
          key="onLine"
          onClick={() => {
            console.log(record)
            handleOnLine(record);
          }}
        >
          开启
        </a> : null,

        record.status === 1 ? <a
          style={{color:"#ff4d4f"}}
          key="offLine"
          onClick={() => {
            console.log(record)
            handleOffLine(record);

          }}
        >
          关闭
        </a> : null,

        <a
          style={{color:"#ff4d4f"}}
          key="delete"
          onClick={() => {
            console.log(record)
            handleRemove(record);

          }}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}
        request={async (params: {
          pageSize?: number;
          current?: number;
          keyword?: string;
        }, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res = await listInterfaceInfoByPageUsingGet(params)
          let result: RequestData<API.RuleListItem> = {
            data: [],
            success: false,
            total: 0,
          }
          if (res.data) {
            result.data = res.data.records
            result.total = res.data.total
            result.success = true
          }
          console.log(result)
          return result
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          {/*<Button*/}
          {/*  onClick={async () => {*/}
          {/*    await handleRemove(selectedRowsState);*/}
          {/*    setSelectedRows([]);*/}
          {/*    actionRef.current?.reloadAndRest?.();*/}
          {/*  }}*/}
          {/*>*/}
          {/*  批量删除*/}
          {/*</Button>*/}
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}

      <CreateModal columns={columns} onCancel={() => handleModalOpen(false)}
                   onSubmit={(values: API.InterfaceInfo) => handleAdd(values)} visible={createModalOpen}></CreateModal>
      <UpdateModal onCancel={() => handleUpdateModalOpen(false)} values={currentRow || {}}
                   onSubmit={(values: API.InterfaceInfo) => handleUpdate(values)} columns={columns}
                   visible={updateModalOpen}></UpdateModal>

    </PageContainer>
  );
};
export default TableList;
