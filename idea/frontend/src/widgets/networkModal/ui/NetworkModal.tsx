import { Modal, Input, Button } from '@gear-js/ui';
import { useForm } from '@mantine/form';

import { ModalProps } from 'entities/modal';
import { NodeSections } from 'entities/node';
import { isNodeAddressValid } from 'shared/helpers';
import { ReactComponent as PlusSVG } from 'shared/assets/images/actions/plus.svg';

import { RPCSuccessResponse } from 'shared/services/rpcService';
import { isNodeExists } from '../helpers';
import styles from './NetworkModal.module.scss';

type Props = ModalProps & {
  nodeSections: NodeSections | undefined;
  addNetwork: (address: string, chain: string) => void;
};

const initialValues = { address: '' };

const NetworkModal = ({ nodeSections, addNetwork, onClose }: Props) => {
  const validate = {
    address: (value: string) => {
      if (!isNodeAddressValid(value)) return 'Address is not valid';
      if (isNodeExists(nodeSections, value)) return 'Address already exists';
    },
  };

  const { getInputProps, onSubmit } = useForm({ initialValues, validate });

  const handleSubmit = onSubmit(({ address }) => {
    const [addressProtocol] = address.split(':');
    const requestProtocol = addressProtocol === 'wss' ? 'https' : 'http';
    const requestAddress = address.replace(addressProtocol, requestProtocol);

    const body = JSON.stringify({ id: '0', jsonrpc: '2.0', method: 'system_chain', params: [] });
    const headers = { 'Content-Type': 'application/json;charset=utf-8' };

    console.log(requestAddress);

    // fetch(requestAddress, { method: 'POST', body, headers })
    //   .then((response) => response.json())
    //   .then(({ result }: RPCSuccessResponse<string>) => addNetwork(result, address))
    //   .catch(() => addNetwork('development', address));
  });

  return (
    <Modal heading="Add Network" close={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input {...getInputProps('address')} />
        <Button type="submit" icon={PlusSVG} text="Add network" className={styles.addNetworkBtn} />
      </form>
    </Modal>
  );
};

export { NetworkModal };
