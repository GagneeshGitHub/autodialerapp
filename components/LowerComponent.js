import { View, Text, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import JsonContext from "../context/JsonData/JsonDataContext";
import { chkAndArrangeJSON } from "./Functions/JSONdatafunction";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state'
])

export default function LowerComponent({navigation, display, startDialer, testFunction }) {

    const jsonContext = useContext(JsonContext)

    const startBtnFun = ()=>{

        // testFunction()

        let jsonData = jsonContext.state

        sortedJson = chkAndArrangeJSON(jsonData)

        jsonContext.upSorArr(sortedJson)

        // display()

        // startDialer(0)

        // console.log("After the startDialer function")
        // //Navigate to other screen

        navigation.navigate("pausePage")
    }

    useEffect(()=>{
      //Call the dialer function
      if(JsonContext.sortedState?.length !==0 ){
        console.log("The use effect function is called")
        jsonContext.startDialer(0)
      }
    }, [jsonContext.sortedState])

  return (
    <View style={style.compView}>
      <View style={style.subView}>
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

        {/* View For Details */}
        <View style={style.detView}>
        </View>
      </View>
    </View>
  );
}

let style = StyleSheet.create({
  compView: {
    // flex: 1,
    width: "90%",
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  subView: {
    width: "90%",
    height: "90%",
  },
  // Button view
  btnView: {
    flex: 1,
    alignItems: "center",
    // display: 'none',
  },
  btnViewSecond: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    display: "none",
  },

  // Details View
  detView: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    padding: 10,
    alignItems: "flex-start",
  },

  //Class for navigator
  navigator: {
    flex: 1,
    backgroundColor: "green",
  },
});

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
  pauseBtn: {
    backgroundColor: "#FFA500",
  },
  stopBtn: {
    backgroundColor: "#FF0000",
  },
});

const textStyles = StyleSheet.create({
  startText: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
  },
  secondText: {
    fontSize: 16,
    fontWeight: "600",
  },
  thirdText: {},
  fourthText: {},
  fifthText: {},
  sixthText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
