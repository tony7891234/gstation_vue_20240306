import io from 'socket.io-client'
const socket = io.connect('ws://162.209.175.122:9501', {transports: ['websocket']})
// socket.emit('join-room', 'odds_room')
// socket.emit('join-room', 'odds_all_room')
socket.emit('join-room', 'odds_all_room')
// socket.on('odd_changed', data => {
// 	const _data = JSON.parse(data)
// 	console.log(_data.id)
// })
socket.on("disconnect", (reason) => { // 服务器主动断开的连接或者客户端主动断开的连接都应该手动连接
	console.log('reason', reason)
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    socket.connect();
  }
  // else the socket will automatically try to reconnect
});
export default {
	install(Vue) {
		Vue.prototype.$$socket = socket
	}
}