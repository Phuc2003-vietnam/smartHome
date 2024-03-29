import register from './register.js'
import login from './login.js'
// import createToken from './createTokens.js'
// import refreshAccessToken from './refreshAccessToken.js'
import getUserInfo from './getUserInfo.js'
// import getSpsoStaff from './getSpsoStaff.js'
// import getConversationId from './getConversationId.js'
// import addMessage from './addMessage.js'
// import getMessage from './getMessage.js'

class UserService {
	userInfo=null;	//later getUserInfo will assign to userInfo
	register = register
	login = login
	// createToken = createToken
	// refreshAccessToken = refreshAccessToken
	getUserInfo=getUserInfo
	// getSpsoStaff=getSpsoStaff
	// getConversationId=getConversationId
	// addMessage=addMessage
	// getMessage=getMessage
}

export default UserService
