import { Column, Entity, JoinColumn, Index, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { IProgram } from '@gear-js/common';

import { BaseEntity } from './base.entity';
import { Message } from './message.entity';
import { Code } from './code.entity';
import { ProgramStatus } from '../../common/enums';

@Entity()
export class Program extends BaseEntity implements IProgram {
  @PrimaryColumn('uuid', { nullable: false })
  public _id: string;

  @Column()
  public id: string;

  @Index()
  @Column()
  public owner: string;

  @Column()
  public name: string;

  @Column({ nullable: true })
  public expiration: string;

  @Column({ name: 'type', type: 'enum', enum: ProgramStatus, default: ProgramStatus.UNKNOWN })
  public status: ProgramStatus;

  @Column({ nullable: true })
  public metaHash: string;

  @ManyToOne(() => Code, (code) => code.programs, {
    nullable: true,
  })
  @JoinColumn({ name: 'code_id' })
  public code: Code;

  @OneToMany(() => Message, (message) => message.program)
  public messages: Message[];
}
