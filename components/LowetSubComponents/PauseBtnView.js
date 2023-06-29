import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function PauseBtnView({navigation}) {
  return (
    <>
      {/* View For Buttons */}
      <View style={style.btnView}>
        <TouchableOpacity
          onPress={() => {
            startBtnFun();
          }}
          style={[buttonStyles.styleBtn, buttonStyles.startBtn]}
        >
          <Text style={textStyles.startText}>Start Auto Dialer</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}


const style = StyleSheet.create({
    // Button view
    btnView: {
        flex: 1,
        alignItems: "center",
        // display: 'none',
    },
})

const buttonStyles = StyleSheet.create({
    styleBtn: {
        width: "80%",
        height: "40%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    startBtn: {
        backgroundColor: "#24a0ed",
    },
})

const textStyles = StyleSheet.create({
    startText: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
})