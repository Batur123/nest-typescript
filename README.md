### Nest.JS, Better-SQLite3, TypeScript

## Routes
GET ('/books') - Get All Books<br>
GET ('/books?sortBy=value') - Get All Books - Sort By Column (ASC) <br>
Acceptable Values: book_author, page_number, book_name <br>
<br>
GET ('/books/:param_id') Get Book By ID<br>
<br>
POST ('/books') <br>
ACCEPT: x-www-form-urlencoded <br>
@param1: book_name<br>
@param2: book_author<br>
@param3: page_number<br>
@param4: publish_date (unix)<br>
<br>
POST ('/login') <br>
ACCEPT: x-www-form-urlencoded<br>
@param1: username<br>
@param2: password<br>
