import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [selectedid, setSelectedID] = useState(null);
  const [isMultiSelectionEnabled, setIsMultiSelectionEnabled] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currentId) {
    setSelectedID(currentId === selectedid ? null : currentId);
  }

  function handleMultiSelection(currentId) {
    let currentSelectedIds = [...multiple];
    const findIndexOfCurrentId = currentSelectedIds.indexOf(currentId);

    if (findIndexOfCurrentId === -1) currentSelectedIds.push(currentId);
    else currentSelectedIds.splice(findIndexOfCurrentId, 1);

    setMultiple(currentSelectedIds);
  }

  //console.log(selected, multiple);
  return (
    <div className="acc-wrapper">
      <h1>Accordian Demo</h1>
      <button
        onClick={() => setIsMultiSelectionEnabled(!isMultiSelectionEnabled)}
        style={
          !isMultiSelectionEnabled
            ? { backgroundColor: "#ed7239" }
            : { backgroundColor: "lightblue" }
        }
      >
        {!isMultiSelectionEnabled
          ? "Click To Enable Multiple Section Sections"
          : "Click To Enable Single Section Selection"}
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                onClick={
                  isMultiSelectionEnabled
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h6>{dataItem.question}</h6>
                <span>+</span>
              </div>
              {isMultiSelectionEnabled
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )
                : selectedid === dataItem.id && (
                    <div className="acc-content ">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found !</div>
        )}
      </div>
    </div>
  );
}
