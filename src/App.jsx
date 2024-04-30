import { useEffect, useState } from 'react';
import Alert from './Alert';
import './App.css';
import List from './List';

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  // get value
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // if user submit empty form
      showAlert(true, 'red', 'enter value');
    } else if (name && isEditing) {
      // get edited value
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'green', 'value edited');
    } else {
      // just get the input value
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
      showAlert(true, 'green', 'value added');
    }
  };

  // alert function
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  // clear all values
  const clearValues = () => {
    setList([]);
    showAlert(true, 'red', 'all values cleared');
  };

  // remove selected value
  const removeValue = (id) => {
    const checkItem = list.filter((item) => item.id !== id);
    setList(checkItem);
    showAlert(true, 'red', 'item removed ');
  };

  // edit values
  const editValue = (id) => {
    const editItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(editItem.title);
  };

  // set local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  // returns elements
  return (
    <main className='main'>
      <div className='header-wrapper'>
        <h1>TO-DO LIST</h1>
      </div>
      <div className='container'>
        <div className='alert-wrapper'>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
        </div>
        <div className='container-center'>
          <form className='input-wrapper' onSubmit={handleSubmit}>
            <input
              type='text'
              className='input'
              placeholder='Add a task'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='submit-btn'>
              Add
            </button>
          </form>
          <section className='main-container'>
            {list.length > 0 && (
              <>
                <section className='lists'>
                  <List
                    items={list}
                    removeItem={removeValue}
                    editItem={editValue}
                  />
                </section>
                <div className='clear-btn-wrapper'>
                  <button
                    type='button'
                    className='clear-btn'
                    onClick={() => clearValues()}
                  >
                    Clear Items
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

// get local storage
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

export default App;
