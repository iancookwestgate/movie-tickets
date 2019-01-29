// Business Logic for Ticket ---
//1. Create the constructor -
function Ticket() {
  this.choiceResults = [];
  this.currentId = 0
}

Ticket.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.choiceResults.push(ticket);
}

Ticket.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Ticket.prototype.findTicket = function(id) {
  for(var i=0; i< this.choiceResults.length; i++) {
    if(this.choiceResults[i]) {
      if(this.choiceResults[i].id == id) {
        return this.choiceResults[i];
      }
    }
  };
  return false;
}

Ticket.prototype.deleteTicket = function(id) {
  for (var i=0; i < this.choiceResults.length; i++) {
    if (this.choiceResults[i]) {
      if (this.choiceResults[i].id == id) {
        delete this.choiceResults[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Selection ---
function Selection(movie, time, age) {
  this.movie = movie;
  this.time = time;
  this.age = age
}

Selection.prototype.fullTicket = function() {
  return this.movie + " " + this.time + " " + this.age;
}

// User Interface Logic ---
var tickets = new Ticket();

function displaySelectedTickets(ticketsToDisplay) {
  var ticketsList = $("ul#choiceResults");
  var htmlForTicketInfo = "";
  ticketsToDisplay.choiceResults.forEach(function(ticket) {
    htmlForTicketInfo += "<li id=" + ticket.id + ">" + ticket.movie + " " + ticket.time + " " + ticket.age + "</li>";
  });
  ticketsList.html(htmlForTicketInfo);
};

function showTicket(ticketId) {
  var ticket = tickets.findTicket(ticketId);
  $("#pricing").show();
  $(".movie").html(ticket.movie);
  $(".time").html(ticket.time);
  $(".age").html(ticket.age);
  var buttons = $("#startOverButton");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + ticket.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#choiceResults").on("click", "li", function() {
    showTicket(this.id);
  });
  $("#startOverButton").on("click", ".deleteButton", function() {
    tickets.deleteTicket(this.id);
    $("#pricing").hide();
    displaySelectedTickets(tickets);
  })
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-ticket").submit(function(event) {
    event.preventDefault();

    var inputtedMovie = $("select#movies").val();
    var inputtedTime = $("select#movieTime").val();
    var inputtedAge = $("select#age").val();

    $("select#movies").val("");
    $("select#movieTime").val("");
    $("select#age").val("");

    var newTicket = new Selection(inputtedMovie, inputtedTime, inputtedAge);
    tickets.addTicket(newTicket);
    displaySelectedTickets(tickets);
  })
})
