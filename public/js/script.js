var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl);

if(getUrl.pathname == "/admins/viewcamps"){
  getcamps();
}

function getcamps(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      for(i = 0; i < data.length; i++){
        document.getElementById('cont').innerHTML += "<p>"+data[i].name+"</p> <p>"+data[i].address+"</p> <p>"+data[i].sponsor.name+"</p> <p>"+data[i].sponsor.number+"</p> <p>"+data[i].date+"</p> <p>"+data[i].time+"</p>" + "<br><hr><br>";
      }
    }
  }
  xhttp.open("GET", baseUrl+"/getallcamps", true);
  xhttp.send();
}


function saveEdit(){
  var editCamp = document.getElementById("edit-camp").value;
  var editAddress = document.getElementById("edit-address").value;
  var editSponname = document.getElementById("edit-sponname").value;
  var editSponnumber = document.getElementById("edit-sponnumber").value;
  var editSpondate = document.getElementById("edit-spondate").value;
  var editSpontime = document.getElementById("edit-spontime").value;
  var id = document.getElementById ( "id1" ).innerText;

  var params = "&camp="+editcamp+"&address="+editAddress+"&sponname="+editSponname+"&sponnumber="editSponnumber+"&spondate="editSpondate+"&spontime="editSpontime;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      document.getElementById("camp").innerHTML = data.camp;
      document.getElementById("address").innerHTML =  data.address;
      document.getElementById("sponname").innerHTML = data.sponname;
      document.getElementById("sponnumber").innerHTML =  data.sponnumber;
      document.getElementById("spondate").innerHTML = data.spondate;
      document.getElementById("spontime").innerHTML =  data.spontime;
      document.getElementById('spoiler').style.display = 'none';
    }
  };
  xhttp.open("PUT", baseUrl+"notes/"+id, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(params);
}
