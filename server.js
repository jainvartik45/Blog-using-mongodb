const express = require('express');
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const app= express();
const ArticleRouter=require('./routes/articles');


mongoose.connect('mongodb://localhost/blog2', {
  useNewUrlParser: true, useUnifiedTopology: true
})


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.set('view engine' , 'ejs');


app.get('/', async (req, res) => {
  
  const articles = await Article.find().sort({createdAt : 'desc'}) 
  res.render('articles/index' , {articles : articles})
})

app.use('/articles',ArticleRouter)


app.listen(5000)