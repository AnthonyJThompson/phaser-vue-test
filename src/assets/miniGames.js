/* eslint-disable no-unused-vars */
function miniGame (game, type, callback) {
  var result = false
  if (type === 'mario') {
    result = marioMiniGame(game)
  }
  callback(result)
}
/* eslint-disable no-unused-vars */
function marioMiniGame (game) {
  return true
}
