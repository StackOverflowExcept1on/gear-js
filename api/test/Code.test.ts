import { HexString } from '@polkadot/util/types';
import { join } from 'path';
import { readFileSync } from 'fs';

import { getAccount, sendTransaction, sleep } from './utilsFunctions';
import { Latest } from '../src';
import { TARGET } from './config';
import { WS_ADDRESS } from './config';

const api = new Latest.Api({ providerAddress: WS_ADDRESS });
const accounts = {};
const code = readFileSync(join(TARGET, 'test_waitlist.opt.wasm'));
let codeId: HexString;

beforeAll(async () => {
  await api.isReadyOrError;
  [accounts['alice']] = await getAccount();
});

afterAll(async () => {
  await api.disconnect();
  await sleep(1000);
});

describe('Upload code', () => {
  test('Upload test_waitlist', async () => {
    const { codeHash } = await api.code.upload(code);
    expect(codeHash).toBeDefined();
    codeId = codeHash;
    const transactionData = await sendTransaction(api.code, accounts['alice'], 'CodeChanged');
    expect(transactionData.id).toBe(codeHash);
    expect(transactionData.change).toHaveProperty('Active');
    expect(transactionData.change.Active).toHaveProperty('expiration');
  });

  test('Throw error when code exists', async () => {
    await expect(api.code.upload(code)).rejects.toThrow('Code already exists');
  });
});

describe('All uploaded codes', () => {
  test('get all code ids', async () => {
    expect(codeId).not.toBeUndefined();

    const codeIds = await api.code.all();

    expect(codeIds.includes(codeId)).toBeTruthy();
  });
});
