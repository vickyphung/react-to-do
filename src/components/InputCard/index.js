import React, { useContext, useState } from "react";
import storeApi from "../../utils/storeApi";
import "./styles.scss";

export default function InputCard({ setOpen, listId, type }) {
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState("");

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBtnConfirm = () => {
    if (type === "card") {
      addMoreCard(title, listId);
    } else {
      addMoreList(title);
    }
    setOpen(false);
    setTitle("");
  };

  return (
    <div className="input-card">
      <div className="input-card-container">
        <textarea
          onChange={handleOnChange}
          value={title}
          className="input-text"

          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleBtnConfirm();
            }
            return;
          }}

          placeholder={
            type === "card"
              ? ".."
              : "Title"
          }
          autoFocus
        />
      </div>
      <div className="confirm">
        <button className="button-confirm" onClick={handleBtnConfirm}>
          {type === "card" ? "🗸" : "🗸"}
        </button>
        <button
          className="button-cancel"
          onClick={() => {
            setTitle("");
            setOpen(false);
          }}>
✗       </button>
      </div>
    </div>
  );
}
