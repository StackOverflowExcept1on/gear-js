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

  protected async initialize(): Promise<void> {
    await super.initialize();
    this.program = new Base.GProgram(this);
    this.message = new Base.GMessage(this);
    this.balance = new Base.GBalance(this);
    this.gearEvents = new Base.GEvents(this);
    this.programState = new Base.GProgramState(this);
    this.blocks = new Base.GBlock(this);
    this.programStorage = new Base.GProgramStorage(this);
    this.claimValueFromMailbox = new Base.GClaimValue(this);
    this.mailbox = new Base.GMailbox(this);
    this.code = new Base.GCode(this);
    this.waitlist = new Base.GWaitlist(this);
  }
}

export default Api;
