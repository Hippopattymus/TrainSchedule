
var config = {
  apiKey: "AIzaSyADU655SfcDdP0bZfnGOiXJAyeEMOxZ__4",
  authDomain: "connorpclassproject.firebaseapp.com",
  databaseURL: "https://connorpclassproject.firebaseio.com",
  projectId: "connorpclassproject",
  storageBucket: "",
  messagingSenderId: "1085859503474",
  appId: "1:1085859503474:web:d88b5db71f240094"
};

firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var dest = "";
var firstTime;
var tFrequency;

database.ref().on("child_added", function (snapshot) {
  
    var child = snapshot.val();

    var firstTimeConverted = moment(child.firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tRemainder = (diffTime % child.tFrequency);
    var tMinutesTillTrain = child.tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");

    $("<tr><th>" + child.name + "</th><td>" + child.dest + "</td><td>" + child.tFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>").appendTo("tbody");
  
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


$("#submit").on("click", function (event) {
  event.preventDefault();

  name = $("#employee-name").val().trim();
  dest = $("#role").val().trim();
  firstTime = $("#start").val().trim();
  tFrequency = $("#rate").val().trim();

  $("#employee-name").val("");
  $("#role").val("");
  $("#start").val("");
  $("#rate").val("");

  database.ref().push({
    name: name,
    dest: dest,
    tFrequency: tFrequency,
    firstTime: firstTime,
  });
});

function currentTime() {
  var current = moment().format('hh:mm');
  $("#currentTime").html("Current Time: " + current);
  setTimeout(currentTime, 1000);
};

currentTime();

//probably could use moment and an if statement to reload as soon as the minute changes
//but this works decently well
setInterval(function() {
  window.location.reload();
}, 60000);