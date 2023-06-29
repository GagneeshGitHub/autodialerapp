import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useContext } from 'react'
import JsonContext from '../context/JsonData/JsonDataContext'


export default function UpperComponent({jsonData, textRef, displayText}) {

    const jsonContext = useContext(JsonContext)

  return (
    <View style={styles.compView}>
        {/* Call Gap Section */}
        <View style={styles.cgView}>
            {/* Call gap left and right view */}
            <View style={styles.leftCGView}>
                <Text style={textStyles.firstText}>Call Gap</Text>
                <Text style={textStyles.secondText}>(in seconds)</Text>
            </View>
            <View style={styles.rightCGView}>
                <TextInput editable={false} style={styles.tInput} placeholder="type here..." keyboardType='numeric'/>
            </View>
        </View>

        {/* JSON Data Section */}
        <View style={styles.jdView}>
            <Text style={textStyles.thirdText}>Insert JSON phone data</Text>
            <TextInput editable={false} value={jsonContext.state} ref={(ref)=>textRef=ref} multiline={true} style={styles.jdInput} placeholder='type here...'/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    compView: {
        // flex: 1,
        // backgroundColor: "skyblue",
        width: "90%",
        height: "40%",
    },

    // Call Gap View
    cgView: {
        width: "100%",
        height: "25%",
        // backgroundColor: "blue",
        flexDirection: "row"
    },

    //JSON data view
    jdView: {
        width: "100%",
        height: "75%",
        // backgroundColor: "green"
    },

    // CallGap section right and left views
    leftCGView: {
        flex: 1,
        // backgroundColor: "white",
        justifyContent: "center",
    },
    rightCGView: {
        flex: 1,
        justifyContent: "center",
        // backgroundColor: "pink"
    },

    //Text input for call gap
    tInput: {
        width: "100%",
        height: "60%",
        borderRadius: 10,
        borderColor: "#595959",
        borderWidth: 2,
        textAlign: "center",
        fontSize: 20,
        backgroundColor: "#e6e6e6"
    },
    jdInput: {
        flex: 1,
        borderColor: "#595959",
        borderRadius: 10,
        borderWidth: 2,
        textAlignVertical: "top",
        padding: 5,
    }
})

const textStyles = StyleSheet.create({
    firstText: {
        fontWeight: "700",
        fontSize: 20,
        color: "#0C0C0C"
    }, 
    secondText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#0C0C0C",
    },
    thirdText: {
        fontSize: 18,
        fontWeight: "600",
    },
})