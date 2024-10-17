import logo from './logo.svg';
import './App.css';
import { useState, useLayoutEffect} from 'react';

const requestLogin = async (id, pw) => {
  return fetch('http://192.168.1.146:8888/signin', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: id, password: pw }), 
    method: 'POST',
    credentials: 'include'
  })
}

function App() {
  const [form, setForm] = useState({ id: '', pw: '' })
  const edit = (field, value) => setForm(prev => ({ ...prev, [field]: value }))
  const onSubmit = async () => {
    requestLogin(form.id, form.pw).then(res => {
      if (res) {
        alert('sending event')
        window.ReactNativeWebView.postMessage(JSON.stringify({event: 'login', value: document.cookie}))
      }
      else {
        // Todo: Clear credentials ;;
        window.ReactNativeWebView.postMessage(JSON.stringify({event: 'logout'}))
      }
    })
  }
  return (
    <div className="App">
      <p>id</p>
      <input onChange={({ target: { value } }) => edit('id', value)}></input>
      <p>pw</p>
      <input onChange={({ target: { value } }) => edit('pw', value)}></input>
      <button onClick={onSubmit}> login </button>
      <p>
        쿠키값:
      {
        document.cookie
      }
      </p>

    </div>
  );
}

export default App;
