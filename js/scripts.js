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
