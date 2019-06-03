#Daddio# 

##User Stories##
-Users can sign up with name and password.
-Users create a child with a mandatory due date, and name and gender. 
 -For gender the user has an option of boy, girl, unknown.  
 -For name, the user is required to put something, they are given the options of saying unknown, choosing a name for themselves, or having the Daddio generate a nickname for the baby until a name is chosen/public.
-Once registered/logged in, the users are brought to their homepage.
-The homepage displays a countdown to the due date and a to do list.
 -The to do list is user generated and crudable
-The homepage also displays the baby’s name, and a link to a baby name page for instances where the name is still undecided.
 -The name page allows the user to search for names and it returns information (if available) about the name(origin, history etc)
-Users can access the community Blog
 -Users can upload posts about preparations, tips, name ideas etc
 -Users can add keywords to their posts to be associated with
 -Users can search for keywords and pull up created posts that match the keyword
-When users add an item to their to do list, the site displays relevant articles from the blog

##Nice to haves## 
-Education/Advice
 -What’s going on with mother or baby at certain stages of the pregnancy
 -How to’s:
  -Change a diaper
  -Swaddle
  -Make a Go Bag

##Stretch Goals##
-Notifications
 -People can sign up for notifications from the user, so that when the baby is coming, the user can send a message to the group.

##Models##
**User**
-Username: String
-Password: String
-Baby [{ref: Baby}]
-Task [{ref: Task}]
-Post [{ref: Post}]
-Name [{ref: Name}]

**Baby**
-Due Date: Date
-Name: String
-Gender: String
-user_id:

**Task**
-Title: String
-Details: String
-Completed: Boolean
-user_id:  

**Post**
-Title
-Text
-Date
-Keywords [String]
-User_id:

**Name**
-Name
-user_id



##EndPoints##
**Post**
-/auth/register - register new users
-/auth/login log in users
-/baby create baby
-/todo create a new task for todo list
-/post create a post
-/name add name to list of names

**Get**
-/user get information for current user
-/baby/:id gets information about individual baby
-/todo get all todo tasks
-/name/behind makes an api call to behind names and displays information
-/post gets all posts
-/post/:id gets individual post
-/name/random gets a random name
-/name/search/behind gets details about a name
-/name/wutang makes an api call to wutang name generator for temporary use and displays name
-/name/foreign makes an api call to translatr to generate a name for temporary use and displays name
-/name/list get all names in list of names

**Put**
-/user edit user information
-/baby/:id edit individual baby information
-/todo/:id edit task
-/post/:id edit a post
-/name/:id edit a name

**Delete**
-/user/:id delete user
-/baby/:id delete baby
-/todo/:id delete task
-/post/:id delete post
-/name/:id delete name
