
/**
 * Created by lizhehang on 20ROOT_RADIUS/1/15.
 * rootCateData 左侧菜单 主要字段firstCateName
 * cateData 右侧菜单 主要字段 secondCateName data
 * needScrollTo 是否需要根据滑动的内容左侧菜单相应滚动 需要时cateData为单一分类 secondCate与firstCate相同
 * mainColor 根节点颜色及右侧菜单颜色
 * bgColor 未被选择的节点颜色
 * rootEndReached 根节点列表上拉加载更多
 */
import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, SectionList, Dimensions } from 'react-native'

const screenH = Dimensions.get('window').height
const HEADER_HEIGHT = 110
const ROOT_HEIGHT = 44
const ROOT_WIDTH = 86
const ROOT_RADIUS = 22
const CELL_WIDTH = 64
const CELL_HIGHT = 104
const SECTION_COLUMS = 3
const SECTION_HEADER = 49


export default class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.flatList = null
    this.sectionList = null
    this.state = {
      selectedRootCate: 0,//左边选择项,
      rootCateData: [],
      cateData: [],
      rootSelItem: { varietyTypeId: 0 },
      isScroll: false,//区分滚动和左侧菜单点击的页面事件变化,
      bgColor: '#f5f5f5',
      mainColor: '#fff'
    }
  }

  componentDidMount() {
    const { cateData, bgColor, mainColor, rootCateData, selRootCate } = this.props
    this.setState({
      selectedRootCate: selRootCate || 0,
      rootCateData: rootCateData || [],
      cateData: cateData || [],
      rootSelItem: rootCateData[selRootCate || 0] || {},
      bgColor: bgColor || '#f5f5f5',
      mainColor: mainColor || '#fff'
    })
  }

  componentWillUpdate(nextProps, nextState) {
    if (
      (JSON.stringify(nextProps.cateData) !== JSON.stringify(this.state.cateData))
      || (JSON.stringify(nextProps.rootCateData) !== JSON.stringify(this.state.rootCateData))
      || nextProps.selRootCate !== this.props.selRootCate) {
      this.setState({
        selectedRootCate: nextProps.selRootCate || 0,
        rootCateData: nextProps.rootCateData || [],
        cateData: nextProps.cateData || [],
        rootSelItem: nextProps.rootCateData[nextProps.selRootCate || 0] || {},
      })
    }

    if ((nextState.selectedRootCate !== undefined && nextState.selectedRootCate !== this.state.selectedRootCate)) {
      this.props.selRootCateChange && this.props.selRootCateChange(nextState.selectedRootCate, nextState.rootSelItem)

    }
  }






  renderRootItem = (item, index) => {//左边菜单节点
    const { rootCateData, selectedRootCate, mainColor, bgColor } = this.state
    const { needScrollTo } = this.props
    return (
      <View style={{ position: 'relative' }}>
        {
          selectedRootCate !== index && <View style={{ width: ROOT_WIDTH, height: ROOT_HEIGHT, backgroundColor: mainColor, position: 'absolute', zIndex: -1 }} />
        }
        <TouchableOpacity
          key={index}
          style={[{ alignItems: 'center', justifyContent: 'center', width: ROOT_WIDTH, height: ROOT_HEIGHT },
          index === selectedRootCate + 1 ? { borderTopRightRadius: ROOT_RADIUS } : {},
          index === selectedRootCate - 1 ? { borderBottomRightRadius: ROOT_RADIUS } : {},
          index === selectedRootCate ?
            { backgroundColor: mainColor, borderTopLeftRadius: ROOT_RADIUS, borderBottomLeftRadius: ROOT_RADIUS }
            : { backgroundColor: bgColor }
          ]}
          onPress={() => {
            setTimeout(() => {
              (rootCateData.length - index) * ROOT_HEIGHT > screenH - HEADER_HEIGHT - ROOT_HEIGHT ? this.flatList.scrollToOffset({ animated: true, offset: index * ROOT_HEIGHT }) : null
              this.sectionList.scrollToLocation({ itemIndex: 0, sectionIndex: needScrollTo ? index : 0, animated: true, viewOffset: 0 })
            }, 100)
            this.setState({ selectedRootCate: index, rootSelItem: item, isScroll: false })
          }}
        >
          <Text
            style={{ fontSize: 14, color: '#808080' }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {item.firstCateName}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderRootCate() {//左边分类列表  
    const { rootCateData, bgColor } = this.state
    const { rootEndReached } = this.props
    return (
      <View style={{ backgroundColor: bgColor }}>
        <FlatList
          ref={flatList => this.flatList = flatList}
          data={rootCateData}
          ListHeaderComponent={() => (<View />)}
          ListFooterComponent={() => (<View />)}
          // ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#F5F5F5' }} />}
          renderItem={(e) => this.renderRootItem(e.item, e.index)}
          onEndReachedThreshold={20}
          showsVerticalScrollIndicator={false}
          onEndReached={() => rootEndReached()}
        />
      </View>
    )
  }

  sectionComp(item) {
    const { mainColor } = this.state
    return (
      <View style={{ backgroundColor: mainColor, paddingTop: 10, paddingLeft: 24, paddingBottom: 15 }}>
        <Text
          style={{ fontSize: 12, color: '#808080' }}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {item.section.secondCateName}
        </Text>
      </View>
    )
  }

  renderCell(item, sectionIndex, index) {//每个选择项
    const { itemOnPress } = this.props
    return (
      <TouchableOpacity
        key={item?.id}
        style={[{ alignItems: 'center', justifyContent: 'center', paddingRight: 24, paddingBottom: 15 }]}
        onPress={() => itemOnPress ? itemOnPress(item, sectionIndex, index) : alert(`点击了第${sectionIndex}组中的第${index}个商品`)}
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

  renderItem(item) {//右边菜单二级分类
    const { cateData, } = this.state
    const { renderCell, needScrollTo } = this.props
    let sectionIndex = item.section.rootIndex
    let data = item?.section?.data
    return item.index === 0 ?
      <>
        <View key={item.index}
          style={{
            paddingLeft: 24,
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {
            data.map((cell, index) => renderCell ? renderCell(cell, sectionIndex, index) : this.renderCell(cell, sectionIndex, index))
          }
        </View>
        {
          needScrollTo && <>
            {
              item?.section?.rootIndex !== cateData?.length - 1 ?
                <View style={{ height: 1, backgroundColor: '#efefef' }} />
                : <View style={{ height: screenH - (Math.ceil(item?.section?.data?.length / SECTION_COLUMS) * CELL_HIGHT + SECTION_HEADER) - HEADER_HEIGHT }} />//最后一个菜单的空白占位
            }
          </>
        }
      </>
      : null
  }

  renderItemCate() {//右边菜单
    const { cateData, selectedRootCate, rootSelItem } = this.state
    const { renderSectionHeader, needScrollTo, onCateEndReached, onCateRefresh } = this.props
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          ref={(ref) => this.sectionList = ref}
          renderSectionHeader={(item) => renderSectionHeader ? renderSectionHeader(item) : this.sectionComp(item)}
          renderItem={(data) => this.renderItem(data)}
          sections={cateData}
          // ListEmptyComponent={<DefaultPage style={{ height: 200 }} />} 
          ItemSeparatorComponent={() => <View />}
          ListHeaderComponent={() => <View />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => 'key' + index + item}
          onEndReached={() => onCateEndReached && onCateEndReached()}
          onViewableItemsChanged={(e) => { needScrollTo && this.scrollRootSel(e) }}
          onScrollBeginDrag={(e) => { this.setState({ isScroll: true }) }}
          onScrollAnimationEnd={() => { this.setState({ isScroll: false }) }}
        />
      </View>
    )
  }

  scrollRootSel = (e) => {//右边菜单滚动时左边菜单跳到相应选项
    const { cateData, isScroll, rootCateData } = this.state
    let currentIndex = e?.viewableItems[0]?.section?.rootIndex
    if (isScroll) {
      this.setState((preveState, preveProps) => ({
        selectedRootCate: currentIndex,
        rootSelItem: cateData[currentIndex]
      }), () => {
        (rootCateData.length - currentIndex) * ROOT_HEIGHT > screenH - HEADER_HEIGHT ? this.flatList.scrollToOffset({ animated: true, offset: currentIndex * ROOT_HEIGHT }) : null
      })
    }
  }

  renderCategory() {
    const { mainColor } = this.state
    return (
      <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainColor }}>
        {this.renderRootCate()}
        {this.renderItemCate()}
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderCategory()}
      </View>
    )
  }
}



const styles = StyleSheet.create({

})