<template>
	<div id="mountNode"></div>
</template>

<script>
// @ is an alias to /src
import G6 from "@antv/g6";
export default {
	name: 'Home',
	components: {
	},
	mounted() {
		setTimeout(()=>{
			this.init();
		},2000)
	},
	methods: {
		init() {
			const data = {
				nodes: [{
					id: "node1",
					x: 100,
					y: 200,
					name: "image",
					label: "\ue600",
					itemType: "node",
					// text: '\ue600',
					text: "gaah",
					size: 60,
					type: "image",
					image: "image.png",
				}],
				edges: []
			};
			const graph = new G6.Graph({
				container: 'mountNode',
				width: 500,
				height: 300
			});


			G6.registerNode("image", {
				draw(cfg, group) {
					const size = cfg.size;

					group.addShape("circle", {
						attrs: {
							r: size,
							fill: "red",
						},
						name: "mage-outline",
					});

					group.addShape("text", {
						attrs: {
							fontFamily: "iconfont",
							y: 25,
							textAlign: "center",
							text: cfg.label,
							fontSize: 40,
							fill: "#198abca6"
						},
						name: "image-title",
					});
				},
			});

			graph.data(data);
			graph.render();
		}
	}
}
</script>


