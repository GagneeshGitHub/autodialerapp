import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UpperComponent from '../components/UpperComponent'
import LowerComponent from '../components/LowerComponent'
import { useContext } from 'react'
import JsonContext from '../context/JsonData/JsonDataContext'

export default function StartScreen({navigation, route}) {
    const setJsonData = route.params.setJsonD
    const stDialer = route.params.startDialer
    const fnDisplay = route.params.display
    const testFunction = route.params.testFuntion
    let textRef = route.params.textRef
    let displayText = route.params.displayText

    const context = useContext(JsonContext)

    // console.log("Value of the string in context is:", context.state)
  
    return (
    <View style={styles.mainView}>
        <UpperComponent displayText={displayText} setJSONData={setJsonData} textRef={textRef}/>
        <LowerComponent navigation={navigation} startDialer={stDialer} display={fnDisplay} testFunction={testFunction}/>
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