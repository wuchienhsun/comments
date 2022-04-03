const app = {
  API_URL: 'https://comments-app.wuhsun.com/api/v1',
  USER_API_URL: 'https://random-data-api.com/api/users/random_user',
  currentUser: {
    userName: '',
    avatar: '',
  },
  comments: [],
  loading: true,
};
app.init = async function () {
  // fetch comments API
  await app.fetchUserAPI();
  await app.fetchComments();
  let addCommentBtn = app.get('#addCommentBtn');
  addCommentBtn.addEventListener('click', app.addCommentEvent);
};

app.registerUpvoteEvent = function () {
  let upvoteBtn = app.getAll('#upvote-btn');
  upvoteBtn.forEach((el) => {
    el.addEventListener('click', app.upvoteEvent);
  });
};
// core operations
app.get = function (selector) {
  return document.querySelector(selector);
};
app.getAll = function (selector) {
  return document.querySelectorAll(selector);
};
app.createElement = function (tagName, settings, parentElement) {
  let obj = document.createElement(tagName);
  if (settings.atrs) {
    app.setAttributes(obj, settings.atrs);
  }
  if (settings.stys) {
    app.setStyles(obj, settings.stys);
  }
  if (settings.evts) {
    app.setEventHandlers(obj, settings.evts);
  }
  if (parentElement instanceof Element) {
    parentElement.appendChild(obj);
  }
  return obj;
};
app.modifyElement = function (obj, settings, parentElement) {
  if (settings.atrs) {
    app.setAttributes(obj, settings.atrs);
  }
  if (settings.stys) {
    app.setStyles(obj, settings.stys);
  }
  if (settings.evts) {
    app.setEventHandlers(obj, settings.evts);
  }
  if (parentElement instanceof Element && parentElement !== obj.parentNode) {
    parentElement.appendChild(obj);
  }
  return obj;
};
app.setStyles = function (obj, styles) {
  for (let name in styles) {
    obj.style[name] = styles[name];
  }
  return obj;
};
app.setAttributes = function (obj, attributes) {
  for (let name in attributes) {
    obj[name] = attributes[name];
  }
  return obj;
};
app.setEventHandlers = function (obj, eventHandlers, useCapture) {
  for (let name in eventHandlers) {
    if (eventHandlers[name] instanceof Array) {
      for (let i = 0; i < eventHandlers[name].length; i++) {
        obj.addEventListener(name, eventHandlers[name][i], useCapture);
      }
    } else {
      obj.addEventListener(name, eventHandlers[name], useCapture);
    }
  }
  return obj;
};
app.ajax = function (method, src, args, callback) {
  let req = new XMLHttpRequest();
  if (method.toLowerCase() === 'post') {
    // post through json args
    req.open(method, src);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onload = function () {
      callback(this);
    };
    if (args) {
      req.send(JSON.stringify(args));
    }
  } else {
    // get through http args
    req.open(method, args ? src + '?' + args : src);
    req.onload = function () {
      callback(this);
    };
    req.send();
  }
};

app.addCommentEvent = async function (e) {
  e.preventDefault();
  const addComment = app.get('#addComment');
  const comment = addComment.value.trim();
  if (comment.length > 0) {
    const data = {
      userName: app.currentUser.userName,
      avatar: app.currentUser.avatar,
      comment: comment,
    };
    await app.addComment(data);
    // clear input
    addComment.value = '';
  }
};

app.upvoteEvent = async function (e) {
  e.preventDefault();
  let text = e.target.textContent.split(' ');
  text[1] = parseInt(text[1]);
  if (Number.isNaN(text[1])) {
    text[1] = 0;
  }
  text[1] += 1;
  text = text.join(' ');
  const commentId = parseInt(e.target.className.split(' ')[0].split('-')[1]);
  const data = {
    commentId,
  };
  await app.upvote(data);
  app.modifyElement(e.target, {
    atrs: {
      textContent: text,
    },
  });
};

