import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Int "mo:base/Int";
import List "mo:base/List";
import Result "mo:base/Result";

actor {
  type ChangelogEntry = {
    id: Nat;
    date: Time.Time;
    title: Text;
    description: Text;
    tags: [Text];
    sections: [(Text, [Text])];
  };

  stable var nextId: Nat = 0;
  stable var changelogEntries: [ChangelogEntry] = [];

  public func addChangelogEntry(title: Text, description: Text, tags: [Text], sections: [(Text, [Text])]): async Result.Result<Nat, Text> {
    let id = nextId;
    nextId += 1;

    let newEntry: ChangelogEntry = {
      id = id;
      date = Time.now();
      title = title;
      description = description;
      tags = tags;
      sections = sections;
    };

    changelogEntries := Array.append(changelogEntries, [newEntry]);
    #ok(id)
  };

  public query func getChangelogEntries(): async [ChangelogEntry] {
    Array.reverse(changelogEntries)
  };

  public query func getChangelogEntry(id: Nat): async ?ChangelogEntry {
    Array.find(changelogEntries, func(entry: ChangelogEntry): Bool { entry.id == id })
  };
}