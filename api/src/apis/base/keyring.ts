import { KeyringPair, KeyringPair$Json } from '@polkadot/keyring/types';
import { Keypair } from '@polkadot/util-crypto/types';

declare class GKeyring {
  private static unlock(keyring: KeyringPair, passphrase?: string);

  static fromSuri(suri: string, name?: string): Promise<KeyringPair>;

  static fromKeyPair(pair: Keypair, name?: string): KeyringPair;

  static fromJson(keypairJson: KeyringPair$Json | string, passphrase?: string): KeyringPair;

  static fromSeed(seed: Uint8Array | string, name?: string): Promise<KeyringPair>;

  static fromMnemonic(mnemonic: string, name?: string): Promise<KeyringPair>;

  static toJson(keyring: KeyringPair, passphrase?: string): KeyringPair$Json;

  static create(
    name: string,
    passphrase?: string,
  ): Promise<{
    keyring: KeyringPair;
    mnemonic: string;
    seed: string;
    json: KeyringPair$Json;
  }>;

  static generateMnemonic(): string;

  static generateSeed(mnemonic?: string): { seed: `0x${string}`; mnemonic: string };

  static sign(keyring: KeyringPair, message: string): Uint8Array;

  static checkPublicKey(publicKey: string): boolean;
}

export default GKeyring;
