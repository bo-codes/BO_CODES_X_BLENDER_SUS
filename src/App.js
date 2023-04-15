import OBJViewer from "./OBJViewer/OBJViewer";
import blenderExample4 from "./gestalt_cube_4.obj";
import kwan from "./kwan_model.obj"

function App() {
  return (
    <OBJViewer OBJFile={kwan}/>
  );
}

export default App;
