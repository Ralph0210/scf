import {useRef, useState, useEffect} from 'react';
import {INITIAL_VALUE, ReactSVGPanZoom, TOOL_PAN} from 'react-svg-pan-zoom';

export default function Pan() {
  const Viewer = useRef(null);
  const [tool, setTool] = useState(TOOL_PAN)
  const [value, setValue] = useState(INITIAL_VALUE)

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  return (
    <div>

      <ReactSVGPanZoom
        ref={Viewer}
        background='rgba(217, 217, 217, 0.20)'
        defaultTool='pan'
        width={1440} height={1024}
        tool={tool} onChangeTool={setTool}
        value={value} onChangeValue={setValue}
        detectAutoPan={false}
        toolbarProps={{
            position: "none", // Set position to "none" to hide the toolbar
          }}
          miniatureProps={{
            position: "none", // Set position to "none" to hide the miniature
          }}
      >
        <svg width={617} height={316}>
          <g fillOpacity=".5" strokeWidth="4">
            <rect x="400" y="40" width="100" height="200" fill="#4286f4" stroke="#f4f142"/>
            <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff"/>
            <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0"/>
            <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f"/>
          </g>
        </svg>
      </ReactSVGPanZoom>
    </div>
  )
}