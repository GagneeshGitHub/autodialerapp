import { useEffect, useRef, useState } from "react";
import JsonContext from "./JsonDataContext";

const JsonState = (props)=>{

    let currentDialerIndex= useRef(null);
    let dialerIndex = useRef(0);
    let currentTimeout= useRef(0);
    const [state, setState] = useState("")

    //Call gap seconds
    const [callGap, setCallGapVal] = useState(8)

    // Sample count:
    const [revCount, setReverseCount] = useState(callGap);
    let revCountNS = useRef(8);
    
    //Sorted state (with no skip status)
    const [sortedState, setSortedState] = useState([])


    //Reverse counting timestamp
    let revCounting = useRef(null)

    const update = (value)=>{
        setState(value)
    }

    const upSorArr = (value)=>{
        setSortedState(value)
    }


    const setCallGap = (value)=>{
      setCallGapVal(value)
      setReverseCount(value)
      revCountNS.current = value
    }

    //Dialer function and it's variables

    const [number, setNumber] = useState("")
    const [priority, setPriority] = useState(0)

    const startDialer = (exIndex)=>{
        if(exIndex==0){
          dialerIndex.current=0;
        }
        if(sortedState===[]){
            return
        }
    
        let value = sortedState[exIndex]

        currentDialerIndex.current = dialerIndex.current;

        if(value===undefined){
            return
        }
    
        setPriority(value['Priority'])
        setNumber(value['Number'])
        
        dialerIndex.current = dialerIndex.current + 1;
        if(dialerIndex.current>=sortedState.length){
            return
        }


        //Call to another person after n seconds
        currentTimeout.current = setTimeout(()=>{
            reverseCountingFunction()
        }, 8000)
      }

      const reverseCountingFunction = ()=>{
        setReverseCount(revCountNS.current)
        
        if(revCountNS.current===-1){
          startDialer(dialerIndex.current)
          revCountNS.current = callGap
          setReverseCount(callGap)
          return
        }

        revCountNS.current = revCountNS.current -1;
        revCounting.current = setTimeout(()=>{
          reverseCountingFunction()
        },1000)
      }

      const pauseDialer = ()=>{
        setNumber("")
        dialerIndex.current = currentDialerIndex.current
        clearTimeout(currentTimeout.current);
        clearTimeout(revCounting.current);
      }

      const resumeDialer = ()=>{
        dialerIndex.current = currentDialerIndex.current
        revCountNS.current = callGap
        setReverseCount(callGap)
        startDialer(currentDialerIndex.current)
      }

      const stopDialer = ()=>{
        dialerIndex.current=0
        currentDialerIndex.current=0
        clearTimeout(currentTimeout.current)
      }




    return(
        <JsonContext.Provider value={{state,update, sortedState, upSorArr, startDialer, number, priority, callGap, setCallGap, pauseDialer, resumeDialer, stopDialer, revCount}}>
            {props.children}
        </JsonContext.Provider>
    )
}


export default JsonState;