import { StyleSheet } from 'react-native';
import { useRef, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import StartScreen from './Screens/StartScreen';
import PauseScreen from './Screens/PauseScreen';
import JsonState from './context/JsonData/JsonDataText';
import JsonContext from './context/JsonData/JsonDataContext';

const Stack = createNativeStackNavigator()

export default function App() {

  // const navigation = useNavigation();

  // const [jsonData, setJSONData] = useState("")

  // const context = useContext(JsonContext)

  // console.log("Context state is: ", context.state)

  let jsonRef = useRef("")

  let currentDialerIndex = useRef(0);
  let isPaused = useRef(false)

  let jsonPriorityArray = []
  let firstIndex;
  let lastIndex;
  let dialerIndex;
  let currentTimeout;

  // const [currPerson, setCurrentPerson] = useState({"Number": null, "Priority": null})
  let currPerson = useRef({})

  //Textinput reference
  let textRef = useRef(null)

  //Test function 
  const testFuntion = ()=>{
    console.log("This is a testFunction")
  }

  const display = ()=>{

    // console.log("Context value inside the app is: ", context)

    let input_json_data = "['jsonRef']"

    if(input_json_data==="" || input_json_data===undefined || input_json_data===null){
      console.log("Returning in display because it is showing null")
      return
    }

    let jsonDD = JSON.parse(input_json_data)
    if(!Array.isArray(jsonDD)){
      return
    }

    jsonDD.map((element, index)=>{
      if(element['status']==='dial'){
        addToPriorityArray(element)
      }
    })

    context.upSorArr(jsonPriorityArray)

    console.log("The sorted array is: ", context.sortedState)
  }

  //Add to priority array (sorting the json data and storing it in jsonPriorityArray)
  const addToPriorityArray = (element)=>{
    console.log("Adding the values to the priority array")
    if(jsonPriorityArray.length===0){
      firstIndex=0
      lastIndex=0
      jsonPriorityArray.push(element)
      return
    }

    if (element["Priority"] <= jsonPriorityArray[firstIndex]["Priority"]){
      jsonPriorityArray.unshift(element)
      lastIndex++;
      return
    }

    if(element["Priority"] >= jsonPriorityArray[lastIndex]["Priority"]){

      jsonPriorityArray.push(element)
      lastIndex++;
      return
    }

    let chkIndex = lastIndex;
    while(chkIndex>0){
      if(element["Priority"]<jsonPriorityArray[chkIndex]["Priority"]){
        break;
      }

      let tempObj = jsonPriorityArray[chkIndex]
      jsonPriorityArray[chkIndex] = element
      jsonPriorityArray[chkIndex+1] = tempObj 

      chkIndex--;
    }
    lastIndex++;
  }


  //Dialer function (Starts the dialer)
  const startDialer = (exIndex)=>{
    console.log("We are starting the dialer")
    if(exIndex==0){
      dialerIndex=0;
    }
    if(exIndex>=jsonPriorityArray.length){
      console.log("Returning from the startDialer because the length is matched")
      return
    }

    // if(isPaused){
    //   console.log("The paused function is called, so we are here")
    //   return
    // }

    currentDialerIndex = exIndex

    let value = jsonPriorityArray[exIndex]
    currPerson.current = value

    console.log("...........")
    console.log("...........")
    console.log("...........")
    console.log("Calling the number: ", value["Number"])
    console.log("Priority: ", value['Priority'])
    console.log("...........")
    console.log("...........")
    console.log("...........")

    

    dialerIndex++;
    //Call to another person after n seconds
    currentTimeout = setTimeout(()=>{startDialer(dialerIndex)}, 8000)
  }

  //Pause the call
  const pauseDialer = ()=>{
    console.log("Pause method is called....")
    clearTimeout(currentTimeout)
  }

  //Resume the call
  const resumeDialer = ()=>{
    console.log("Resume method is called....")
    if(!currentTimeout){
      return
    }
    startDialer(currentDialerIndex);
  }

  //Display text
  const displayText = ()=>{
    // console.log("Display the json data ", jsonData)
  }

  const setJsonD = (value)=>{
    console.log("Value is : ", value)
    console.log(".........Setting the json data.........")
    // setJSONData(value)
    jsonRef.current = value
  }

  return (
    <JsonState>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='startPage'>
        <Stack.Screen name='startPage' component={StartScreen} initialParams={{setJsonD, startDialer, display, testFuntion, textRef, displayText}}/>
        <Stack.Screen name='pausePage' component={PauseScreen} initialParams={{jsonRef,isPaused, resumeDialer, pauseDialer, currPerson}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </JsonState>
    // <View style={styles.mainView}>
    //   <UpperComponent setJSONData={setJSONData}/>
    //   <LowerComponent startDialer={startDialer} display={display}/>
    // </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: "#F4E3FF",
    // backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  }
});
