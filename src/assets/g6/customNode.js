import G6 from "@antv/g6";
import {
	uniqueId
} from 'lodash';

const customNode = {
	init() {
		G6.registerNode("dataset", {
			draw(cfg, group) {
				const width = cfg.width;
				const height = cfg.height;
				
				group.addShape('rect', {
					attrs: {
						width: width,
						height: height,
						// stroke: "#ced4d9",
						fill: cfg.running ? 'green' : '#198abca6',
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'dataset-outline',
				});
				
				const keyShape = group.addShape('text', {
					attrs: {
						x: 30,
						y: 30,
						fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
						textAlign: 'center',
						textBaseline: 'middle',
						text: cfg.text,
						fontSize: 30,
						fill: '#fff'
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'dataset-icon',
				});

				group.addShape('text', {
					attrs: {
						x: width / 2,
						y: height + 20,
						textAlign: 'center',
						text: cfg.label,
						fontSize: 20,
						fill: '#198abca6'
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'dataset-title',
				});
			
				if (cfg.inPoints) {
					for (let i = 0; i < cfg.inPoints.length; i++) {
						let x,
							y = 0;
						x = width * cfg.inPoints[i][1];
						y = height * cfg.inPoints[i][0];
						const id = 'circle' + uniqueId()
						
						group.addShape("text", {
							attrs: {
								x: x,
								y: y,
								text: '',
								fontSize: 14,
								textAlign: 'center',
								textBaseline: 'middle',
								fill: '#0000D9',
							}
						});
						group.addShape("circle", {
							attrs: {
								id: 'circle' + uniqueId(),
								parent: id,
								x: x,
								y: y,
								r: 10,
								isInPointOut: true,
								fill: "#1890ff",
								opacity: 0
							}
						});
						group.addShape("circle", {
							attrs: {
								id: id,
								x: x,
								y: y,
								r: 3,
								isInPoint: true,
								fill: "#fff",
								stroke: "#1890ff",
								opacity: 0
							}
						});
					}
				}
				if (cfg.outPoints) {
					for (let i = 0; i < cfg.outPoints.length; i++) {
						let x,
							y = 0;
						
						x = width * cfg.outPoints[i][1];
						y = height * cfg.outPoints[i][0];

						const id = 'circle' + uniqueId()
						group.addShape("circle", {
							attrs: {
								id: 'circle' + uniqueId(),
								parent: id,
								x: x,
								y: y,
								r: 10,
								isOutPointOut: true,
								fill: "#1890ff",
								opacity: 0 //默認0 需要時改成0.3
							}
						});
						group.addShape("circle", {
							attrs: {
								id: id,
								x: x,
								y: y,
								r: 3,
								isOutPoint: true,
								fill: "#fff",
								stroke: "#1890ff",
								opacity: 0
							}
						});
					}
				}
				// 添加文本、更多图形
				return keyShape;
			},
			//设置状态
			setState(name, value, item) {
				const group = item.getContainer();
				const shape = group.get("children")[0]; // 顺序根据 draw 时确定

				const children = group.findAll(g => {
					return g.attrs.parent === shape.attrs.id
				});
				const circles = group.findAll(circle => {
					return circle.attrs.isInPoint || circle.attrs.isOutPoint;
				});
				const selectStyles = () => {
					shape.attr("opacity",0.5);
					shape.attr("cursor", "move");
					children.forEach(child => {
						child.attr("cursor", "move");
					});
					circles.forEach(circle => {
						circle.attr('opacity', 1)
					})
				};
				const unSelectStyles = () => {
					shape.attr("opacity",1);
					circles.forEach(circle => {
						circle.attr('opacity', 0)
					})
				};
				switch (name) {
					case "selected":
					case "hover":
						if (value) {
							selectStyles()
						} else {
							unSelectStyles()
						}
						break;
				}
			}
		});

		G6.registerNode("image", {
			draw(cfg, group) {
				const size = cfg.size;
				const width = size;
				const height = size;

				group.addShape('circle', {
					attrs: {
						r: size,
						fill: '#f8ab09',
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'image-outline',
				});

				const keyShape = group.addShape('text', {
					attrs: {
						x: 0,
						y: 0,
						fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
						textAlign: 'center',
						textBaseline: 'middle',
						text: cfg.text,
						fontSize: 35,
						fill: '#fff'
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'image-icon',
				});

				group.addShape('text', {
					attrs: {
						// x: image.size / 2,
						y: size + 20,
						textAlign: 'center',
						text: cfg.label,
						fontSize: 20,
						fill: '#198abca6'
					},
					// must be assigned in G6 3.3 and later versions. it can be any value you want
					name: 'image-title',
				});
				//状态
				if(cfg.status){
					let text = '',
						color = ''

					group.addShape('text', {
						attrs: {
							x: width + 5,
							y: height - 10,
							fontFamily: 'iconfont', // 对应css里面的font-family: "iconfont";
							textAlign: 'center',
							textBaseline: 'middle',
							text: text,
							fontSize: 20,
							fill: color
						},
						// must be assigned in G6 3.3 and later versions. it can be any value you want
						name: 'dataset-status',
					});
				}
				if (cfg.inPoints) {
					for (let i = 0; i < cfg.inPoints.length; i++) {
						let x,
							y = 0;
						
						x = width * cfg.inPoints[i][1];
						y = height * cfg.inPoints[i][0];
						const id = 'circle' + uniqueId()
				
						group.addShape("text", {
							attrs: {
								x: x,
								y: y,
								text: '',
								fontSize: 14,
								textAlign: 'center',
								textBaseline: 'middle',
								fill: '#0000D9',
							}
						});
						group.addShape("circle", {
							attrs: {
								id: 'circle' + uniqueId(),
								parent: id,
								x: x,
								y: y,
								r: 10,
								isInPointOut: true,
								fill: "#1890ff",
								opacity: 0
							}
						});
						group.addShape("circle", {
							attrs: {
								id: id,
								x: x,
								y: y,
								r: 3,
								isInPoint: true,
								fill: "#fff",
								stroke: "#1890ff",
								opacity: 0
							}
						});
					}
				}
				if (cfg.outPoints) {
					for (let i = 0; i < cfg.outPoints.length; i++) {
						let x,
							y = 0;
					
						x = width * cfg.outPoints[i][1];
						y = height * cfg.outPoints[i][0];
						const id = 'circle' + uniqueId()
						group.addShape("circle", {
							attrs: {
								id: 'circle' + uniqueId(),
								parent: id,
								x: x ,
								y: y,
								r: 10,
								isOutPointOut: true,
								fill: "#1890ff",
								opacity: 0 //默認0 需要時改成0.3
							}
						});
						group.addShape("circle", {
							attrs: {
								id: id,
								x: x,
								y: y,
								r: 3,
								isOutPoint: true,
								fill: "#fff",
								stroke: "#1890ff",
								opacity: 0
							}
						});
					}
				}
				// 添加文本、更多图形
				return keyShape;
			},
			//设置状态
			setState(name, value, item) {
				const group = item.getContainer();
				const shape = group.get("children")[0]; // 顺序根据 draw 时确定

				const children = group.findAll(g => {
					return g.attrs.parent === shape.attrs.id
				});
				const circles = group.findAll(circle => {
					return circle.attrs.isInPoint || circle.attrs.isOutPoint;
				});
				const selectStyles = () => {
					shape.attr("opacity", 0.5);
					shape.attr("cursor", "move");
					children.forEach(child => {
						child.attr("cursor", "move");
					});
					circles.forEach(circle => {
						circle.attr('opacity', 1)
					})
				};
				const unSelectStyles = () => {
					shape.attr("opacity", 1);
					circles.forEach(circle => {
						circle.attr('opacity', 0)
					})
				};
				switch (name) {
					case "selected":
					case "hover":
						if (value) {
							selectStyles()
						} else {
							unSelectStyles()
						}
						break;
				}
			}
		});
	}
}

export default customNode;