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
  useEffect(() => {
    // Create a function to fetch data for a single item in dataSelections
    const fetchDistinctValues = async (dataSelection, index) => {
      try {
        const apiParams = {
          selectedDistribution: dataSelection.selectedDistribution,
        };

        const retrievedData = await distinctValues(
          apiParams.selectedDistribution
        );

        console.log(`Data for Item ${index}:`, retrievedData);
        // Update the data state with the retrieved data for the specific item
        setUniqueValues((prevData) => {
          const updatedData = [...prevData];
          updatedData[index] = retrievedData;
          console.log(updatedData);
          return updatedData;
        });
      } catch (error) {
        console.error(error);
      }
    };

    // Loop through dataSelections and fetch data for each item
    dataSelections.forEach((dataSelection, index) => {
      fetchDistinctValues(dataSelection, index);
    });
  }, [dataSelections, setData]);

  const handleDataChange = (e, index) => {
    const selectedDisplay = e.target.value;
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedDisplay = selectedDisplay;
    setDataSelections(updatedValue);
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
            options={uniqueValues[index]}
            value={data.selectedDisplay}
            onChange={(e) => handleDataChange(e, index)}
            labelledBy="Select"
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
