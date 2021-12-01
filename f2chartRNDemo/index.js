/* 使用例子 */
import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import F2Chart from './F2Chart'
export default class f2chartDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const f2Option = {
      colors: ['green', 'blue', 'red'],
      legend: {
        data: ['环境温度', '环境湿度',],
      },
      xAxis: {
        type: 'category',
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00']
      },
      yAxis: {
        type: 'value',
      },
      datazoom: {
        color: ['green']
      },

      series: [
        {
          name: '环境温度',
          data: [2, 3, 8, 5, 7, 10, 4],
        },
        {
          name: '环境湿度',
          data: [3, 6, 4, 2, 7, 8, 9, 1],
        },
      ]
    }
    const pieOption = {
      type: 'pie',
      pieLabel: true,
      colors: ['#7492eb', '#90cb75', '#f9c758', '#ed6666', '#73bfdd',],
      series: [{
        radius: ['0.5', '0.52'],
        data: [
          {
            name: '已完成',
            value: 20
          },
          {
            name: '未完成',
            value: 15
          },
          {
            name: '已延期',
            value: 2
          },
        ]
      }
      ]
    };
    return (
      <View>
        <View style={{ margin: 10, backgroundColor: '#fff' }}>
          <Text>折线图</Text>
          <F2Chart
            option={f2Option}
            style={{ height: scaleHeight(330) }}
          />
        </View>
        <View style={{ margin: 10, backgroundColor: '#fff' }}>
          <Text>饼图</Text>
          <F2Chart
            option={pieOption}
            style={{ height: scaleHeight(250) }}
          />
        </View>
      </View>
    )
  }
}




const styles = StyleSheet.create({

})