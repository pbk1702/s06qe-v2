import { useState } from "react";
import Button from "@/component/Button.jsx"

const Calc = () => {
  const [input, setInput] = useState({})
  const [result, setResult] = useState()
  
  const handleInput = ( e ) => {
    const { name, value } = e.target;
    const n = Object.assign({}, input);
    if( value ) 
      n[name] = value 
    else
      delete n[name]
    setInput( n );    
  }

  const handleChecked = ( e ) => {
    const { name, checked } = e.target;    
    const n = Object.assign({}, input);
    if( checked ) 
      n[name] = checked
    else
      delete n[name]
    setInput( n );
  }

  const handleSubmit = ( e ) => {
    e.preventDefault();    
    console.log( input );
    let a = input?.area ?? 0;
    if(a < 10) {
      setResult("Ошибка! Площадь должна быть не менее 10 м^2")
      return;
    }
    a*=input.type ?? 100;
    if( input?.demontage ) a*=1.20;
    if( input?.urgency ) a*=1.50;
    setResult( (1 * a).toFixed(2) );
  }

  return (<>    
    <form onSubmit={ handleSubmit } className="flex flex-col max-w-[48ch] space-y-2">     
      <h1>Калькулятор</h1>
      <input name="area" type="number" min="10" placeholder="Площадь ванной" value={ input?.area ?? "" } onInput={ handleInput } />      
      <select name="type" value={ input?.type ?? 100 } onInput={handleInput}>
        <option value="100">Типовая (100)</option>
        <option value="200">Премиальная (200)</option>
      </select>

      <div>Демонтаж (+20%): <input type="checkbox" name="demontage" value={ input?.demontage || false } onChange={ handleChecked} /></div>
      <div>Срочность (+50%): <input type="checkbox" name="urgency" value={ input?.urgency || false } onChange={ handleChecked} /></div>
      <Button>Расчёт итоговой суммы</Button>
    </form>
    <div>Результаты расчёта</div>
    <div>{ result }</div>
  </>)
}

export default Calc;