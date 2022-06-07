import React from "react";
import Title from "../Title";
import Card from "../Card";
import InputContainer from "../InputContainer";

import "./styles.scss";

export default function List({ list, index }) {
  return (
  
        <div >
          <div className="list-cards">
            <div className="title-list">
              <Title className="title-list" title={list.title} listId={list.id} />
            </div>
            <div className="container-cards">
 
       
                  <div
                   
                    className="card-container"
                  >
                    {list.cards.map((card, index) => (
                      <Card
                        key={card.id}
                        card={card}
                        index={index}
                        listId={list.id}
                      />
                    ))}
         
                  </div>
            </div>
            <InputContainer listId={list.id} type="card" />
          </div>
        </div>
      )}
