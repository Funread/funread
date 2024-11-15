import React from "react";
import Collection from "./Collection";

function CollectionSidebar({ onSelectCollection }) {
  return (
    <div className="collection-sidebar">
      <h2>My Badges</h2>
      <Collection name="All Badges" onClick={() => onSelectCollection("all")} />
      <Collection name="Achieved" onClick={() => onSelectCollection("achieved")} />
      <Collection name="Not Achieved" onClick={() => onSelectCollection("notAchieved")} />
    </div>
  );
}

export default CollectionSidebar;
