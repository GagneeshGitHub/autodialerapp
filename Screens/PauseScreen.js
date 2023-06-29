import { View, Text,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import PauseUpperComponent from '../components/PauseUpperComponent'
import PauseLowerComponent from '../components/PauseLowerComponent'

export default function PauseScreen({navigation, route}) {

    const jsonData = route.params.jsonRef.current

    // State for text
    const [pauseText,setPauseText] = useState("Pause Auto Dialer")
    let isPaused = route.params.isPaused
    let resumeFunction = route.params.resumeDialer
    let pauseFunction = route.params.pauseDialer
    const currPerson = route.params.currPerson

  return (
    <View style={styles.mainView}>
        <PauseUpperComponent jsonData={jsonData}/>
        <PauseLowerComponent navigation={navigation} pauseText={pauseText} setPauseText={setPauseText} resumeFunction={resumeFunction} isPaused={isPaused} pauseFunction={pauseFunction} currPerson={currPerson}/>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // backgroundColor: "#F4E3FF",
        // backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center"
      }
})