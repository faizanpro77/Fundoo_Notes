import firestore from '@react-native-firebase/firestore';
//import { exp } from 'react-native/Libraries/Animated/Easing';

export function signUp(signUPData) {

    firestore()
    .collection('Users')
    .add(signUPData)
    .then(() => {
      console.log('User added!');
      console.warn('User added!');

    }).catch(()=>{
        console.warn(error);
        console.log(error);
    
    })
}




export async function signIn(emailData,PasswordData) {

      console.log('emailData = ',emailData)
      console.log('PasswordData = ',PasswordData)
    
      const users = await firestore()
        .collection('Users')
        // Filter results
        .where('Emial', '==', emailData)
        .where('Password', '==', PasswordData)
        .get().then((data => {
          data
            .docs
            .forEach(doc => {
               var docdata = 
              console.log(doc.exists)

            });  })
  
            )
          }

         

        