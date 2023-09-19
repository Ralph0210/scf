import React from "react";
import "./DisplaySelection.css";
import { MultiSelect } from "react-multi-select-component";
import { Clear } from "@mui/icons-material";

const DisplaySelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

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
          />
          <div className="deletion_container" onClick={() => handleDeletion(index)}>
              <Clear />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplaySelection;
