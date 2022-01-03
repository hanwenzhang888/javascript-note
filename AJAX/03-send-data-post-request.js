const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.onload = function() {
      resolve(xhr.response);    //resolve with our xhr.response data
      // const listOfPosts = JSON.parse(xhr.response);
    };

    xhr.send(JSON.stringify(data));
  });

  return promise;
}

async function fetchPosts() {
  const responseData = await sendHttpRequest(   //await the request
    'GET',
    'https://jsonplaceholder.typicode.com/posts'
  );
  const listOfPosts = responseData;   //the promise data we get
  for (const post of listOfPosts) {   //the place we get the post available
    const postEl = document.importNode(postTemplate.content, true);   //node from another document, true makes it deep clone
    postEl.querySelector('h2').textContent = post.title.toUpperCase();
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId
  };

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

fetchPosts();
createPost('DUMMY', 'A dummy post!');
 
