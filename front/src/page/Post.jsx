import { useEffect, useState } from "react";
import { useParams } from "react-router"
import api_fetch from '@/api_fetch.js'
import Button from "@/component/Button";

const SubscribeForm = ({ className, post }) => {  
  const [ email, setEmail ] = useState();
  const handleSubmit = async ( e ) => {
    e.preventDefault();
    if(! email) {
      alert("Необходимо указать адрес эл. почты")
      return
    }                
    const data = {       
      post_id: post._id,
      action: "subscribe",
      email,
    }
    const resp = await api_fetch("/posts", "POST", data)
    if( resp.ok && resp.message ) { 
      setEmail( );
      alert( resp.message )
    }
  }
  return (<>
  <div className={className}>
  <h3>Подписаться на обновления</h3>
  <form onSubmit={ handleSubmit } className="flex flex-row flex-nowrap space-x-2">    
    <input type="email" name="email" value={ email ?? "" } placeholder="Адрес эл. почты" onInput={ ( e ) => { setEmail( e.target.value ) } }/>    
    <Button>Подписаться</Button>    
  </form>
  </div>
  </>)
}

const CommentForm = ({ className, post }) => {
  const [ input, setInput ] = useState({})
  
  const handleSubmit = async ( e ) => {
    e.preventDefault();
    if( ! input?.name || ! input?.body ) {
      return alert("Имя автора и текст комментария должны быть указаны")
    }
    const data = {       
      post_id: post._id,
      action: "comment",
      name: input.name,
      body: input.body,
    }
    const resp = await api_fetch("/posts", "POST", data)
    if( resp.ok ) {      
      setInput({ })      
      alert("Комментарий успешно добавлен. Обновите страницу")
      return;
    }
    console.log( resp )

  }

  const handleInput = ( e ) => {
    const { name, value } = e.target;
    const n = Object.assign( {}, input );
    if( value ) 
      n[name] = value
    else 
      delete n[name]
    setInput( n )   
    console.log('n', n)   
  }

  return (<>
  <div className={className}>  
  <form onSubmit={ handleSubmit } className="flex flex-col space-y-2">
    <h3>Оставить комментарий</h3>
    <input type="text" name="name" value={ input?.name ?? "" } placeholder="Ваше имя" onInput = { handleInput }/>    
    <br />
    <textarea type="text" name="body" value={ input?.body ?? "" } placeholder="Текст комментария " onInput = { handleInput }/>
    <br />
    <Button>Отправить</Button>
  </form>
  </div>
  </>)
}

const Post = () => {
  const post_id = useParams()?.id;
  const [ reload, setReload ] = useState( true );
  const [status, setStatus] = useState({});
  const [post, setPost] = useState( undefined );

  useEffect( () => {
    const fetchPost = async () => {
      setStatus({ loading: true });
      const resp = await api_fetch("/posts/".concat(post_id))
      if(resp.ok) {
        if( resp.posts.length > 0 ) 
          setPost( resp.posts[0] )
      }
      setReload( false );
      setStatus({ loading: false });      
    }
    if( reload ) fetchPost();
  }, [post_id, reload] )

  return (<>
    { status?.loading && <div>Загрузка...</div>}
    { post && <>
      <h2>{ post?.title ?? "" }</h2>     
      <div>{ post?.body ?? "" }</div>
      <section>
        <h3>Комментарии</h3>
        { post.comments.length < 1 && <div>Комментариев никто пока не оставил</div>}
        { post.comments.map( (v, ix) => { return (
          <div key={v._id}>            
            <div><span>{ "#".concat( ix + 1 )}</span> <span className="font-semibold">{ v.name }</span>: { v.body }</div>
          </div>
        )
        } )}
        <SubscribeForm  className="md:max-w-[48ch]" post={post} />
        <CommentForm className="md:max-w-[48ch]" post={post} />
        
      </section>
    </> }
  </>)
}

export default Post