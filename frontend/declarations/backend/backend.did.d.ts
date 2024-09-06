import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ChangelogEntry {
  'id' : bigint,
  'title' : string,
  'date' : Time,
  'tags' : Array<string>,
  'description' : string,
  'sections' : Array<[string, Array<string>]>,
}
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addChangelogEntry' : ActorMethod<
    [string, string, Array<string>, Array<[string, Array<string>]>],
    Result
  >,
  'getChangelogEntries' : ActorMethod<[], Array<ChangelogEntry>>,
  'getChangelogEntry' : ActorMethod<[bigint], [] | [ChangelogEntry]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
