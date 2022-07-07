
const io = require ('socket.io')(8800, {
    cors: {
        origin: "http://localhost:3000"
    }
})



let activeUsers = []

io.on("connection", (socket) => {

    // thêm người dùng mới
    socket.on("new-user-add", (newUserId) => {

        // Nếu người dùng không được thêm trước đó
        if (!activeUsers.some((user) => user.userId === newUserId)) {

            activeUsers.push({ 
                userId: newUserId, 
                socketId: socket.id 
            });
            console.log("Người dùng mới được kết nối", activeUsers);
        }

        console.log("người dùng đang hoạt động", activeUsers)

        // Gửi tất cả người dùng đang hoạt động cho người dùng mới
        io.emit("get-users", activeUsers);
    })



    socket.on("disconnect", () => {

        // Xóa người dùng khỏi danh sách người dùng đang hoạt động
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("Người dùng đang ngắt kết nối", activeUsers);

        // Gửi tất cả người dùng đang hoạt động cho người dùng
        io.emit("get-users", activeUsers);
      });



    // gửi tin nhắn cho một gười dùng cụ thể
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        console.log("Gửi từ socket đến :", receiverId)
        console.log("Dữ liệu: ", data)
        if (user) {
        io.to(user.socketId).emit("recieve-message", data);
        }
    });

})