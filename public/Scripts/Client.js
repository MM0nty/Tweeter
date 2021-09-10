$('document').ready(function() {

  const createTweet = function(tweet) {//create new HTML if HTML
    const escape = function(string) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(string));
      return div.innerHTML;
    };
    const tweetContent =
      `<article class="tweet">
        <header>
        <span class="user">
          <img class="avatar" src="${tweet.user.avatars}">
          <span class="name">${tweet.user.name}</span>
          </span>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="tweet-body">${escape(tweet.content.text)}</div>
  
        <footer>
        ${timeago.format(tweet.created_at)}
        <span class="icons">
          <span class="icon"><i class="fas fa-flag"></i></span>
          <span class="icon"><i class="fas fa-retweet"></i></span>
          <span class="icon"><i class="fas fa-heart"></i></span>
        </span>
      </footer>
  </article>`;
    return tweetContent;
  }

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    //method how to remove tweet elements from container and repopulate them
    $("#tweet-container").empty();//string = selector
    tweets.forEach(function(tweet) {
      const $tweet = createTweet(tweet);
      // takes return value and appends it to the tweets container
      $("#tweet-container").prepend($tweet);
    })
  }

  $("form").submit(function(event) {
    event.preventDefault();
    const post = $(this).serialize();//already queried as "form"//serialize for server readable
    const tweetText = $("#tweet-text", this).val();
    if (tweetText === null || tweetText === "") {
      $(".empty").slideDown();
      return;
    }
    if (tweetText.length > 140) {
      $(".alert").slideDown();
      return;
    }
    $.post("/tweets", post).then(function(data, status) {//creates post
      //waits for post before getting
      $(".empty").slideUp();
      $(".alert").slideUp();
      // success callback function will call up renderTweets, passing it the response from the AJAX request.
      $("#tweet-text").val(null);
      $.ajax("/tweets", { method: "GET" })
        .then(function(tweet) {
          renderTweets(tweet);
        })
    })
  })

  //The loadtweets function will use jQuery to make a request to /tweets and receive the array of tweets as JSON.
  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET" })
      .then(function(tweets) {
        renderTweets(tweets)
      })
  }

  loadTweets();
});