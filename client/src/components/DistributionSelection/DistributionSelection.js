import React from "react";
import "./DistributionSelection.css";
import { distinctValues } from "../api";
import options from '../../newVar.json'

const DistributionSelection = ({
  dataSelections,
  setDataSelections,
  setUniqueValues,
}) => {
  const handleDataChange = (e, index) => {
    const selectedDistribution = e.target.value;
    const updatedValue = [...dataSelections];
    if (e.target.value === "None") {
      updatedValue[index].selectedDistribution = selectedDistribution;
      updatedValue[index].selectedDisplay = [
        {
          label: "None",
          value: "None",
        },
      ];
    } else {
      updatedValue[index].selectedDistribution = selectedDistribution;
      updatedValue[index].selectedDisplay = [{ label: 1, value: 1 }];
      fetchDistinctValues(updatedValue[index], index);
    }
    setDataSelections(updatedValue);
    console.log("none selection", updatedValue);
  };

  const fetchDistinctValues = async (dataSelection, index) => {
    try {
      const apiParams = {
        selectedDistribution: dataSelection.selectedDistribution,
      };

      const retrievedData = await distinctValues(
        apiParams.selectedDistribution
      );

      console.log(`uniData for Item ${index}:`, retrievedData);
      // Update the data state with the retrieved data for the specific item
      setUniqueValues((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = retrievedData;
        // console.log(updatedData);
        return updatedData;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="distribution_container">
      <label htmlFor="Distribution">Distributed by</label>

      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id="Distribution"
            className={`Distribution_${index}`}
            value={data.selectedDistribution}
            onChange={(event) => handleDataChange(event, index)}
          >
            <option value={"None"}>None</option>
            {options.children.map((category) => (
  <optgroup key={category.name} label={category.name}>
    {category.children
      .filter((subcategory) => subcategory.isCategorical)
      .map((subcategory) => (
        <option key={subcategory.value} value={subcategory.value}>
          {subcategory.name}
        </option>
      ))}
  </optgroup>
))}

            {/* <option value={"None"}>None</option>
            <option value={"HHSEX"}>Sex</option>
            <option value={"EDCL"}>Education</option>
            <option value={"MARRIED"}>Married</option>
            <option value={"RACE"}>Race</option> */}
          </select>
        </div>
      ))}
    </div>
  );
};

export default DistributionSelection;
