import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import D3 library
import data from './var.json'
import './Map.css'
import ExploreData from '../ExploreData/ExploreData';
import Footer from '../Footer/Footer';
import DataInfoCard from '../DataInfoCard/DataInfoCard';

const Map = ({distinctVariables}) => {
  const [shouldRenderDataInfoCard, setShouldRenderDataInfoCard] =
    useState(false);
    const [selectedInfoData, setSelectedInfoData] = useState(null);
 const [d1, setD1] = useState("hehehe")
  
//  setSelectedInfoData={setSelectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}
  return (
    <div >
      <ExploreData distinctVariables={distinctVariables} setSelectedInfoData={setSelectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}/>
      {shouldRenderDataInfoCard && <DataInfoCard data={selectedInfoData} setShouldRenderDataInfoCard={setShouldRenderDataInfoCard}/>}
    </div>
  );
};

export default Map;

