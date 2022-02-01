import React from 'react';

import './app.css';

const App: React.FC = () => {
  return (
    <div className='container'>
        <form>
            <input name='item' type='text' placeholder='Add an item...' autoComplete='off' className='newItem' />
            <button className='newItemButton'>Add</button>
        </form>
        <button className='clearButton'>Clear All</button>
        <button className='clearButton'>Clear Completed</button>
    </div>
  );
};

export default App;