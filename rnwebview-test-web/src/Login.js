import { useState,  useEffect } from 'react';
import { MessageEvent, MessageManager, useMessageManager } from './MessageManager';
import { platformResolver } from './PlatformResolver';

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

const checkValidity = async (id, pw) => {
  return fetch('http://192.168.1.146:8888/welcome', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
    credentials: 'include'
  })
}

export default function Login() {
  const [form, setForm] = useState({ id: '', pw: '' })
  const edit = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const messageManager = useMessageManager();

  const onSubmit = async () => {
    requestLogin(form.id, form.pw).then(res => {
      messageManager.sendMessage(MessageEvent.Log, res.ok)
      if (res) {
        messageManager.sendMessage(MessageEvent.Login, document.cookie)
      }
      else {
        // Todo: Clear credentials ;;
        messageManager.sendMessage(MessageEvent.Logout)
      }
    }).catch(err => messageManager.sendMessage(MessageEvent.Log, ))
  }
  const [username, setUsername] = useState();
  const { os, isWebView } = platformResolver(navigator.userAgent.toLowerCase());

  useEffect(() => {
    checkValidity().then(async res => {
      if (!isWebView) return;
      messageManager.sendMessage(MessageEvent.Log, res.status)
      if (res.ok){
        messageManager.sendMessage(MessageEvent.Navigation, {path: 'list'})
      } else setUsername('')

    })
  }, [checkValidity])

 

  return (
    <div className="App">
      <p>id</p>
      <input onChange={({ target: { value } }) => edit('id', value)}></input>
      <p>pw</p>
      <input onChange={({ target: { value } }) => edit('pw', value)}></input>
      <p onClick={() => messageManager.sendMessage(MessageEvent.Navigation, {route: 'find', pararms: {param1: 'param1'}})}>Lost Password?</p>
      <button onClick={onSubmit}> login </button>
      <p>
        쿠키값:
        {
          document.cookie
        }
      </p>
      <p>
        {
          username
        }
      </p>

    </div>
  );
}