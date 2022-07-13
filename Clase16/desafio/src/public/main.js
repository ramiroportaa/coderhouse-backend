const socket = io();

const renderProducts = async (products)=>{
    const res = await fetch("./views/productsTemplate.ejs");
    const template = await res.text();
    const html = ejs.render(template, {products});
    document.getElementById("products").innerHTML = html;
}

const renderMessages = async (messages)=>{
    console.log(messages);
    const res = await fetch("./views/chatTemplate.ejs");
    const template = await res.text();
    const html = ejs.render(template, {messages});
    document.getElementById("chatLog").innerHTML = html;
}

document.getElementById("productsForm")
.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data = new FormData(e.target);
    let obj = {};
    data.forEach((value,key)=>obj[key]=value);
    socket.emit("client:newProduct", obj);
    e.target.reset();
})

document.getElementById("messageCenter")
.addEventListener("submit", (e)=>{
    e.preventDefault();
    const chatBox = e.target.querySelector("[name='message']");
    const emailInput = e.target.querySelector("[name='email']");
    if (chatBox.value.trim()){
        const message = chatBox.value;
        const email = emailInput.value;
        socket.emit("client:newMessage", {email, message});
        chatBox.value = "";
        chatBox.focus();
        emailInput.disabled = true;
    }
})

//Evento websocket para render de productos.
socket.on("server:products", (data)=>{
    renderProducts(data.products);
})

//Evento websocket del chat (render de cada mensaje nuevo).
socket.on("server:messages", (data)=>{
    renderMessages(data.messagesLog);
})