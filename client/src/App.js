import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [deleteItem, setDeleteItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");
  const [updateItemData, setUpdateItemData] = useState("");
  
  const fetchData = {
    POST: {
      method: 'post',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name: data})
    },
    DELETE: {
      method: 'delete',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name: deleteItem})
    },
    UPDATE: {
      method: 'delete',
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({name: updateItem, data: updateItemData})
    },

  }

  const URL = "http://localhost:3001/api/practice"

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(URL, fetchData.POST)
    .then((response) => response.json())
    .then((newData) => setItems([...items, newData.name]))
    setData("");
  }

  const deleteItemFunction = (deleteItem) => {
    var array = [...items]
    array = array.filter(item => item === deleteItem);
    setItems(array);
  }

  const updateItemFunction = (updateItem) => {
    let array = [...items];
    array = array.map((item) => {
      if (item === updateItem.name) {
        return updateItemData
      }
      return item
    })
    setItems(array);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateItem("");
    setUpdateItemData("");
    fetch(URL, fetchData.UPDATE)
    .then((response) => response.json())
    .then((newUpdate) => updateItemFunction(newUpdate))
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteItem("");
    fetch(URL, fetchData.DELETE)
    .then((response) => response.json())
    .then((newDelete) => deleteItemFunction(newDelete))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
        <input type="text" autocomplete="off" name="name" value={data} onChange={e => setData(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <form onSubmit={handleDelete}>
      <label>
          Name to Delete:
        <input type="text" autocomplete="off" name="name" value={deleteItem} onChange={e => setDeleteItem(e.target.value)} />
        </label>
        <input type="submit" value="Delete" />
      </form>

      <form className="update-form" onSubmit={handleUpdate}>
        <label>
          Name to Update:
        <input type="text" autocomplete="off" name="name" value={updateItem} onChange={e => setUpdateItem(e.target.value)} />
        </label>
        <label>
          Data to Update To:
        <input type="text" autocomplete="off" name="name" value={updateItemData} onChange={e => setUpdateItemData(e.target.value)} />
        </label>
        <input type="submit" value="Update" />
      </form>
      <p>{!data ? "Items:" : data}</p>
      {items.map((item) => (
        <div className="item-container" key={items.indexOf(item)}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
