import React, { useState } from "react"
import List from '../List'

const lists = [
    {
        title: "Todo",
        items: [
            "item1",
            "item2",
            "item3"
        ],
    },
    {
        title: "Doing",
        items: [
            "item1",
            "item2",
            "item3"
        ],
    },
    {
        title: "Done",
        items: [
            "item1",
            "item2",
            "item3"
        ],
    }
]

function Board(props) {
    const [sLists, setSLists] = useState(lists)
    const addToList = function(listName, newItem){
        setSLists(
            sLists.map(function(list){
                if (list.title === listName) {
                    // v1
                    list.items.push(newItem)
                    // v2
                    // list = {
                    //     ...list, 
                    //     items: [
                    //         ...list.items,
                    //         newItem
                    //     ]
                    // }
                }
                return list
            })
        )
    }
    return (
    <>
        <div className="header">
            <h1>{props.title}</h1>
        </div>
        <div className="body">
            {
                lists.map(item => <List addToList={addToList} key={item.title} title={item.title} items={item.items}/>)
            }
        </div>
    </>
    );
}

export default Board;
