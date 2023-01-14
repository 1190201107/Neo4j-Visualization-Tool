import ForceGraph2D from 'react-force-graph-2d';
import React from 'react';
// import ReactDOM from 'react-dom/client';

function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map(i => ({ id: i, label : i+1 })),
        links: [...Array(N).keys()]
            .filter(id => id)
            .map(id => ({
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1))
            }))
    };
}

const { useMemo, useState, useCallback } = React;

// 节点大小
const NODE_R = 8;

const HighlightGraph = () => {
    const data = useMemo(() => {
        const gData = genRandomTree(80);

        // cross-link node objects
        gData.links.forEach(link => {
            const a = gData.nodes[link.source];
            const b = gData.nodes[link.target];
            !a.neighbors && (a.neighbors = []);
            !b.neighbors && (b.neighbors = []);
            a.neighbors.push(b);
            b.neighbors.push(a);

            !a.links && (a.links = []);
            !b.links && (b.links = []);
            a.links.push(link);
            b.links.push(link);
        });
        return gData;
    }, []);

    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [hoverNode, setHoverNode] = useState(null);

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

        setHoverNode(node || null);
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

    const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
    }, [hoverNode]);

    // const drawLabel = (node, ctx, globalScale) => {
    //     const label = node.label;
    //     ctx.fillStyle = 'black';
    //     ctx.font = `${20 / globalScale}px Arial`;
    //     ctx.fillText(label, node.x, node.y);
    //   };

    return <ForceGraph2D
        graphData={data}
        // 节点大小设置
        nodeRelSize={NODE_R}
        nodeLabel={node => `${node.id}: ${node.label}`}
        // nodeLabelAttr="label"
        showNodeLabels={true}

        autoPauseRedraw={false}
        // 箭头大小
        linkDirectionalArrowLength={7}
        // 箭头在link上的位置。取值为0-1
        linkDirectionalArrowRelPos={1}
        linkWidth={link => highlightLinks.has(link) ? 5 : 1}
        // link粒子流动效果，粒子大小
        linkDirectionalParticles={4}
        // link宽度
        linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
        
        nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
        nodeCanvasObject={paintRing}
        // nodeCanvasObject={(node, ctx, globalScale) => {
        //     drawLabel(node, ctx, globalScale);
        //     paintRing(node, ctx);
        //  }}

        onNodeHover={handleNodeHover}
        onLinkHover={handleLinkHover}
        // 鼠标拖动的节点可以固定在原位置
        onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
        }}
    />;
};


export default HighlightGraph;