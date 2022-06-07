import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import InputContainer from '../components/InputContainer'
import List from "../components/List";
import store from "../utils/store";
import StoreApi from "../utils/storeApi";

import "./styles.scss";

const dataStorage = JSON.parse(window.localStorage.getItem("dataToDo"));

const initialState = () => {
  if (dataStorage) {
    return dataStorage;
  } else {
    window.localStorage.setItem("dataToDo", JSON.stringify(store));
    return store;
  }
};
console.log("PINK")
export default function Home() {
  const [data, setData] = useState(initialState);

  const addMoreCard = (title, listId) => {
    if (!title) {
      return;
    }

    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard];

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    console.log("PINKY")
    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };
  const removeCard = (index, listId) => {
    const list = data.lists[listId];

    list.cards.splice(index, 1);

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };

  const updateCardTitle = (title, index, listId) => {
    const list = data.lists[listId];
    list.cards[index].title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };
  const addMoreList = (title) => {
    if (!title) {
      return;
    }

    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
    };
    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      },
    };

    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };

  const deleteList = (listId) => {
    const lists = data.lists;
    const listIds = data.listIds;

    delete lists[listId];

    listIds.splice(listIds.indexOf(listId), 1);

    const newState = {
      lists: lists,
      listIds: listIds,
    };

    setData(newState);
    window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  };

  // const onDragEnd = (result) => {
  //   const { destination, source, draggableId, type } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   if (type === "list") {
  //     const newListIds = data.listIds;

  //     newListIds.splice(source.index, 1);
  //     newListIds.splice(destination.index, 0, draggableId);

  //     const newState = {
  //       ...data,
  //       listIds: newListIds,
  //     };
  //     setData(newState);
  //     window.localStorage.setItem("dataToDo", JSON.stringify(newState));

  //     return;
  //   }

  //   const sourceList = data.lists[source.droppableId];
  //   const destinationList = data.lists[destination.droppableId];
  //   const draggingCard = sourceList.cards.filter(
  //     (card) => card.id === draggableId
  //   )[0];

  //   if (source.droppableId === destination.droppableId) {
  //     sourceList.cards.splice(source.index, 1);
  //     destinationList.cards.splice(destination.index, 0, draggingCard);

  //     const newState = {
  //       ...data,
  //       lists: {
  //         ...data.lists,
  //         [sourceList.id]: destinationList,
  //       },
  //     };
  //     setData(newState);
  //     window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  //   } else {
  //     sourceList.cards.splice(source.index, 1);
  //     destinationList.cards.splice(destination.index, 0, draggingCard);

  //     const newState = {
  //       ...data,
  //       lists: {
  //         ...data.lists,
  //         [sourceList.id]: sourceList,
  //         [destinationList.id]: destinationList,
  //       },
  //     };

  //     setData(newState);
  //     window.localStorage.setItem("dataToDo", JSON.stringify(newState));
  //   }
  // };
  return (
    <StoreApi.Provider
      value={{
        addMoreCard,
        addMoreList,
        updateListTitle,
        removeCard,
        updateCardTitle,
        deleteList
      }}
    >
            <div
              className="wrapper"
            >
              {data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} index={index} />;
              })}
              <div>
                <InputContainer type="list" />
              </div>
            </div>
    </StoreApi.Provider>
  );
}
