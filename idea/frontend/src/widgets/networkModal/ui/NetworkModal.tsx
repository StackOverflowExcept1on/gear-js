import { Modal, Input, Button } from '@gear-js/ui';
import { useForm } from '@mantine/form';

import { ModalProps } from 'entities/modal';
import { NodeSection } from 'entities/node';
import { isNodeAddressValid } from 'shared/helpers';
import { ReactComponent as PlusSVG } from 'shared/assets/images/actions/plus.svg';

import { isNodeExists } from '../helpers';
import styles from './NetworkModal.module.scss';

type Props = ModalProps & {
  nodeSections: NodeSection[];
  addNetwork: (address: string) => void;
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

  const handleSubmit = onSubmit(({ address }) => addNetwork(address));

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
