/**
 * Created by guangqiang on 2017/12/9.
 */
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import data from './data.json'
import CategoryList from './CategoryList'


export default class CateDemo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRootCate: 0,//左边选择项,
      param: {
        name: ''
      }
    }
  }

  componentDidMount() {
    // 网络请求
  }

  componentWillUpdate(nextProps, nextState) {
    //左边菜单切换时重新请求
  }





  sectionComp(item) {
    const { param } = this.state
    return (
      <View style={{ backgroundColor: '#f5f5f5', paddingTop: 10, paddingLeft: 24, paddingBottom: 15 }}>
        <View style={styles.search}>
          <TextInput
            value={param.name}
            onChange={(e) => this.setState({ param: { ...param, name: e.nativeEvent.text } })}
            style={{ height: 18, flex: 1, padding: 3 }}
            placeholder='请输入名称'
          />
          <TouchableOpacity onPress={() => { }}><Text style={{ fontSize: 14, color: '#272727' }}>搜索</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  renderCell(item, sectionIndex, index) {//每个选择项
    return (
      <TouchableOpacity
        key={item?.id}
        style={[{ alignContent: 'center', paddingRight: 24, paddingBottom: 15, width: '100%' }]}
        onPress={() => alert(`点击了第${sectionIndex}组中的第${index}个商品`)}
      >
        <Image style={{ width: CELL_WIDTH, height: CELL_WIDTH, borderRadius: CELL_WIDTH }} source={{ uri: item?.img || 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F01%2F40%2F65%2F61573d0bf6a3c2b.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1CELL_WIDTH4982326&t=98f3ccdb6379042cROOT_WIDTH5e4e361ab8f591' }} />
        <Text
          style={[{ fontSize: 14, color: '#4d4d4d', marginTop: 5, width: CELL_WIDTH, textAlign: 'center' }]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {item?.name}
        </Text>
      </TouchableOpacity>
    )
  }



  render() {//左右联动菜单
    return (

      <View style={[{ flex: 1, paddingTop: 10 }]}>
        <CategoryList
          rootCateData={data.rootCateData}
          cateData={data.cateData}
          rootEndReached={() => { }}
          itemOnPress={(item, sectionIndex, index) => alert(`点击了第${sectionIndex}组中的第${index}个商品`)}
          needScrollTo
        // onCateEndReached={() => {}}
        />
      </View>
    )
  }


  // render() {//自定义非联动菜单
  //   const { selectedRootCate } = this.state
  //   return (
  //     <View style={{ flex: 1, paddingTop: 10, backgroundColor: '#fff' }}>
  //       <CategoryList
  //         bgColor='#fff'
  //         mainColor='#f5f5f5'
  //         rootCateData={data.rootCateData}
  //         rootEndReached={() => { }}
  //         cateData={[data.cateData[selectedRootCate]]}
  //         renderCell={(item, sectionIndex, index) => this.renderCell(item, sectionIndex, index)}
  //         renderSectionHeader={(item) => this.sectionComp(item)}
  //         selRootCate={selectedRootCate} //自定义选定的根菜单
  //         selRootCateChange={(index, item) => { this.setState({ selectedRootCate: index }) }}
  //       />
  //     </View >
  //   )
  // }
}



const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#efefef',
    borderWidth: 1,
    height: 38,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
})