

// export async function signIn(emailData,PasswordData) {

//     console.log('emailData = ',emailData)
//     console.log('PasswordData = ',PasswordData)


    
//     const users = await firestore()
//       .collection('Users')
//       // Filter results
//       .where('Emial', '==', emailData)
//       .where('Password', '==', PasswordData)
//       .get().then((data => {
//         data
//           .docs
//           .forEach(doc => {
//              doc.exists
//             console.log(doc.exists)

//           });  })

//           )
//         }




// ---------------------------------------------------------

// export async function signIn(emailData) {
// console.log('llllllllllllll',Object.values(emailData))
// // var emaildata = signInData;
//     const users = await firestore()
//       .collection('Users')
//       // Filter results
//       .where('Emial', '==', emailData)
//       //.where('Password', '==', this.state.Password)
//       .get()
//       console.log(users)
//       if(users.empty){
//       console.log('Email or password is wrong or users does not exist')
//       }
//      else
//      {
//       console.log('User is successfully loged in navigate to home page')
  
//      }
                   
//   }
// --------------------------------------------------------
// getUser = async() =>{
//     const users = await firestore()
//       .collection('Users')
//       // Filter results
//       .where('Emial', '==', this.state.Email)
//       .where('Password', '==', this.state.Password)

//       .get()
      
//       if(users.empty){
//       console.log('Email or password is wrong or users does not exist')
//       }
//      else
//      {
//       console.log('User is successfully loged in navigate to home page')
  
//      }
  
//   Password        
     
//   }
// //------------------------------------------------------------

// onSubmit = async() =>{
//        let signInData = {
//            Emial:this.state.Email,
//            Password:this.state.Password
//        }

//      let response = signIn(signInData)
//    }

// ....................................................................
// getUser = async() =>{
//     const users = await firestore()
//       .collection('Users')
//       // Filter results
//       .where('Emial', '==', this.state.Email)
//       .where('Password', '==', this.state.Password)

//       .get()
      
//       if(users.empty){
//       console.log('Email or password is wrong or users does not exist')
//       }
//      else
//      {
//       console.log('User is successfully loged in navigate to home page')
//   //   var matchedUser = users[0]
//   //    console.log('Matched User',matchedUsers)
//   //    const {Emial} = matchedUser.data();
//   //    console.log('Matched User Email = ',Emial)
//      }



// //...............................................................................................
// onSubmit = async() =>{
//       try{
//       const user = await firestore().collection('Users').get().then((querySnapshot) => {
//           querySnapshot.forEach(doc => {
//               const {Email} = doc.data();
//           })
//       })
//      // console.log(users)
//      // console.warn(Email)


//     if(Email == this.state.Email)
//        console.warn('login successfull')
//   }catch(e){
//       console.log(e)
//   }

//   }
// //-------------------------------------------------------
// onSubmit = async() =>{
//     var danceList =[]
//    var snapshot = await firebase.firestore().collection('Users').orderBy('Emial').get();
// snapshot.forEach((doc)=>{
// danceList.push(doc)

// })

// console.warn(danceList)
// if(danceList == this.state.Email)
// console.warn('login successfull')

// }

// onSubmit = async() =>{
//     try{
//     const user = await firestore().collection('Users').get().then((querySnapshot) => {
//         querySnapshot.forEach(doc => {
//             const {Email} = doc.data();
//         })
//     })
//    // console.log(users)
//    // console.warn(Email)


//   if(Email == this.state.Email)
//      console.warn('login successfull')
// }catch(e){
//     console.log(e)
// }

// }