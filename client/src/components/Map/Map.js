import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3'; // Import D3 library
import data from './var.json'
import './Map.css'

const Map = () => {

  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  const chartContainerRef = useRef(); // Create a ref for the chart container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // Use useRef to store cx and cy without causing re-renders
  const [c, setC] = useState({cx: 0, cy: 0})
  const svgRef = useRef(null);
  const svgGroupRef = useRef(null)

  useEffect(() => {
    // Function to update dimensions based on screen size
    const updateDimensions = () => {
      const containerWidth = chartContainerRef.current.clientWidth;
      const containerHeight = chartContainerRef.current.clientHeight;

      // Set dimensions to the maximum of container width and height
      const newWidth = Math.max(containerWidth, containerHeight);
      const newHeight = newWidth; // Maintain a square aspect ratio

      setDimensions({ width: newWidth, height: newHeight });

      // Update cx and cy using refs
      let Newcx = newWidth * 0.5;
      let Newcy = newHeight * 0.54;
      setC({cx: Newcx, cy: Newcy})
    };

    // Debounce the resize event
    const debouncedResize = debounce(updateDimensions, 200);

    // Listen for window resize events
    window.addEventListener('resize', debouncedResize);

    // Initial dimensions
    updateDimensions();

    // Cleanup: Remove the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  // useEffect(() => {
  //   // Create the SVG container if it doesn't exist
  //   if (!svgRef.current) {
  //     const svg = d3.select(chartContainerRef.current)
  //       .append("svg")
  //       .attr("style", "width: 100%; height: auto; font: 10px sans-serif;");

  //     const svgGroup = svg.append("g");

  //     svgRef.current = svg;
  //     svgGroupRef.current = svgGroup;
  //   }

  //   // Apply transition to the group element when needed
  //   svgGroupRef.current.transition()
  //     .duration(750)
  //     .attr("transform", `translate(${c.cx},${c.cy})`);
  // }, [c, setC]);

  function handleClick(event, d) {
    // Calculate the translation to center the clicked node in the viewbox
    const newCx = 200 - d.y * Math.cos(d.x - Math.PI / 2);
    const newCy = 200 - d.y * Math.sin(d.x - Math.PI / 2);

    console.log(dimensions.height)
  
    // Select the group element for transformation
    const svgGroup = d3.select(chartContainerRef.current).selectAll('g');
  
    // Apply a transition to smoothly move the group to the new position
    svgGroup.transition()
      .duration(750)
      .attr('transform', `translate(${newCx},${newCy})`);
  }
  

  useEffect(() => {

    // Specify the chart’s dimensions based on screen size.
    const width = dimensions.width;
    const height = dimensions.height;
    const cx = c.cx; // Use the cx ref
    const cy = c.cy; // Use the cy ref
    const radius = Math.min(width, height) / 2 - 80;

    // Create a radial cluster layout. The layout’s first dimension (x)
    // is the angle, while the second (y) is the radius.
    const tree = d3.cluster()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Sort the tree and apply the layout.
    const root = tree(d3.hierarchy(data)
      .sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    // Remove the old SVG if it exists
    d3.select(chartContainerRef.current).select('svg').remove();

    // Creates the SVG container based on updated dimensions.
    const svg = d3.select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 100%; height: auto; font: 10px sans-serif;")

  //     const svgGroup = svg.append("g")
  //     .attr("transform", `translate(${c.cx},${c.cy})`);

  //     svgGroup.transition()
  // .duration(750)
  // .attr("transform", `translate(${c.cx},${c.cy})`);

    // Append links.
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

    // Append nodes.
    svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
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

        if (d.depth === 1 && d.data.name === "Financial Behavior") {
          return "fin-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Financial Behavior") {
          return "fin-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 1 && d.data.name === "Labor Force") {
          return "labor-circle"
        }

        if (d.depth === 2 && d.parent && d.parent.data.name === "Labor Force") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        if (d.depth === 3 && d.parent && d.parent.parent.data.name === "Labor Force") {
          return "labor-circle"; // Apply "blue" fill color to children nodes of "Demographics"
        }

        return "normal-circle"; // Default fill color for other nodes
      })
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 5)
      .on("click", handleClick);

    // Append labels.
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr("text-anchor", d => d.x < Math.PI === !d.children ? "start" : "end")
      .attr("paint-order", "stroke")
      .attr("fill", "currentColor")
      .text(d => d.data.name);

  }, [dimensions, chartContainerRef]);

  return (
    <div className='map_parent_container'>
      <div className='map_container' ref={chartContainerRef} style={{border: '1px solid'}}>
      </div>
    </div>
  );
};

export default Map;

