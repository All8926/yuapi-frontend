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
import React from 'react';


export type CreateFormProps = {
  onCancel: (flag?: boolean,  ) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  columns: ProColumns<API.InterfaceInfo>[];
  visible: boolean;
};
const CreateModal: React.FC<CreateFormProps> = (props) => {
  const {visible,onCancel, onSubmit,columns} = props;
  return (
    <Modal visible={visible} onCancel={() => onCancel() } footer={null}>
      <ProTable type={"form"} columns={columns} onSubmit={(value) => onSubmit(value)}></ProTable>
    </Modal>
  );
};
export default CreateModal;
