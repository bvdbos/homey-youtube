var http = require('http.min')

exports.getDownloadUrl = function getDownloadUrl (id, callback) {
  if (!id) {
    callback(new Error('Missing video id'))
    return
  }
  var mp3Url = 'www.youtubeinmp3.com'
  var videoUrl = 'http://www.youtube.com/watch?v=' + id
  var path = '/fetch/'

  http.json({
    protocol: 'http:',
    host: mp3Url,
    path: path,
    query: {
      format: 'JSON',
      video: videoUrl
    }
  }).then(function (response) {
    if (!response.link) {
      callback(new Error('Failed to get an MP3-stream. This is most likely because the video is longer than 120 minutes'))
      return
    }
    callback(null, {link: response.link, length: response.length})
  }).catch(callback)
}
