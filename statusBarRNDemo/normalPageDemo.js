/* eslint-disable prettier/prettier */
import React, { Component, useState, useEffect } from 'react';
import { Button, Text, View, Platform, StatusBar, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Input, Dropdown, Dialog } from 'stong-beeshell';
import { PageWrapper, Header } from '@/pages/UI/components/statusBar'
import { scaleSize, scaleHeight, setSpText2 } from './utils/screenUtil';
import { SearchSvg } from '@/assets/svgs'
import { comStyles, variables } from '@/pages/UI/common';


export default class TaskType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {
        name: ''
      }
    }
  }

  render() {
    const { param } = this.state
    return (
      <PageWrapper
        isFullScreen={false}
        statusBarColor='#fff'
        isFullScreenPageMode={false}
        reactNativeStatusBarProps={{
          barStyle: "dark-content",
        }}
        header={(
          <Header
            backgroundColor='#fff'
            navigation={this.props.navigation}
            title="请选择农事类型"
          />
        )}
        isLandScapeAutoHiddenStatusBar={true}
      >
        <View style={[comStyles.box]}>
          <View style={styles.search}>
            <SearchSvg style={comStyles.iconMs} />
            <Input
              value={param.name}
              onChange={(val) => this.setState({ param: { ...param, name: val } })}
              style={{ height: scaleHeight(18), flex: 1, padding: scaleSize(3) }}
              placeholder='请输入搜索类型'
            />
            <TouchableOpacity><Text style={comStyles.fontBaseDarkM}>搜索</Text></TouchableOpacity>
          </View>


        </View>
      </PageWrapper>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    ...comStyles.rowAlignCenter,
    backgroundColor: variables.white,
    borderRadius: scaleSize(19),
    height: scaleHeight(38),
    marginTop: scaleHeight(25),
    marginLeft: scaleSize(18),
    marginRight: scaleSize(18),
    marginBottom: scaleHeight(20),
    paddingLeft: scaleHeight(15),
    paddingRight: scaleHeight(15),
  },

})