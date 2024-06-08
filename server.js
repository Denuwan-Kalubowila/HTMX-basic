import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get("/users", async (req, res) => {
    const datalimit=req.query.limit || 10
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${datalimit}`);
        const data = await response.json();
        
        res.send(`
            <h1 class="text-2xl font-bold my-3">Users</h1>
            <ul>
                ${data.map((user) => `<li>${user.name}</li>`).join('')}
            </ul>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching users.");
    }
});
app.post("/convert",(req,res)=>{
    const fahranheight=parseFloat(req.body.fahrenheight)
    const celcius=(fahranheight-32)*(5/9)
    res.send(`
        <p>${fahranheight} degrees is equl to ${celcius.toFixed(2)} degees celcius.</p>
    `)
})

// let count=0
// app.get("/poll",(req,res)=>{
//     count +=5
//     const data={
//         value: count
//     }
//     res.json(data)
// })

let current= 20
app.get("/get-current-temp",(req,res)=>{
    current +=Math.random() *2 -1
    res.send(current.toFixed(1)+"C")
})

const get_users=async ()=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    return data
}

app.post("/search",async(req,res)=>{
    const uData=await get_users()
    console.log(uData)
    const searchName=req.body.search.toLowerCase()
    if (!searchName){
        res.send('<tr></tr>')
    }
    const searchRes= uData.filter(contact=>{
        const name= contact.name.toLowerCase();
        const email= contact.email.toLowerCase();

        return(
            name.includes(searchName) || email.includes(searchName)
        )
    })
    const searchresHtml=searchRes.map(contact=>`
    <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div "my-4 p-2">${contact.email}</div></td>
    </tr>
    `).join("")
    res.send(searchresHtml)
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})