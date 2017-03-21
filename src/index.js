import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import './App.css';

//sample data 
const authors = [
  {
    name: "Rich",
    email: "richiesemail@email.com"
  },
  {
    name: "Steve"
  },
  {
    name: "Beans",
    location: "Glasgow, UK"
  },
  {
    name: "Shaun",
    location: "London, UK"
  }
];

const comments = [
  "Functional programming with React is legit.",
  "This is better than OO",
  "I like the Ramda logo",
  "Much readable code. Many understandable"
];

// This uses Ramda's pipe function to build a function that takes the modulo of the input
// with the length of the array (using the flip function to swap the order of the first two args of mathMod)
// it then returns the element at the resulting index.
const nthWrapped = array => R.pipe(R.flip(R.mathMod)(array.length), R.flip(R.nth)(array));

const nthPost = i => R.merge({ author: nthWrapped(authors)(i) }, { comment: nthWrapped(comments)(i) });

const postsInRange = R.map(nthPost);

const postComponents = R.map(p => <Post key={Math.random()} author={p.author} comment={p.comment} />);

const name = author => <div>{author.name}</div>
const anonymous = () => <div>anon</div>
const email = author => <div>Email: {author.email}</div>
const location = author => <div>Location: {author.location}</div>
const empty = () => null
const authorComponents = author => [ 
  author.name ? name(author) : anonymous,
  author.email ? email(author) : empty(),
  author.location ? location(author) : empty()
]

function Title({ title }) {
  return <h2 className="title">{title}</h2>
}

function Subject({ subject }) {
  return (
    <div className="subject">
      <em>{subject}</em>
    </div>
  );
}

function PostList({ posts }) {
  return (
    <div>
      {postComponents(posts)}
    </div>
  );
}

function Post({ author, comment }) {
  return (
    <div>
       <Author author={author} />
       <Comment comment={comment} /> 
    </div>
  );
}

function Author({ author }) {
  return (
    <div className="author">
      {authorComponents(author)}
    </div>
  );
}

function Comment({ comment }) {
  return (
    <div className="comment">
      {comment}
    </div>
  );
}

function App(props) {
  return (
    <div>
      <Title title={props.title} />
      <Subject subject={props.subject} />
      <PostList posts={props.posts} />
    </div>
  );
}

ReactDOM.render(
  <App title="Functional React with Ramda" subject="What do you think of functional programming with React?" posts={postsInRange(R.range(0, 5))} />,
  document.getElementById('root')
)