const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registred. Proceed to login"});
    } else {
      return res.status(404).json({message: "Customer already exists!"});
    }
  }
  return res.status(400).json({message: "Enter valid details"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const bookIsbn = (req.params.isbn);
  if(!bookIsbn){
    return res.status(400).json({message: "No book with the specified ISBN"})
  }
  return res.status(200).send(JSON.stringify(books[bookIsbn]));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  bookAuthour = (req.params.author);
  if(!bookAuthour){
    return res.status(400).json("Thereis no book with the specified author")
  }
  const allBoooks =  Object.values(books).filter(item=>item.author== bookAuthour)
  return res.status(200).send(JSON.stringify(allBoooks), null, 4);
  //Write your code here
 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let bookTitle = (req.params.title);
    const allBoooks = Object.values(books).filter(item=>item.title== bookTitle)
    return res.status(200).send(JSON.stringify(allBoooks));
  //Write your code here

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;

  if (!isbn){
    return res.status(400).send('Book or reviews do not exist');
    }else{
    
      return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4))
      };
  //Write your code here
});

module.exports.general = public_users;
