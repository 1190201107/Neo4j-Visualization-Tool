import SpriteText from 'three-spritetext';
import ForceGraph3D from 'react-force-graph-3d';

import React from 'react';


// function genRandomTree(N = 300, reverse = false) {
//     return {
//         nodes: [...Array(N).keys()].map(i => ({ id: i })),
//         links: [...Array(N).keys()]
//             .filter(id => id)
//             .map(id => ({
//                 [reverse ? 'target' : 'source']: id,
//                 [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
//             }))
//     };
// }

const { useMemo, useState} = React;

const IndexThreeD = () => {
    const data =  fetch('../datasets/miserables.json').then(res=> console.log(res.json))
                  
    console.log("---------------------------------")
    console.log(data)


    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());

    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const handleNodeHover = node => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
            highlightNodes.add(node);
            node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
            node.links.forEach(link => highlightLinks.add(link));
        }
        updateHighlight();
    };

    const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };

    return <ForceGraph3D
        graphData={data}
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkWidth={link => highlightLinks.has(link) ? 2 : 1}
        linkDirectionalArrowLength={5}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={4}
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 2 : 0}
        // nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
        // nodeCanvasObject={paintRing}
        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        linkThreeObjectExtend={true}
        linkThreeObject={link => {
            const sprite = new SpriteText(`${link.source} > ${link.target}`);
            sprite.color = 'lightgrey';
            sprite.textHeight = 1.5;
            return sprite;
        }}
        linkPositionUpdate={(sprite, { start, end }) => {
            const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
            })));

            // Position sprite
            Object.assign(sprite.position, middlePos);
        }}
        onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
        }}
    />
}
export default IndexThreeD;