function goToNewPage()
{
    var url = document.getElementById('list').value;
    if(url != 'none') {
        window.location = url;
    }
}

function toggleShowHide() { // reveal the dropdown only after "Find a service" is clicked.
  var x = document.getElementById("dropdown");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
