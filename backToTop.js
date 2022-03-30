const top_btn = document.getElementById("top_btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    top_btn.style.display = "block";
  } else {
    top_btn.style.display = "none";
  }
}

function to_top() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

top_btn.addEventListener('click', to_top);