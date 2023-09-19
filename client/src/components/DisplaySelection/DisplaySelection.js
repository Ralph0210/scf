import React from "react";
import "./DisplaySelection.css";
import { useEffect, useState } from "react";
import { distinctValues } from "../api";
import { MultiSelect } from "react-multi-select-component";

const DisplaySelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

  const ArrowRenderer = ({ expanded }) => (
    <svg
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="dropdown-heading-dropdown-arrow gray"
    >
      <path d={expanded ? "M18 15 12 9 6 15" : "M6 9L12 15 18 9"} />
    </svg>
  );

  const handleDataChange = (e, index) => {
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedDisplay = e;
    setDataSelections(updatedValue);
    console.log("display handle", updatedValue)
  };

  const handleDeletion = (index) => {
    const updatedElements = dataSelections.filter((_, i) => i !== index);
    setDataSelections(updatedElements);
    // console.log(updatedElements)

    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    // console.log("data deletion", updatedData)

    const updatedUniqueValues = uniqueValues.filter((_, i) => i !== index);
    setUniqueValues(updatedUniqueValues);
  };

  return (
    <div className="display_container">
      <label htmlFor="Display">Display</label>

      {dataSelections.map((data, index) => (
        <div key={index} className="display_container_components">
          <MultiSelect
          className="multi-select"
            options={uniqueValues[index]}
            value={[...data.selectedDisplay]}
            onChange={(e) => handleDataChange(e, index)}
            shouldToggleOnHover={true}
            labelledBy="Select"
            overrideStrings={{"allItemsAreSelected": "All"}}
            disableSearch={true}
            ClearSelectedIcon={null}
            ArrowRenderer={ArrowRenderer}
          />
          <div className="deletion_container">
            <p onClick={() => handleDeletion(index)}>X</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplaySelection;
