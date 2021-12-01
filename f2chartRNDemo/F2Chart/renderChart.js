// 从数组中获取最大的值
const getMaxValue = list => {
  const nums = list.map(v => v.value);
  return Math.max.apply(null, nums);
};

function sum(arr) {
  return eval(arr.join("+"));
};

export const changeChartData = props => {
  const { data = [] } = props;
  const chartData =
    data.map(c => {
      return {
        ...c,
        date: c.date,
      };
    })
  return `chart && chart.changeData(${JSON.stringify(chartData)})`;
};

export default function renderChart(props) {
  const { data = [], option } = props;
  const chartData = data.map(c => {
    return {
      ...c,
      date: c.date, // 可在此处做时间格式处理
    };
  })


  const lastData = chartData[chartData.length - 1];
  const max = getMaxValue(chartData)

  //简单做了折线图和饼图区分 其他类型需自行修改
  if (option.type !== 'pie') {
    const script = `
  (function(){
    const chart = new F2.Chart({
      id: 'chart',
      pixelRatio: window.devicePixelRatio,
      padding: [ 'auto', 'auto',60, 'auto' ]
    });
    
    chart.source(${JSON.stringify(chartData)}, {
      value: {
        tickCount: 5,
        min: 0,
        // max:${JSON.stringify(max)}*1.2,
      },
      date: {
        type: 'cat',
        range: [0.02, 0.98],
        mark:'MM-DD',
        tickCount: 7,
      }
    });

    chart.legend(${option.legend ? true : false},{
      position: 'bottom',
      offsetY: ${option.series.length > 5}?0:-12,
      align:'center',
      itemWidth:null,
      itemMarginBottom:8,
      marker(x, y, r, ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.fill();
      }
    });

    chart.tooltip({
      showCrosshairs:true,
    });

    //移动端手势: pinch 和 pan，在电脑上是不能模拟的

    chart.scrollBar({
      mode:'x',
      xStyle:{
        backgroundColor: '#f5f5f5', 
        fillerColor: '${option.datazoom.color}'||'#5fc48d', 
        size: 4, 
        lineCap: 'round', 
        offsetX: 0 , 
        offsetY: ${!option.legend}?-18:0
      },
    });
    chart.interaction('pan', {
      step:1,
      speed:10,
      panThreshold:1,
      pressThreshold:1,
    });

    chart.interaction('pinch', {
      background:'#000',
      mode: 'x', // 图表平移的方向，默认为 'x'
      minScale: 0.1, // 缩小的最小倍数
      maxScale: 4, // 放大的最大倍数
      pressThreshold: 9, // hammer.js 设置，用于设置触发 press 事件的设置
      pressTime: 251 // hammer.js 设置，用于设置触发 press 事件的最小时间差
    });
    
   
    chart.axis('value', {
      line:F2.Global._defaultAxis.line,
      grid:null,
      label: function label(text, index, total) {
        const textCfg = {
          text
        };
        return textCfg;
      }
    });
    chart.axis('date', {
      label: function label(text, index, total) {
        const textCfg = {
        };
        // if (index === 0) {
        //   textCfg.textAlign = 'left';
        // } else if (index === total - 1) {
        //   textCfg.textAlign = 'right';
        // }
        return textCfg;
      }
    });
    chart.line({
      sortable: false
    }).position('date*value')
    .shape('smooth')
    .color('type',${JSON.stringify(option.colors)})

    chart.render();
 
  })();
  `;
    return script
  } else {
    let total = sum(data.map(item => { return item.value }))
    //是否显示每块区域的名称及比例
    const pieLabel = option?.pieLabel ? ` 
    chart.pieLabel({
      label1(data, color) {
        return {
          text: data.name+' '+ (data.value/${total}*100).toFixed(2)+'%', // 文本内容
          fill: color // 文本颜色
        };
     }
    });
    `: ``
    const pieScript = `
(function(){
    const chart = new F2.Chart({
      id: 'chart',
      pixelRatio: window.devicePixelRatio,
      padding:0
    });
      chart.source(${JSON.stringify(data)},{
        name:{},
        value:{}
      });
      chart.coord('polar', {
        transposed: true,
        innerRadius: ${option?.series[0]?.radius[0]},
        radius: ${option?.series[0]?.radius[1]},  
        
      });
      chart.axis(false);
      chart.legend(false);
      chart.tooltip(false);

       ${pieLabel}
      //饼图选中
      // chart.interaction('pie-select');
      
      chart
        .interval()
        .position('1*value')
        .color('name', ${JSON.stringify(option.colors)})
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff'
        });
      chart.render();
    })();
    `
    return pieScript;
  }

}