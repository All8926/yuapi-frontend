import {
  ProColumns,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea, ProTable,
  StepsForm,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useImperativeHandle, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";


export type CreateFormProps = {
  onCancel: (flag?: boolean,  ) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  columns: ProColumns<API.InterfaceInfo>[];
  visible: boolean;
};
const CreateModal: React.FC<CreateFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const {visible,onCancel, onSubmit,columns} = props;


  return (
    <Modal visible={visible} onCancel={() => onCancel() } footer={null}>
      <ProTable type={"form"} formRef={formRef} columns={columns} onSubmit={  async (value) => {
       await  onSubmit(value)
          formRef.current?.resetFields()
      }}> </ProTable>
    </Modal>
  );
};
export default CreateModal;