app.timeSince = function (date) {
  var seconds = Math.floor((new Date() - new Date(date)) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 604800;
  if (interval > 1) {
    return Math.floor(interval) + ' weeks ago';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hrs ago';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' min ago';
  }
  return Math.floor(seconds) + ' seconds';
};

app.displayCurrentUser = function () {
  let container = app.get('#avater');
  app.createElement(
    'img',
    {
      atrs: {
        src: app.currentUser.avatar,
      },
      stys: {
        'border-radius': '42.25px',
      },
    },
    container,
  );
};

app.displayComments = function () {
  let container = app.get('#comments');
  let prevContainer = app.get('#childContainer');
  if (prevContainer) {
    prevContainer.remove();
  }

  let childContainer = app.createElement(
    'div',
    {
      atrs: {
        id: 'childContainer',
      },
    },
    container,
  );
  // reset element

  if (app.comments.length === 0) {
    app.createElement(
      'h2',
      {
        atrs: {
          className: 'no-result',
          textContent: 'no comments',
        },
      },
      childContainer,
    );
  } else {
    for (let i = 0; i < app.comments.length; i++) {
      let comment = app.comments[i];
      let commentContainer = app.createElement(
        'div',
        {
          atrs: {
            className: 'mb-[31px] flex',
          },
        },
        childContainer,
      );
      app.displayComment(comment, commentContainer);
    }
    app.registerUpvoteEvent();
  }
};

app.displayComment = function (comment, container) {
  // user Image
  app.createElement(
    'img',
    {
      atrs: {
        src: comment.avatar,
        className: 'w-[30px] h-[30px] rounded-[42.25px] mr-[11px]',
      },
    },
    container,
  );
  let contentContainer = app.createElement(
    'div',
    {
      atrs: {
        className: 'contentContainer',
      },
    },
    container,
  );

  let userInfoContainer = app.createElement(
    'div',
    {
      atrs: {
        className: 'userInfoContainer flex items-center',
      },
    },
    contentContainer,
  );
  // user name
  app.createElement(
    'div',
    {
      atrs: {
        className: 'font-[600] text-[#21293C] text-[13px] mr-[5px]',
        textContent: comment.userName,
      },
    },
    userInfoContainer,
  );

  // submit time
  app.createElement(
    'div',
    {
      atrs: {
        className: 'font-[400] text-[#4B587C] text-[11px]',
        textContent: `・${app.timeSince(comment.timestamp)}`,
      },
    },
    userInfoContainer,
  );
  // comment
  app.createElement(
    'div',
    {
      atrs: {
        className: 'w-[643px] font-[400] text-[#21293C] text-[13px]',
        textContent: comment.comment,
      },
    },
    contentContainer,
  );
  let actionContainer = app.createElement(
    'div',
    {
      atrs: {
        className: 'actionContainer flex items-center mt-[14px]',
      },
    },
    contentContainer,
  );
  // upvote
  app.createElement(
    'button',
    {
      atrs: {
        id: 'upvote-btn',
        className: `upvote-${comment.id} font-[600] text-[#4B587C] text-[11px] mr-[28px]`,
        textContent: `▲ ${comment.upvotes === 0 ? '' : comment.upvotes} Upvote`,
      },
    },
    actionContainer,
  );
  // reply
  app.createElement(
    'div',
    {
      atrs: {
        className: 'font-[600] text-[#4B587C] text-[11px]',
        textContent: 'Reply',
      },
    },
    actionContainer,
  );
};

// fetch random user API
app.fetchUserAPI = function () {
  app.ajax('GET', app.USER_API_URL, null, (req) => {
    return new Promise((resolve, reject) => {
      const data = JSON.parse(req.responseText);
      app.currentUser.userName = data.first_name;
      app.currentUser.avatar = data.avatar;
      app.displayCurrentUser();
      app.loading = false;
      resolve();
    });
  });
};

app.addComment = function ({ userName, avatar, comment }) {
  return new Promise((resolve, reject) => {
    app.ajax(
      'POST',
      `${app.API_URL}/comment`,
      { userName, avatar, comment },
      async (req) => {
        const { status } = JSON.parse(req.responseText);
        if (status === 'success') {
          console.log('add success');
        }
        await app.fetchComments();
        resolve();
      },
    );
  });
};

app.upvote = function ({ commentId }) {
  return new Promise((resolve, reject) => {
    app.ajax(
      'POST',
      `${app.API_URL}/comment/upvote`,
      { commentId },
      async (req) => {
        const { status } = JSON.parse(req.responseText);
        if (status === 'success') {
          console.log('upvote success');
        }
        // refresh upvote
        resolve();
      },
    );
  });
};

app.fetchComments = function () {
  return new Promise((resolve, reject) => {
    app.ajax('GET', `${app.API_URL}/comments`, null, (req) => {
      const data = JSON.parse(req.responseText).data;
      app.comments = data;
      app.displayComments();
      resolve();
    });
  });
};

window.addEventListener('DOMContentLoaded', app.init);
