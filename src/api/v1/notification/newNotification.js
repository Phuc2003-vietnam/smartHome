import notification from "#~/model/notification.js"
import getSpsoStaff from "../user/services/getSpsoStaff.js"

async function newNotifications({
    userInfo,
    action,
    result //After edit printer
}) {

    //Sender
    const sender = {
        user_id: userInfo._id.toString(),
        role: userInfo.role,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName
    }

    let managerList = await getSpsoStaff({user_id: userInfo._id.toString()})

    let newsPromise = managerList.map(async(ele) => {

        //Receiver
        let receiver = {
            user_id: ele._id.toString(),
            role: ele.role,
            firstName: ele.firstName,
            lastName: ele.lastName
        }

        //Notitcation infor
        let {user_action, description} = descriptionHelper(action, sender, receiver, result)

        //Create
        await notification.create({
            sender,
            user_action,
            description,
            printerId: result.printerId,
            location: result.location,
            receiver
        })

        return ele
    })

    let newsResult = await Promise.all(newsPromise)

    //Add a notification only for sender
    let {user_action, description} = descriptionHelper(action, sender, sender, result)

    //Create
    await notification.create({
        sender,
        action: user_action,
        description,
        printerId: result.printerId,
        location: result.location,
        receiver: sender
    })

    return newsResult

}

export default newNotifications

//Description helper
function descriptionHelper(action, sender, receiver, printerInfo) {
    if(action == undefined){
        action = "editInfor"
    } else {
        action = (action == 1) ? "enable" : "disable"
    }

    //Chủ ngữ
    let subject = (sender.user_id == receiver.user_id) ? "Bạn" : `${sender.lastName} ${sender.firstName}`
    
    let description = `
        <p>
            <b>${subject}</b> đã thực hiện thành công hành động 
            <i style="color: blue">"${action}"</i> printer với printerID: ${printerInfo.printerId}, địa chỉ ${printerInfo.location.facility}, 
            ${printerInfo.location.department}, ${printerInfo.location.room}
        </p>
    `
    return {
        user_action: action,
        description
    }
}
