import React from 'react';
import options from '../../newVar.json'

const DataSelection = ({
  uniqueValues,
  setUniqueValues,
  data,
  setData,
  dataSelections,
  setDataSelections,
}) => {

  const handleDataChange = (e, index) => {
    const selectedData = e.target.value;
    const updatedValue = [...dataSelections];
    updatedValue[index].selectedData = selectedData;
    setDataSelections(updatedValue);
  };

  const handleAddition = () => {
    const updatedElements = [...dataSelections];
    updatedElements.push({
      selectedData: "INCOME",
      selectedDistribution: "EDCL",
      selectedDisplay: [{
        "label": 1,
        "value": 1
    }],
    });
    setDataSelections(updatedElements);

    const updatedData = [...data];
    updatedData.push([]);
    setData(updatedData);

    const updatedUniqueValues = [...uniqueValues];
    updatedUniqueValues.push([]);
    setUniqueValues(updatedUniqueValues);
  };

  const nonSelectableCategories = ["SCF", "Demographics", "Labor Force", "Financial Behavior"];


  return (
    <div className='data_container'>
      <label>Data</label>
      {dataSelections.map((data, index) => (
        <div key={index}>
          <select
            id={`Data_${index}`}
            className='Data'
            value={data.selectedData} // Fixed property name
            onChange={(event) => handleDataChange(event, index)}
          ><option value="NETWORTH">Net Worth</option>
            {/* Map through categories and subcategories from 'var.json' and create options */}
            {options.children.map((category) => (
              <optgroup key={category.name} label={category.name}>
                {category.children.map((subcategory) => (
                  <option
                    key={subcategory.value}
                    value={subcategory.value}
                    disabled={nonSelectableCategories.includes(subcategory.value)}
                  >
                    {subcategory.name}
                  </option>
                ))}
              </optgroup>
            ))}
            {/* <option value={"EDCL"}>Education</option>
            <option value={"HHSEX"}>Sex</option>
            <option value={"INCOME"}>Income</option>
            <option value={"RENT"}>Rent</option>
            <option value={"FIN"}>FIN</option> */}
          </select>
        </div>
      ))}
      <p onClick={handleAddition}>+</p>
    </div>
  );
};

export default DataSelection;
