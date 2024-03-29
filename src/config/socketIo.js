import {Server} from 'socket.io'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

const access_token_key = process.env.ACCESS_TOKEN_KEY

var io
function initializeSocketServer(httpServer) {
	io = new Server(httpServer, {
		cors: {origin: '*'},
	})

	io.on('connection', (socket) => {
		console.log(`Socket IO connected, user ${socket.id}`)
		socket.emit("check","You are connected to socket io server")
	    //client socket.emit("join-room", conversationId),gọi sau khi bấm vào hình tròn người
		socket.on("test",()=>{
			console.log("tessting");
		})
		socket.on('join-room', (conversationId) => {
			socket.join(conversationId)
			console.log(socket.id + " has join a room: "+conversationId);
		})
		socket.on('create-message', (conversationId,message) => {
			////client socket.emit("create-message",conversationId),
			const data = {
				message: 'Call the GET message API',
				target: '2 members of a conversation',
				reason: "1 member create a new message into that conversationId",
				text_send: message,
				conversationId:conversationId
			}
			console.log(socket.id + " has create a message: " + message);


			io.to(conversationId).emit('get-message', data) //sau đó tất cả members thuộc về 1 conversationId sẽ fetch lại tin nhắn
			////client socket.on("get-message",cb) = > cb sẽ fetch lại tin nhắn

		}) 
	})
	// io.use(async (socket, next) => {
	// 	try {
	// 		if (!socket.handshake.auth.token)
	// 		return next({status: 401, message: 'Unauthorized'})
	// 		const access_token = socket.handshake.auth.token
	// 		const decodedToken = jwt.verify(access_token, access_token_key)
	// 		const employee = await prisma.employee.findUnique({
	// 			where: {employee_id: decodedToken.employee_id},
	// 		})
	// 		if (!employee) next({status: 401, message: 'Unauthorized'})
	// 		next()
	// 	} catch (err) {
	// 		next({status: 401, message: 'Unauthorized'})
	// 	}
	// })
}
export {initializeSocketServer, io}
