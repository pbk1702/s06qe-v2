import { useState } from "react";
import api_fetch from '@/api_fetch.js'
import Button from '@/component/Button.jsx'

const Contacts = () => {

  const [input, setInput] = useState({})

  const handleInput = (e) => {
    const { name, value } = e.target;
    const n = Object.assign({}, input)
    if(value) 
      n[name] = value
    else
      delete n[name]
    setInput( n );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { name, email, phone, message } = input;

    if(! name || ! email || ! phone || ! message ) {
      alert("Все поля формы должны быть заполнены")
      return
    }

    const resp = await api_fetch("/feedback", "POST", { name, email, phone, message } )
    if(! resp.error) {
      alert( resp?.message || "Сообщение успешно отправлено")      
      setInput({});
    } else {
      alert( resp.error)
    }
  }

  return (<>
    <h1>Контакты</h1>
    <div>
      <p>Адрес: г. Москва, ул. Молодежная, 11, к. 15</p>
      <p>Телефон: (912) 00-55-000</p>
      <p>email: mastervann@mail.ru</p>
    </div>

    <form onSubmit={ handleSubmit } className="flex flex-col space-y-2 max-w-[40ch]">
      <h2>Форма обратной связи</h2>
      <input type="text" name="name" placeholder="Ваше имя" onInput={handleInput} value={input?.name ?? ""} />      
      <input type="email" name="email" placeholder="Эл. почта"  onInput={handleInput} value={input?.email ?? ""}/>
      <input type="phone" name="phone" placeholder="Телефон"  onInput={handleInput} value={input?.phone ?? ""}/>
      <textarea name="message" placeholder="Сообщение"  onInput={handleInput} value={input?.message ?? ""}/>
      <Button>Отправить</Button>
    </form>

    <section className="">
      <h2>Мы на карте</h2>
      <img src="map.jpg" />
    </section>
  </>)
}

export default Contacts;
