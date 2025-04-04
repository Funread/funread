import React from "react";
import Collection from "./Collection";

function CollectionSidebar({ onSelectCollection, filter }) {
  return (
    <div className="collection-sidebar">
      <Collection name="All Badges" isActive={filter === "all"} onClick={() => onSelectCollection("all")} />
      <Collection name="Achieved" isActive={filter === "achieved"} onClick={() => onSelectCollection("achieved")} />
      <Collection name="Not Achieved" isActive={filter === "notAchieved"} onClick={() => onSelectCollection("notAchieved")} />
    </div>
  );
}

export default CollectionSidebar;
