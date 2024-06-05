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

app.listen(3000,()=>{
    console.log('Server is runnuing on port 3000');
})