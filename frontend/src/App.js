import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import AccountInput from "./components/AccountInput"

function Header() {
  return <header>
    <h1><a href="/">QMOV</a></h1>
  </header>
}

function Nav() {
  return <ol>
    <li><a href="/account">회원가입</a></li>
    <li><a href="/login">로그인</a></li>
    <li><a href="/about">about</a></li>
  </ol>
}

function App() {

  const baseUrl = "http://localhost:8080"

  const [id, setId] = useState("")
  const [pw, setPw] = useState("")

  useEffect(() => {
    // 컴포넌트 시작시
    // getAccounts();
  }, [])

  async function getAccounts() {
    await axios  // 응답 기다림
      .get(baseUrl + "/account/1") 
      .then((response) => {
        //console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function createAccount(e) {
    e.preventDefault();

    const makeSign =  async () => {
      await axios
        .post(baseUrl + "/account", {
          name: id,
          password: pw
        })
        .then((response) => {
          console.log(response.data)
          setId("");
          setPw("");
          getAccounts();
        })
        .catch((error) => {
          console.error(error);
        })
    }
    makeSign();
    alert('회원가입 성공')
  }

  function handleChange(e) {
    e.preventDefault();

    if(e.target.name === "name") {
      setId(e.target.value)
    } else if(e.target.name === "password") {
      setPw(e.target.value)
    }
  }

  return (
    <div className="App">
      <Header></Header>
      <Nav></Nav>
      <AccountInput handleSubmit={createAccount}
        id={id}
        pw={pw}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
