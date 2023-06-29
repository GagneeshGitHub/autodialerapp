import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext, useRef } from "react";
import JsonContext from "../context/JsonData/JsonDataContext";

export default function PauseLowerComponent({navigation, pauseText, setPauseText, isPaused, resumeFunction, pauseFunction, currPerson}) {

  const jsonContext = useContext(JsonContext)

  const perNumber = jsonContext.number
  const perPriority = jsonContext.priority
  const revCount = jsonContext.revCount

  const [pauseTextVal, setPauseTextVal] = useState("Pause Auto Dialer")
  const [dialStatus, setDialStatus] = useState("Running")

  const [defaultTextStyle, setDefaultStyle] = useState(true)

  const pauseFun = ()=>{
    if(pauseTextVal==="Pause Auto Dialer"){
      setPauseTextVal("Resume Auto Dialer")
      setDialStatus("Paused")
      isPaused = true;
      jsonContext.pauseDialer()
      setDefaultStyle(false)
    } else {
      setDialStatus("Running")
      setPauseTextVal("Pause Auto Dialer")
      jsonContext.resumeDialer()
      setDefaultStyle(true)
    }
  }

  const stopFun = ()=>{
    jsonContext.stopDialer()
    navigation.navigate('startPage')
  }

  return (
    <View style={style.compView}>
      <View style={style.subView}>
        <View style={style.btnViewSecond}>
                {/* View For Two Buttons */}
                <TouchableOpacity onPress={()=>{pauseFun()}} style={[buttonStyles.styleBtn, buttonStyles.pauseBtn]}>
                    <Text style={textStyles.startText}>{pauseTextVal}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{stopFun()}} style={[buttonStyles.styleBtn, buttonStyles.stopBtn]}>
                    <Text style={textStyles.startText}>Stop Auto Dialer</Text>
                </TouchableOpacity>
            </View>

        {/* View For Details */}
        <View style={style.detView}>
          <Text style={textStyles.secondText}>Current Status</Text>
          <Text style={textStyles.simpleText}>Auto Dialer: {dialStatus}</Text>
          <Text style={defaultTextStyle ? textStyles.simpleText : textStyles.hiddenText}>Phone Number: {perNumber}</Text>
          <Text style={defaultTextStyle ? textStyles.simpleText : textStyles.hiddenText}>Priority Order: {perPriority}</Text>
          <Text style={defaultTextStyle ? textStyles.simpleText : textStyles.hiddenText}>
            Call gap counter: {revCount} seconds (paused)
          </Text>
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
    display: 'none',
  },
  btnViewSecond: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    // display: "none",
  },

  // Details View
  detView: {
    flex: 1,
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
  sixthText: {
    fontSize: 14,
    fontWeight: "600",
  },
  hiddenText: {
    display: "none",
  },
  simpleText: {
    display: "flex"
  }
});
