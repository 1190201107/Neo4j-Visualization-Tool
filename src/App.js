import ForceGraph2D from 'react-force-graph-2d';

function App() {
  const myData = {
      nodes: [{ id: 'a' }, { id: 'b' }, { id: 'c' },{ id: 'd' }],
      links: [
        { source: 'a', target: 'b' },
        { source: 'c', target: 'a' }
      ]
  };
  return (
    <div className="App">
      <ForceGraph2D graphData={myData} />
    </div>
  );
}

export default App;
