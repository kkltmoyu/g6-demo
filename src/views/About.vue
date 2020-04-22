<template>
  <div>
    <a href='javascript:void(0)' @click='autoLayout'>左右布局</a>
    <div id="mountNode"></div>
  </div>
	
</template>

<script>
// @ is an alias to /src
import G6 from "@antv/g6";
import customNode from "@/assets/g6/customNode";
import customEdge from "@/assets/g6/customEdge";

let existData = {
	edges: [{
		end: {
			x: -30,
			y: 0
		},
		start: {
			x: 30,
			y: 0
		},
		endPoint: { x: 593.5, y: 143.51157407407408 },
		id: "customEdge43",
		itemType: "edge",
		source: 'image11',
		startPoint: { x: 412.5, y: 169.48842592592592 },
		target: "image2",
		type: "customEdge"
	}],
	groups: [],
	nodes: [{
		detailType: "rightPanel",
		id: "image2",
		image: "image.png",
		inPoints: [
			[-1, 0], [0, -1]
		],
		itemType: "node",
		label: "image3",
		name: "image3",
		offsetX: 24,
		offsetY: 23,
		outPoints: [[1, 0], [0, 1]],
		size: 30,
		text: "\ue600",
		type: "image",
		x: 611,
		y: 141,
	}, {
		detailType: "rightPanel",
		id: "image11",
		image: "image.png",
		inPoints: [
			[-1, 0], [0, -1]
		],
		itemType: "node",
		label: "image6",
		name: "image6",
		offsetX: 15,
		offsetY: 16,
		outPoints: [[1, 0], [0, 1]],
		size: 30,
		text: "\ue600",
		type: "image",
		x: 395,
		y: 172,
	}],
}

export default {
	name: 'Home',
	components: {
	},
	mounted() {
			this.init();
	},
  data() {
		return {
			graph: null
		};
	},
	methods: {
		init() {
			const graph = new G6.Graph({
				container: 'mountNode',
				width: 800,
				height: 600
			});
      this.initCustom()
      this.graph = graph;
			graph.data(existData);
      graph.render();
    },
    initCustom(){
      customNode.init();
      customEdge.init();
    },
    autoLayout(){
      this.graph.updateLayout({
        type:'dagre',
        rankdir: 'LR', // 可选，默认为图的中心
      })
    },
	}
}
</script>


