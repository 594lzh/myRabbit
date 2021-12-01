import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationBar } from "stong-beeshell";
import {
  scaleSize,
  scaleHeight,
  setSpText2,
  screenH,
} from "../../utils/screenUtil";
// import ActionBtn from "../../ActionBtn";

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});
const fullScreenH = screenH + StatusBar.currentHeight;
interface state {
  style?: object;
  title?: string;
  backLabel?: any;
  titleColor?: string;
  backText?: string;
  nextText?: string;
  nextLabel?: any;
  navigation?: any;
  backgroundColor?: string;
  next?: Function;
  titleContainer?: any;
  titlePress: Function;
  onPressBack?: Function;
  notBack?: boolean;
  actionBtn?: boolean;
  fullScreen?: boolean;
}

export default class Header extends Component<state> {
  render() {
    const headerStyle = [styles.container, this.props.style];
    return (
      <View style={headerStyle}>
        //自主定义头部内容
        <NavigationBar
          title={this.props.title ? this.props.title : ""}
          titleContainer={
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.titlePress ? this.props.titlePress() : {}
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {this.props.titleColor === "white" ? (
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: setSpText2(16),
                      fontWeight: "bold",
                    }}
                  >
                    {this.props.title}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "#333333",
                      textAlign: "center",
                      fontSize: setSpText2(16),
                      fontWeight: "bold",
                    }}
                  >
                    {this.props.title}
                  </Text>
                )}
                <View style={{ marginLeft: scaleSize(8) }}>
                  {this.props.titleContainer}
                </View>
              </View>
            </TouchableWithoutFeedback>
          }
          backLabel={this.props.backLabel}
          backLabelText={this.props.backText ? this.props.backText : ""}
          forwardLabelText={this.props.nextText ? this.props.nextText : ""}
          forwardLabel={this.props.nextLabel}
          onPressBack={() => {
            this.props.notBack
              ? this.props.onPressBack
                ? this.props.onPressBack()
                : {}
              : this.props.navigation.goBack();
          }}
          onPressForward={() => (this.props.next ? this.props.next() : {})}
          style={[
            { backgroundColor: this.props.backgroundColor },
            this.props.style,
          ]}
        />
        //页面固定悬浮按钮
        {/* {this.props.actionBtn && (
          <ActionBtn
            navigation={this.props.navigation}
            offsetY={this.props.fullScreen ? fullScreenH : screenH}
          />
        )} */}
      </View>
    );
  }
}
