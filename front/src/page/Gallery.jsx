import { useState } from "react";

const Gallery = () => {

  const [filter, setFilter] = useState( 0 );

  const images = [
    { type: 1, img: "basic-1.jpg" },
    { type: 1, img: "basic-2.jpg" },
    { type: 2, img: "premium-1.jpg" },
    { type: 2, img: "premium-2.png" },
  ]
  
  const handleChange = ( e ) => {
    const value = e.target.value;
    console.log(value);
    setFilter( value );
  }

  return (    
    <div>
      <span>Фильтр по варианту отделки: </span>
      <select onInput={ handleChange }>
        <option value="0">Все</option>
        <option value="1">Обычный</option>
        <option value="2">Премиальный</option>
      </select>
      <div className="flex flex-row flex-wrap justify-center -mx-3">
        { ( ( filter == 0 ) ? images : images.filter(v => v.type == filter) ).map(v => {      
          return (
          <img className="w-full md:w-1/2 p-3 object-cover" key={v.img} src={ "/".concat( v.img ) } alt={ v.img }/>
        )
        })}
      </div>
    </div>
        
  )
}

export default Gallery;