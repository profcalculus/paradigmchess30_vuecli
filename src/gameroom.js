// Temporary junkroom for orphaned code...

function updateStatus (move) {
  var status = '';
  if (move) {
    clock.start (move.color === 'w' ? 'black' : 'white');
    move.san = move.san.replace ('B', 'D');
    if (move.color === 'w') {
      current_san = current_san + moveNumber + '. ' + move.san;
      $pgn.append ('<li>' + current_san + '</li>');
    } else {
      current_san = current_san + '\t\t\t' + move.san;
      $ ('li', $pgn).last ().remove (); // Remove partial moves
      $pgn.append ('<li>' + current_san + '</li>'); // Replace with full moves
      current_san = '';
      moveNumber += 1;
    }
    // Auto-scroll
    $ ('li', $pgn).last ()[0].scrollIntoView (false);
  }
  let moveColor = game.turn () == 'w' ? 'White' : 'Black';

  // checkmate?
  if (game.in_checkmate ()) {
    status = 'Game over, ' + moveColor + ' is checkmated!';
  } else if (game.in_draw ()) {
    // draw?
    status = 'Game over, draw!';
  } else {
    // game still on
    status = moveColor + ' to move';

    // check?
    if (game.in_check ()) {
      status += ' - ' + 'check!';
    }
  }
  $status.html (status);
}

function pgnHeader (white = 'white', black = 'black') {
  function dateStr () {
    var date = new Date ();
    var yyyy = date.getFullYear ();
    var mm = date.getMonth () + 1;
    var dd = date.getDate ();
    if (mm < 10) {
      mm = '0' + mm;
    }
    if (dd < 10) {
      dd = '0' + dd;
    }
    return yyyy + '/' + mm + '/' + dd;
  }
  function pgnAddTag (tag, text) {
    $pgn.append (`<li class="tinygreen">[${tag} "${text}"]</li>`);
  }
  $pgn.empty ();
  pgnAddTag ('Site', 'ParadigmChess30');
  pgnAddTag ('Date', dateStr ());
  pgnAddTag ('White', white);
  pgnAddTag ('Black', black);
  pgnAddTag ('SetUp', '1');
  pgnAddTag ('StartPos', game.fen_p30 ());
}
console.log ('End of document ready function');
window.pgnHeader = pgnHeader;
window.newGame = newGame;
const fixPGN = () => {
  console.log ('fixPGN() called');
  console.log (this.player_white, this.player_black);
  window.pgnHeader (this.player_white, this.player_black);
};
