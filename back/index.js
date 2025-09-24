import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import PostModel from './Model/Post.js'
import FeedbackModel from './Model/Feedback.js'

const PORT = 9000;
const DB = "mongodb://localhost:27017/s06qe-v2";

const app = express()
app.use( cors() )
app.use( express.json() )

app.get("/", async (req, res) => {
  res.send("hello");
})

app.post("/feedback", async (req, res) => {
  const { name, phone, email, message } = req.body;
  if(! name || ! phone || ! email || ! message ) 
    return res.status(400).json({ error: "Все поля формы должны быть заполнены" })
  try {
    const o = new FeedbackModel({
      name, phone, email, message
    })
    await o.save();
    return res.status(200).json({ message: "Сообщение успешно отправлено" })
  } catch ( e ) {
    return res.status(200).json({ error: e })
  }  
})

app.get("/posts{/:id}", async (req, res) => {
  const post_id = req.params?.id;
  if(! post_id) {
    try { 
      const query = PostModel.find({ }, '-subscribers -comments');      
      const found = await query.exec();
      return res.status(200).json({ ok: true, posts: found })
    } catch ( e ) {
      return res.status(400).json({ ok: false, error: "Ошибка получения постов из базы данных" })      
    }
  }
  try {
    const found = await PostModel.findById( post_id );
    return res.status(200).json({ ok: true, posts: found ? [ found ] : [] })
  } catch ( e ) {
    return res.status(400).json({ ok: false, error: "Ошибка получения поста из базы данных"})
  }  
})

/* subscribe (email), add_comment(name, body) */
app.post("/posts", async (req, res) => {        
  let post;
  try {
    post = await PostModel.findById( req?.body?.post_id )
    if(! post) throw Error("Пост с указанным id не найден")
  } catch ( e ) {
    return res.status(300).json({ error: "Ошибка получения поста из базы данных" })    
  }

  switch( req?.body?.action ) {
    case "subscribe":
      const email = req?.body?.email
      if(! email) return res.status(300).json({ error: "Эл. адрес подписки не указан" }) 
      const found = post.subscribers.find( v => v.email === email);
      if( found ) {
        return res.status(200).json({ ok: true, message: "Вы уже подписаны"})
      }
      else {
        post.subscribers.push({ email })
        try {
          await post.save()
        } catch ( e ) {
          return res.status(300).json({ error: "Ошибка сохранения подписки" }) 
        }
      }      
      return res.status(200).json({ ok: true, message: "Подписка оформлена"})
      break;
    case "comment":
      const comment_name = req?.body?.name;
      const comment_body = req?.body?.body;
      if(! comment_name || ! comment_body ) return res.status(300).json({ error: "Должны быть указаны имя автора и текст комментария" }) 
      post.comments.push({ name: comment_name, body: comment_body })
      try {
        await post.save()
      } catch ( e ) {
        return res.status(300).json({ error: "Ошибка сохранения комментария" }) 
      }
      return res.status(200).json({ ok: true, message: "Комментарий успешно добавлен"})
      break;
    default:
      break;
  }
  res.status(200).json({})
})

async function main() {
  console.log("starting mongoose");
  await mongoose.connect( DB );
  console.log("mongoose started");
  console.log("starting express");
  app.listen( PORT );
  console.log("express started");
}

main().catch( e => {
  console.error( e );
})