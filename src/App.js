import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserForm from './UserForm';
import UserTable from './UserTable';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Sanrove Employee Details Form</h1>
        <UserForm />
        <UserTable />
      </div>
    </Provider>
  );
}

export default App;
