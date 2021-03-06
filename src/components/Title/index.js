import React, { useContext, useState } from "react";
import ClickOutHandler from "react-onclickout";

import storeApi from "../../utils/storeApi";

import "./styles.scss";

export default function Title({ title, listId }) {
  const [open, setOpen] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const { updateListTitle, deleteList } = useContext(storeApi);

  const handleOnBlur = () => {
    updateListTitle(newTitle, listId);
    setOpen(!open);
  };

  return (
    <>
      {open ? (
        <div>
          <input
            type="text"
            className="input-title"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
            onBlur={handleOnBlur}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleOnBlur();
              }
              return;
            }}
            autoFocus
          />
        </div>
      ) : (
        <div className="editable-title-container">
          <h2 onClick={() => setOpen(!open)} className="editable-title">
            {title}
          </h2>
          <button
            className="list-button"
            onClick={() => deleteList(listId)}
          >
            β
          </button>

{/* 

          {openOptions && (
            <ClickOutHandler
              onClickOut={(e) => {
                setOpenOptions(!openOptions);
              }}
            >
              <ul className="menu-card">
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    deleteList(listId);
                  }}
                >
                  βdel
                </li>
                <li
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpen(!open);
                  }}
                >
                  π
                </li>
              </ul>
            </ClickOutHandler>
          )} */}


        </div>
      )}
    </>
  );
}
