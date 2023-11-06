import { useState, useEffect, useRef } from 'react';
import './App.css';
import Xarrow from "react-xarrows";

function App() {

  const [target, setTarget] = useState([["Customer", "Customer-id", "Customer-Name", "Customer-Address"], ["item"]])
  const [sourceRadio, setSourceRadio] = useState('');
  const [targetRadio, setTargetRadio] = useState('');
  const [drawRow, setDrawRow] = useState(false);
  const [ConnectionArray, setConnectionArray] = useState([]);
  const [removeItemId, setRemoveItemId] = useState('')

  let Customer1 = ["Customer1", "Customer1-id", "Customer1-Name", "Customer1-Address"];
  let Customer2 = ["Customer2", "Customer2-id", "Customer2-Name", "Customer2-Address"];
  let Customer3 = ["Customer3", "Customer3-id", "Customer3-Name", "Customer3-Address"];
  let Customer4 = ["Customer4", "Customer4-id", "Customer4-Name", "Customer4-Address"];

  const addItem = (e) => {
    let val = e.target.value;
    let convertArray = val.split(',');
    let getArrayFirstElement = target.map((val) => {
      return val[0]
    })

    let isAlreadyExists = getArrayFirstElement.includes(convertArray[0])
    if (isAlreadyExists) {
      alert("data is already available")
      return
    }
    else {
      setTarget([...target, convertArray]);
    }
  }


  const removeItem = (e) => {

    // item id to be deleted

    let targetVal = parseInt(e.target.value)
    let removwConnection = () => {
      //  if connection then remove connection
      let index2 = []
      let DummyData = ConnectionArray.map((val) => {
        let key = Object.keys(val);
        let str = val[key];
        return str
      })
      let isExistConnection1 = DummyData.includes(targetVal.toString());

      for (let i = 0; i < DummyData.length; i++) {
        if (DummyData[i] === targetVal.toString()) {
          index2 = [...index2, i]
        }
      }

      if (isExistConnection1) {
        let dummyArray = ConnectionArray
        for (let i = 0; i < index2.length; i++) {
          dummyArray.splice(index2[i], 1);
        }


        // for update connection in dummy array

        let updateConnection = dummyArray.map((val) => {
          let key = Object.keys(val);
          // let str = val[key];

          if (Number(val[key]) >= Number(e.target.value)) {
            let data = Number(val[key]) - 1;
            return { [key]: data.toString() }
          }
          else {
            return val
          }
        })
        console.log(updateConnection, 'updateConnection');
        setConnectionArray([...updateConnection])
      }
      else {
        let dummyArray = ConnectionArray

        // for update connection in dummy array
        let updateConnection = dummyArray.map((val) => {
          let key = Object.keys(val);
          // let str = val[key];

          if (Number(val[key]) >= Number(e.target.value)) {
            let data = Number(val[key]) - 1;
            return { [key]: data.toString() }
          }
          else {
            return val
          }
        })

        setConnectionArray([...updateConnection])
      }
    }
    removwConnection()



    // remove data
    let filtereDdata = target.filter((val, index) => {
      if (index !== targetVal)
        return val;
    })

    setTarget(filtereDdata)
  }
  // -----------
  const isConnectionExist = () => {
    // for duplicate sourcedata
    let index1 = []
    let targetData = ConnectionArray.map((val) => {
      let str = Object.keys(val);
      let data = str.join('');
      return data
    })

    let isExistConnection = targetData.includes(sourceRadio);

    for (let i = 0; i < targetData.length; i++) {
      if (targetData[i] === sourceRadio) {
        index1 = [...index1, i]
      }
    }

    if (isExistConnection) {
      let dummyArray = ConnectionArray
      for (let i = 0; i < index1.length; i++) {
        dummyArray.splice(index1[i], 1);
      }
      setConnectionArray(dummyArray)
    }
    //for target data duplicate
    let index2 = []
    let DummyData = ConnectionArray.map((val) => {
      let key = Object.keys(val);
      let str = val[key];
      // let data = str.join('');

      return str
    })

    let isExistConnection1 = DummyData.includes(targetRadio);

    for (let i = 0; i < DummyData.length; i++) {
      if (DummyData[i] === targetRadio) {

        index2 = [...index2, i]
      }
    }

    if (isExistConnection1) {
      let dummyArray = ConnectionArray
      for (let i = 0; i < index2.length; i++) {
        dummyArray.splice(index2[i], 1);
      }


      setConnectionArray([...ConnectionArray, ...dummyArray])
    }

  }
  // -----------------------
  const connectData = () => {
    isConnectionExist()
    setConnectionArray([...ConnectionArray, { [sourceRadio]: targetRadio }])
    setDrawRow(true)
  }

// -------------singel Remove connection
  const removeConnection = (e, index) => {
    console.log(ConnectionArray, "ConnectionArray");
    let targetVal = e.target.value;
    let index2 = []
    let DummyData = ConnectionArray.map((val) => {
      let key = Object.keys(val);
      let str = val[key];
      return str
    })
    let isExistConnection1 = DummyData.includes(targetVal.toString());
    
    for (let i = 0; i < DummyData.length; i++) {
      if (DummyData[i] === targetVal) {
        index2 = [...index2, i]
      }
    }
    console.log(index2, "jk");
    if (isExistConnection1) {
      let dummyArray = ConnectionArray
      for (let i = 0; i < index2.length; i++) {
        dummyArray.splice(index2[i], 1);
      }
      console.log(dummyArray,'dummyArray' , ConnectionArray);
      setConnectionArray([...dummyArray])
    }
  }
  

  return (
    <>
      <div className='row' >
        {/* column1 */}
        <div className='column' >
          <div >
            <h3 className='heading'>Source</h3>
          </div>

          <ul style={{ listStyleType: 'none' }}>
            {/* Custoomer1 */}
            <div className='item'>
              <button onClick={(e) => { addItem(e) }} value={[...Customer1]}>+</button>
              <li>Customer1</li>
              <input className="radioButton" value={sourceRadio} type="radio" name='source' id="Customer1" onChange={(e) => { setSourceRadio(e.target.id) }}></input>
              <ul >
                <li className='childList'>Customer1-id</li>
                <li className='childList'>Customer1-Name</li>
                <li className='childList'>Customer1-Address</li>

              </ul>
            </div>
            {/* Customer 2 */}
            <div className='item'>
              <button onClick={(e) => { addItem(e) }} value={[...Customer2]}>+</button>
              <li>Customer 2</li>
              <input type="radio" className="radioButton" name='source' id="Customer2" onChange={(e) => { setSourceRadio(e.target.id) }}></input>
              <ul >
                <li className='childList'>Customer2-id</li>
                <li className='childList'>Customer2-Name</li>
                <li className='childList'>Customer2-Address</li>
              </ul>
            </div>
            {/* Customer 3 */}
            <div className='item'>
              <button onClick={(e) => { addItem(e) }} value={[...Customer3]}>+</button>
              <li>Customer 3</li>
              <input type="radio" className="radioButton" name='source' id="Customer3" onChange={(e) => { setSourceRadio(e.target.id) }}></input>
              <ul >
                <li className='childList'>Customer3-id</li>
                <li className='childList'>Customer3-Name</li>
                <li className='childList'>Customer3-Address</li>
              </ul>
            </div>
            {/* Customer 4 */}
            <div className='item'>
              <button onClick={(e) => { addItem(e) }} value={"Customer4"}>+</button>
              <li>Customer 4</li>
              <input type="radio" className="radioButton" name='source' id="Customer4" onChange={(e) => { setSourceRadio(e.target.id) }}></input>
            </div>
          </ul>

        </div>
        {/* column2 */}
        <div className='column' >
          <h1></h1>
        </div>
        {/* column3 */}
        <div className='column' >
          <div >
            <h3 className='heading'>Target</h3>
            <ul style={{ listStyleType: 'none' }}>
              {target && target.map((val, index) => {
                return <div className='item'>
                  <input type="radio" name='target' id={index} onChange={(e) => { setTargetRadio(e.target.id) }}></input>
                  <button value={index} className='remove' onClick={(e) => { removeItem(e) }}>-</button>
                  <li>{val[0]}</li>
                  <ul >
                    <li className='childList' style={{ marginLeft: "20px" }}>{val[1]}</li>
                    <li className='childList' style={{ marginLeft: "20px" }}>{val[2]}</li>
                    <li className='childList' style={{ marginLeft: "20px" }}>{val[3]}</li>
                    <li style={{ marginLeft: "20px" }}><button id="removeConnection" value={index} onClick={(e) => { removeConnection(e, index) }}>!</button></li>
                  </ul>
                  {/* <button id="removeConnection" value={val} onClick={(e)=>{removeConnection(e ,index)}}>Remove Connection</button> */}
                </div>
              })}
            </ul>
          </div>

        </div>
      </div>
      {drawRow && (
        <>

          {ConnectionArray.map((val) => {
            let key = Object.keys(val)

            return <Xarrow
              start={key[0]} //can be react ref
              end={val[key]} //or an id
            />
          })

          }

        </>
      )}

      <div>

        <button className='blueButton' onClick={() => { connectData() }}>Connect</button>

      </div>

    </>
  );
}

export default App;
