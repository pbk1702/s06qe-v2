import { NavLink, Outlet } from "react-router"

const Header = () => {
  return (<>
    <header className="flex flex-col items-center py-4 px-4 mx-auto container max-w-5xl">
      <NavLink to="/" className="w-[8ch] block hover:opacity-80">
        <img src="/logo.png" />
      </NavLink>
      <div className="my-2">Ремонт ванных комнат: качество, которому можно доверять!</div>
      <nav className="space-x-2 flex flex-row flex-wrap">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/about">О нас</NavLink>
        <NavLink to="/services">Услуги</NavLink>
        <NavLink to="/calc">Калькулятор</NavLink>
        <NavLink to="/contacts">Контакты</NavLink>
        <NavLink to="/gallery">Галерея</NavLink>
        <NavLink to="/blog">Блог</NavLink>
      </nav>
    </header>
  </>)
}

const Layout = () => {
  return (
  <>
    <Header />
    <main className="container mx-auto px-4 pb-4 max-w-5xl">
      <Outlet />
    </main>    
  </>
  )
}

export default Layout;