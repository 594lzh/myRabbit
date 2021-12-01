import React, { PureComponent } from 'react';
import { View } from 'react-native';
import F2Chart from './charts';

interface Props {
    option: Object;
    style?: any;
}
class F2LineChart extends PureComponent {
    getData = () => {
        const { option } = this.props
        let dataList = []
        option.series.map((item) => {
            item.data.map((data, index) => {
                let newItem = {}
                newItem.type = item.name;
                newItem.value = data
                newItem.date = option.xAxis.data[index]
                dataList.push(newItem)
            })
        })
        return dataList
    }
    render() {
        const { style, option } = this.props;
        return (
            <View style={style || { flex: 1 }}>
                <F2Chart
                    data={option?.type === 'pie' ? option?.series[0]?.data : this.getData()}
                    option={option}
                />
            </View>
        );
    }
}

export default F2LineChart;