import G6 from "@antv/g6";
import {
  uniqueId
} from 'lodash';

const MIN_ARROW_SIZE = 3

const customEdge = {
  init() {
    const dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2]
    ];

    const lineDash = [4,2,1,2];
    const interval = 9;
    G6.registerEdge('customEdge', {
      draw(cfg, group) {
        let sourceNode, targetNode, start, end
        if (typeof (cfg.source) === 'string') {
          cfg.source = cfg.sourceNode
        }
        if (!cfg.source.x) {
          sourceNode = cfg.source.getModel()
          start = { x: sourceNode.x + cfg.start.x, y: sourceNode.y + cfg.start.y }
        } else {
          start = cfg.source
        }
        if (typeof (cfg.target) === 'string') {
          cfg.target = cfg.targetNode
        }
        if (!cfg.target.x) {

          targetNode = cfg.target.getModel()
          end = { x: targetNode.x + cfg.end.x, y: targetNode.y +  cfg.end.y }
        } else {
          end = cfg.target
        }
      var keyShape = group.addShape('path', {
        attrs: {
          path: [['M', start.x, start.y], ['L', end.x, end.y]],
          stroke: '#3385ff',
          lineWidth: 1,
          endArrow: {
            path: 'M 6,0 L -6,-6 L -6,6 Z',
            d: 6
          }
        }
      });
      return keyShape;
      },
      // afterDraw(cfg, group) {
        // if (cfg.source.getModel().isDoingStart && cfg.target.getModel().isDoingEnd) {
        //   const shape = group.get('children')[0];
        //   const length = shape.getTotalLength(); // G 增加了 totalLength 的接口
        //   let totalArray = [];
        //   for (var i = 0; i < length; i += interval) {
        //     totalArray = totalArray.concat(lineDash);
        //   }
        //   let index = 0;
        //   shape.animate({
        //     onFrame() {
        //       const cfg = {
        //         lineDash: dashArray[index].concat(totalArray)
        //       };
        //       index = (index + 1) % interval;
        //       return cfg;
        //     },
        //     repeat: true
        //   }, 3000);
        // }
      // },
      // setState(name, value, item) {
        // const group = item.getContainer();
        // const shape = group.get("children")[0];
        // const selectStyles = () => {
        //   shape.attr("stroke", "#6ab7ff");
        // };
        // const unSelectStyles = () => {
        //   shape.attr("stroke", "#3385ff");
        // };

        // switch (name) {
        //   case "selected":
        //   case "hover":
        //     if (value) {
        //       selectStyles()
        //     } else {
        //       unSelectStyles()
        //     }
        //     break;
        // }
      // }
    });
  }
}

export default customEdge
