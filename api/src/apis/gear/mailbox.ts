import { AccountId32 } from '@polkadot/types/interfaces';
import { HexString } from '@polkadot/util/types';

import { ClaimValue } from './claim';
import { GMailbox } from '../../base';
import { MailboxItem } from '../../types';

export declare class Mailbox extends GMailbox {
  public claimValue: ClaimValue;

  /**
   * ## Get particular message from mailbox
   * @param accountId
   * @param messageId
   * ```javascript
   * const api = await GearApi.create();
   *
   * const alice = '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'
   * const messageId = '0xe9f3b99f23203d0c032868d3bd0349c8e243119626a8af98a2f4ac5ea6c78947'
   * const mailbox = await api.mailbox.readById(alice, messageId);
   * if (mailbox !== null) {
   *   console.log(mailbox.toHuman());
   * }
   * ```
   */
  readById(accountId: HexString | AccountId32 | string, messageId: HexString): Promise<MailboxItem>;

  /**
   * ## Read mailbox associated with an account
   * @param accountId
   * @param numberOfMessages _(default 1000)_ number of messages that will be read from mailbox
   * ```javascript
   * const alice = '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'
   * const api = await GearApi.create();
   * const mailbox = await api.mailbox.read(alice);
   * console.log(mailbox.map(item => item.toHuman()));
   * ```
   */
  read(accountId: HexString | AccountId32 | string, numberOfMessages: number): Promise<MailboxItem[]>;
}
