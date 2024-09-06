export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Time = IDL.Int;
  const ChangelogEntry = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'date' : Time,
    'tags' : IDL.Vec(IDL.Text),
    'description' : IDL.Text,
    'sections' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Text))),
  });
  return IDL.Service({
    'addChangelogEntry' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Vec(IDL.Text),
          IDL.Vec(IDL.Tuple(IDL.Text, IDL.Vec(IDL.Text))),
        ],
        [Result],
        [],
      ),
    'getChangelogEntries' : IDL.Func([], [IDL.Vec(ChangelogEntry)], ['query']),
    'getChangelogEntry' : IDL.Func(
        [IDL.Nat],
        [IDL.Opt(ChangelogEntry)],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
