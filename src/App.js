// import ForceGraph2D from 'react-force-graph-2d';
import HighlightGraph from './highLightGraph';

function App() {
  // const myData = {
  //     nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' },{ id: 'd' }],
  //     links: [
  //       { source: 'a', target: 'b' },
  //       { source: 'c', target: 'a' }
  //     ]
  // };
  return (
    <div className="App">
      <HighlightGraph/>
      {/* <ForceGraph2D graphData={myData} /> */}
    </div>
  );
}

export default App;
