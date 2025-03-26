import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';
import {ProFormInstance} from "@ant-design/pro-form/lib";


export type CreateFormProps = {
  onCancel: (flag?: boolean,) => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  columns: ProColumns<API.InterfaceInfo>[];
  visible: boolean;
  values: Partial<API.InterfaceInfo>;
};
const UpdateModal: React.FC<CreateFormProps> = (props) => {
  const {visible, onCancel, values, onSubmit, columns} = props;
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
      formRef.current?.setFieldsValue(values);
  }, [values]);
  return (
    <Modal visible={visible} onCancel={() => onCancel()} footer={null}>
      <ProTable formRef={formRef} form={{initialValues: values}} type={"form"} columns={columns}
                onSubmit={(value) => onSubmit(value)}></ProTable>
    </Modal>
  );
};
export default UpdateModal;
