import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function StartBtnView({navigation}) {
  return (   
            <View style={style.btnViewSecond}>
                {/* View For Two Buttons */}
                <TouchableOpacity style={[buttonStyles.styleBtn, buttonStyles.pauseBtn]}>
                    <Text style={textStyles.startText}>Pause Auto Dialer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[buttonStyles.styleBtn, buttonStyles.stopBtn]}>
                    <Text style={textStyles.startText}>Stop Auto Dialer</Text>
                </TouchableOpacity>
            </View>
  )
}

const style = StyleSheet.create({
    btnViewSecond: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        display: "none",
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
    pauseBtn: {
        backgroundColor: "#FFA500"
    },
    stopBtn: {
        backgroundColor: "#FF0000"
    }
})

const textStyles = StyleSheet.create({
    startText: {
        fontSize: 22,
        fontWeight: "600",
        color: "white",
    },
})