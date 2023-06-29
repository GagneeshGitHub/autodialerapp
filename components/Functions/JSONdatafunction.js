let jsonPriorityArray = []

export const chkAndArrangeJSON = (jsonData)=>{
    let input_json_data = jsonData

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

    return jsonPriorityArray;
}

//Add to priority array (sorting the json data and storing it in jsonPriorityArray)
const addToPriorityArray = (element)=>{
    if(jsonPriorityArray.length===0){
      firstIndex=0
      lastIndex=0
      jsonPriorityArray.push(element)
      return
    }

    if(element===undefined || element===null){
        console.log("Passed element is null. (addToPriorityArray) [JSONdatafunction]")
        return
    }

    if(element["Priority"]===undefined){
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