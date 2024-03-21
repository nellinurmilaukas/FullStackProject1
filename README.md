# FullStackProject1
Create a Guestbook app 

Create a web server with Node.js and Express. Add four routes to your application:
“/”,
“/guestbook”,
“/newmessage” and
“/ajaxmessage”.


"/" –route will render the front page of your site. You can use any available HTML template or just develop one by yourself. The page should have navigation links which lead to the other application routes. (Search google for HTML template repositories)

"/guestbook" –route will load a JSON-file and parse it on the page as a formatted table (use either Bootstrap or Pure.css or similar to style the table). Sample JSON file is available here; http://pastebin.com/VpbJqSic Links to an external site.. 

"/newmessage" –route render an input form to the page. When user submit the form, collected data will be saved as JSON element into the data file. Form should have fields for the following data:
username,
country and
message and
a button which enables user to send it. Do not allow empty fields to be submitted
"/ajaxmessage" will render similar form as in previous step to the user. The difference is, that the Submit-button does not post the form, but it runs a Javascript-code which will collect the data from the text fields and send them to the back-end as AJAX-call. It will then return all the messages as a response to the page, under the form. You can use native Javascript or jQuery to implement the code.