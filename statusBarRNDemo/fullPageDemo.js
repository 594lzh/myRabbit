/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { scaleSize, scaleHeight, setSpText2 } from './utils/screenUtil';
import {
  MineBgSvg, AvatarSvg, EnterWhiteSvg, EnterSvg, PwdRedSvg, MesSvg,
  AboutSvg, OpinionSvg, ConnectSvg, ShareSvg
} from '@/assets/svgs'
import { PageWrapper, Header } from './statusBar'
import { comStyles, variables } from '@/pages/UI/common';


export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mine: [
        {
          key: 'mine',
          title: '我的信息',
          icon: (<MesSvg style={comStyles.iconL} />)
        },
        {
          key: 'pwd',
          title: '修改密码',
          icon: (<PwdRedSvg style={comStyles.iconL} />)
        }
      ],
      list: [
        {
          key: 'opinion',
          title: '意见反馈',
          icon: (<OpinionSvg style={comStyles.iconL} />)
        },
        {
          key: 'share',
          title: '分享APP',
          icon: (<ShareSvg style={comStyles.iconL} />)
        },
        {
          key: 'connect',
          title: '联系客服',
          icon: (<ConnectSvg style={comStyles.iconL} />)
        },
        {
          key: 'about',
          title: '关于',
          icon: (<AboutSvg style={comStyles.iconL} />)
        },
      ]
    }
  }
  render() {
    return (
      <PageWrapper
        isFullScreen={false}
        statusBarColor='transparent'
        isFullScreenPageMode={false}
        reactNativeStatusBarProps={{
          barStyle: "light-content",
        }}
        header={(
          <Header
            backgroundColor={'transparent'}
            backLabel={(<View></View>)}
            notBack
            title={''}
            titleContainer={null}
          />
        )}
        isLandScapeAutoHiddenStatusBar={true}
      >
        <View style={comStyles.box}>
          <MineBgSvg style={[comStyles.bg, { height: scaleHeight(216) }]} ></MineBgSvg>
          <View style={styles.main}>
            <View style={styles.header}>
              <View style={comStyles.rowAlignCenter}>
                <AvatarSvg style={styles.avatar}></AvatarSvg>
                <View style={{ justifyContent: 'center', marginLeft: scaleSize(10) }}>
                  <Text style={{ color: '#fff', fontSize: setSpText2(18), marginBottom: scaleHeight(5) }}>夏雨天</Text>
                  <Text style={{ color: '#fff', fontSize: setSpText2(13) }}>手机：183****1972</Text>
                </View>
              </View>
              <EnterWhiteSvg style={comStyles.iconMss} />
            </View>
            <View style={comStyles.filletBoxXs}>
              {
                this.state.mine.map(item => {
                  return (
                    <View style={styles.listItem} key={item.key}>
                      {item.icon}
                      <View style={styles.itemRight}>
                        <Text style={comStyles.fontBaseDarkM}>{item.title}</Text>
                        <EnterSvg style={comStyles.iconMss} />
                      </View>

                    </View>
                  )
                })
              }
            </View>
            <View style={comStyles.filletBoxXs}>
              {
                this.state.list.map(item => {
                  return (
                    <View style={styles.listItem} key={item.key}>
                      {item.icon}
                      <View style={styles.itemRight}>
                        <Text style={comStyles.fontBaseDarkM}>{item.title}</Text>
                        <EnterSvg style={comStyles.iconMss} />
                      </View>

                    </View>
                  )
                })
              }
            </View>
            <TouchableOpacity
              style={[comStyles.filletBoxXs, styles.logout]}
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            >
              <Text style={{ fontSize: setSpText2(14), color: '#FF7073' }}>退出登录</Text>
            </TouchableOpacity>
          </View>

        </View>
      </PageWrapper>
    );
  }
}

//样式代码
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginBottom: scaleHeight(34),
  },
  listItem: {
    flexDirection: 'row',
    height: scaleHeight(52),
    alignItems: 'center',
    paddingLeft: scaleSize(15),
    paddingRight: scaleSize(15),
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: scaleHeight(1),
    height: scaleHeight(52),
    marginLeft: scaleSize(14)
  },
  logout: {
    height: scaleHeight(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: scaleSize(65),
    height: scaleHeight(65)
  }
})