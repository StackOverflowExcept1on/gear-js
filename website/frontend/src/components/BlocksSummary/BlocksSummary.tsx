import React, { useEffect, useState } from 'react';
import { useApi } from 'hooks/useApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducers';
import styles from './BlocksSummary.module.scss';

const BlocksSummary = () => {
  const [api] = useApi();
  const dispatch = useDispatch();

  const { blocks } = useSelector((state: RootState) => state.blocks);

  const [timeInstance, setTimeInstance] = useState(0);
  const [totalIssuance, setTotalIssuance] = useState('');
  const [prevBlockHash, setPrevBlockHash] = useState('');

  const seconds = timeInstance.toFixed(1).slice(0, 1);
  const milliseconds = timeInstance.toFixed(1).slice(-1);
  const time = `${seconds}.${milliseconds}`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const decreasedTime = timeInstance + 0.1;
      setTimeInstance(decreasedTime);
    }, 100);

    if (blocks && blocks.length) {
      if (blocks[0].hash !== prevBlockHash) {
        setTimeInstance(0);
      }
      setPrevBlockHash(blocks[0].hash);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, setTimeInstance, timeInstance, setPrevBlockHash, prevBlockHash, blocks]);

  useEffect(() => {
    const getTotal = async () => {
      if (api) {
        const totalBalance = await api.totalIssuance();
        setTotalIssuance(totalBalance);
      }
    };
    getTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalIssuance]);

  return (
    <div className={styles.summary}>
      <div className={styles.section}>
        <p>Last block</p>
        <p className={styles.data}>
          <span className={styles.number}>{time}</span> s
        </p>
      </div>
      <div className={styles.section}>
        <p>Total issuance</p>
        <p className={styles.data}>
          <span className={styles.number}>{totalIssuance.slice(0, 5)}</span> Munit
        </p>
      </div>
    </div>
  );
};

export { BlocksSummary };