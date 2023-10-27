import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./ExploreData.css";
import { INITIAL_VALUE, ReactSVGPanZoom, TOOL_AUTO } from "react-svg-pan-zoom";
// import data from './flare-2.json'
// import data from "./var.json";
// import data from './var3.json'
import data from '../../newVar.json'
// import data from './var2.json'
import DataInfoCard from "../DataInfoCard/DataInfoCard";
// import useWindowSize from "../useWindowSize";
import styles from "./ExploreData.module.css";
import {useWindowSize} from '@react-hook/window-size'

const ExploreData = ({setSelectedInfoData, setShouldRenderDataInfoCard, distinctVariables}) => {
  
  const size = useWindowSize()
  // const [data] = useState([25, 50, 35, 15, 94, 50]);
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_AUTO);
  const [value, setValue] = useState(INITIAL_VALUE);
  const svgRef = useRef();
  const svgRef2 = useRef();
  const clickedNode = useRef()
  const [selectedNode, setSelectedNode] = useState(null);
  // const data = {
  //   children: [
  //     {
  //       name: "boss1",
  //       children: [
  //         { name: "mister_a", colname: "level3" },
  //         { name: "mister_b", colname: "level3" },
  //         { name: "mister_c", colname: "level3" },
  //         { name: "mister_d", colname: "level3" },
  //       ],
  //       colname: "level2",
  //     },
  //     {
  //       name: "boss2",
  //       children: [
  //         { name: "mister_e", colname: "level3" },
  //         { name: "mister_f", colname: "level3" },
  //         { name: "mister_g", colname: "level3" },
  //         { name: "mister_h", colname: "level3" },
  //       ],
  //       colname: "level2",
  //     },
  //   ],
  //   name: "CEO",
  // };
  // useEffect(() => {
  //   Viewer.current.fitToViewer();
  // }, []);
  // useEffect(() => {
  //   //setting up svg
  //   const w = 400;
  //   const h = 100;
  //   const svg = d3
  //     .select(svgRef.current)
  //     .attr("width", w)
  //     .attr("height", h)
  //     .style("background", "#d3d3d3")
  //     .style("margin", "50")
  //     .style("overflow", "visible");

  //   //setting the scaling
  //   const xScale = d3
  //     .scaleLinear()
  //     .domain([0, data.length - 1])
  //     // the range of the number of inputs,
  //     // This domain is typically used to map input values representing positions along the x-axis,
  //     // where each data point is associated with a unique index from 0 to data.length - 1.
  //     // It allows you to position data points along the x-axis within the specified range.
  //     .range([0, w]); //the range of the output range of the scale
  //   const yScale = d3
  //     .scaleLinear()
  //     .domain([0, h]) //the range of the possible input values
  //     .range([h, 0]);
  //   const generateScaledLine = d3
  //     .line()
  //     .x((d, i) => xScale(i))
  //     .y(yScale)
  //     .curve(d3.curveCardinal);

  //   //setting the axes
  //   const xAxis = d3
  //     .axisBottom(xScale)
  //     .ticks(data.length)
  //     .tickFormat((i) => i + 1);
  //   const yAxis = d3.axisLeft(yScale).ticks(5);
  //   svg
  //     .append("g")
  //     .call(xAxis)
  //     .attr("transform", `translate(0, ${h})`)
  //     .select(".domain")
  //     .attr("class", "x-axis-path");
  //   svg.append("g").call(yAxis);

  //   //setting up the data for the svg
  //   svg
  //     .selectAll(".line")
  //     .data([data])
  //     .join("path")
  //     .attr("d", (d) => generateScaledLine(d))
  //     .attr("fill", "none")
  //     .attr("stroke", "black");
  // }, [data]);
  // Specify the chart’s dimensions.

  useEffect(() => {

    const handleNodeClick = (d, i) => {
      console.log(d, i);
      setShouldRenderDataInfoCard(true);
      setSelectedInfoData(i.data);
    };

    const old = d3.select(svgRef2.current)
    old
      .selectAll('*')
      .remove()

    // const width = size.width === undefined? window.innerWidth : size.width;
    const height =  size.height === undefined? window.innerHeight : size.height;
    const width = height
    const cx = width * 0.5; // adjust as needed to fit
    const cy = height * 0.59; // adjust as needed to fit
    const radius = Math.min(width, height) / 2 - 30;
    // Create a radial tree layout. The layout’s first dimension (x)
    // is the angle, while the second (y) is the radius.
    const tree = d3
      .tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Sort the tree and apply the layout.
    const root = tree(
      d3.hierarchy(data).sort((a, b) => d3.ascending(a.data.name, b.data.name))
    );

      // Creates the SVG container.
  const svg = d3
  .select(svgRef2.current)
  .attr("width", width)
  .attr("height", height)
  // .classed("svg-container", true)
  // .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", [-cx, -cy, width, height])
  // .classed("svg-content-responsive", true)
  .attr(
    "style",
    `width: ${width}px; height: ${height}px; font: 10px sans-serif;`
  )
  .attr("class", "mapsvg");

    // Append links.
    let links = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr(
        "d",
        d3
          .linkRadial()
          .angle((d) => d.x)
          .radius((d) => d.y)
      );

    let nodeAnimation2 = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", d => {
        if (d.depth === 0) {
          return "root-circle"
        }
        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (d.depth === 2 && d.parent && d.parent.data.name === "Demographics") {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        // Check if the node is at depth 2 under "Demographics"
        // if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Demographics") {
        //   return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        // }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Financial Assets") {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Income and Earnings") {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Nonfinancial Assets") {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 0)

    let nodeAnimation = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", d => {
        if (d.depth === 0) {
          return "root-circle"
        }
        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (d.depth === 2 && d.parent && d.parent.data.name === "Demographics") {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        // Check if the node is at depth 2 under "Demographics"
        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Demographics") {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Financial Assets") {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Income and Earnings") {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }
        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Nonfinancial Assets") {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 0)

      let highLightNode = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", d => {
        // if (d.depth === 0) {
        //   return "root-circle"
        // }
        const isNodeInDistinctVariables = distinctVariables.has(d.data.value);
        // console.log(isNodeInDistinctVariables, "isNode")
    
        if (isNodeInDistinctVariables) {
          return "red-circle"; // Apply a red fill color to nodes in distinctVariables
        }
      })
      .attr("r", 15)
      .attr("fill", "none")

    // Append nodes.
    let nodes = svg
      .append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr(
        "transform",
        (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`
      )
      .attr("class", d => {
        if (d.depth === 0) {
          return "root-circle"
        }

        // Check if the node is at depth 1 and has the name "Demographics"
        if (d.depth === 1 && d.data.name === "Demographics") {
          return "demo-circle"; // Apply a different fill color to the "Demographics" branch
        }

        // Check if the node is at depth 2 under "Demographics"
        if (d.depth === 2 && d.parent && d.parent.data.name === "Demographics") {
            return "demo-circle";
        }

        // Check if the node is at depth 2 under "Demographics"
        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Demographics") {
          return "demo-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Financial Assets") {
          return "fin-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Financial Assets") {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Income and Earnings") {
          return "In-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Income and Earnings") {
          return "In-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Nonfinancial Assets") {
          return "non-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Nonfinancial Assets") {
          return "non-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Debt") {
          return "labor-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Debt") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("r", 10);


      // Append labels.
    let labels = svg
    .append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 3)
    .selectAll()
    .data(root.descendants())
    .join("text")
    .attr(
      "transform",
      (d) =>
        `rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
        rotate(${-(d.x * 180) / Math.PI + 90})`
    )
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
    .attr("text-anchor", (d) =>
      d.x < Math.PI === !d.children ? "start" : "end"
    )
    .attr("paint-order", "stroke")
    .attr("stroke", "white")
    .attr("fill", "currentColor")

    .text((d) => d.data.name)
    .style("opacity", 0); // Initially set text opacity to 0

    nodes.on("click", function (d, i) {
      
      if (d.depth === 1) {
        // If the clicked node has depth 1, update the selected node
        setSelectedNode(selectedNode === i ? null : i);
        console.log(selectedNode)
      } else {
        // If the clicked node has depth other than 1, reset the selected node
        setSelectedNode(null);
      }
      if(selectedNode){
        const myLabelSelection = d3.selectAll(".node").filter(d => d.data.name === selectedNode.data.name);
    const descendants = myLabelSelection.datum().descendants();
    descendants.attr('opacity', 0)
      }
      
    })

    // Define mouseover and mouseout event handlers for nodes
    nodes
      .on("click", function(d, i) {
        const past = clickedNode.current
        clickedNode.current = i
        handleNodeClick(d, i)

        const centerX = d.x - cx;
        const centerY = d.y - cy;

        console.log(d, i, d.x, d.y, i.x, i.y, cx, cy)

        svg.transition()
          .duration(800)
          .attr("transform", `translate(${cx-(width/2)}, ${cy})`);

        nodeAnimation
        .filter((data) => data.data === i.data) // Filter for the matching data point
        .transition()
        .duration(500)
        .attr("r", 15)
        .style("opacity", 0.5);

      nodeAnimation2
        .filter((data) => data.data === i.data) // Filter for the matching data point
        .transition()
        .duration(600)
        .attr("r", 20)
        .style("opacity", 0.3);

      // Change the opacity of the associated text to 1
      labels
        .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
        .transition()
        .duration(800)
        .attr("x", (d) => (d.x < Math.PI === !d.children ? 20 : -20))
        .style("opacity", 1);

        if(past && past !== clickedNode.current){
          nodeAnimation
          .filter((data) => data.data === past.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 0)
          .style("opacity", 0.5);

        nodeAnimation2
          .filter((data) => data.data === past.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 0)
          .style("opacity", 0.5);

        // Change the opacity of the associated text back to 0
        labels
          .filter((textData) => textData.data.name === past.data.name) // Filter for the matching text element
          .transition()
          .duration(800)
          .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
          .style("opacity", 0);
        }
      })

      .on("mouseover", function (d, i) {
        // console.log("Mouseover Event - Data:", d, "Index:", i, "description:", i.data.description);
        // Change the circle size

        if(clickedNode.current !== i){
          nodeAnimation
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(500)
          .attr("r", 15)
          .style("opacity", 0.5);

        nodeAnimation2
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 20)
          .style("opacity", 0.3);

        // Change the opacity of the associated text to 1
        labels
          .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
          .transition()
          .duration(800)
          .attr("x", (d) => (d.x < Math.PI === !d.children ? 20 : -20))
          .style("opacity", 1);
        }

      })
      .on("mouseout", function (d, i) {
        if(clickedNode.current !== i){
          nodeAnimation
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 0)
          .style("opacity", 0.5);

        nodeAnimation2
          .filter((data) => data.data === i.data) // Filter for the matching data point
          .transition()
          .duration(600)
          .attr("r", 0)
          .style("opacity", 0.5);

        // Change the opacity of the associated text back to 0
        labels
          .filter((textData) => textData.data.name === i.data.name) // Filter for the matching text element
          .transition()
          .duration(800)
          .attr("x", (d) => (d.x < Math.PI === !d.children ? 10 : -10))
          .style("opacity", 0);
        }
        // Change the circle size back to its original size
       
      });
      
      svg.attr('transform', `translate(${cx-(width/2)}, ${cy})`);
  }, [size, selectedNode]);


  return (
    <>
    <div className="pan_container">
      <ReactSVGPanZoom
        ref={Viewer}
        background="rgba(217, 217, 217, 0.20)"
        defaultTool="pan"
        width={size.width}
        height={size.height}
        tool={tool}
        onChangeTool={setTool}
        value={value}
        onChangeValue={setValue}
        detectAutoPan={false}
        toolbarProps={{
          position: "none", // Set position to "none" to hide the toolbar
        }}
        miniatureProps={{
          position: "none", // Set position to "none" to hide the miniature
        }}
        className="map_parent_container"
      >
        <svg>
          <g ref={svgRef2}></g>
        </svg>
      </ReactSVGPanZoom>
    </div>
    </>
  );
};

export default ExploreData;
