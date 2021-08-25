onSubmit = async() =>{
    var danceList =[]
   var snapshot = await firebase.firestore().collection('Users').orderBy('Emial').get();
snapshot.forEach((doc)=>{
danceList.push(doc)

})

console.warn(danceList)
if(danceList == this.state.Email)
console.warn('login successfull')

}

onSubmit = async() =>{
    try{
    const user = await firestore().collection('Users').get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            const {Email} = doc.data();
        })
    })
   // console.log(users)
   // console.warn(Email)


  if(Email == this.state.Email)
     console.warn('login successfull')
}catch(e){
    console.log(e)
}

}