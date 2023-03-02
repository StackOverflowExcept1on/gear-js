import * as Base from '../../base';

class Api extends Base.GApi {
  public declare program: Base.GProgram;
  public declare programState: Base.GProgramState;
  public declare programStorage: Base.GProgramStorage;
  public declare message: Base.GMessage;
  public declare balance: Base.GBalance;
  public declare gearEvents: Base.GEvents;
  public declare mailbox: Base.GMailbox;
  public declare claimValueFromMailbox: Base.GClaimValue;
  public declare code: Base.GCode;
  public declare waitlist: Base.GWaitlist;
  public declare blocks: Base.GBlock;
}

export default Api;
