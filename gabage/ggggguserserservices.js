// //thus 2 1)

// import firestore from '@react-native-firebase/firestore';

// export function signUp(signUPData) {

//   firestore()
//     .collection('Users')
//     .add(signUPData)
//     .then(() => {
//       console.log('User added!');
//       console.warn('User added!');

//     }).catch(() => {
//       console.warn(error);
//       console.log(error);

//     })
// }
// //var emailData2
// export async function signIn(emailData, PasswordData) {
//   // emailData2 = emailData;
//   // updateEmail();

//   if (emailData != '') {
//     // console.log('emailData = ',emailData)
//     // console.log('PasswordData = ',PasswordData)
//     let success = 'success'
//     let fail = 'fail'
//     let response;

//     await firestore()
//       .collection('Users')
//       // Filter results
//       .where('Emial', '==', emailData)
//       .where('Password', '==', PasswordData)
//       .get().then((data => {
//         data
//           .docs
//           .forEach(doc => {
//             var docdata = doc.exists
//             // console.log('????????????',docdata)
//             //  return doc.data

//             if (docdata) {
//               return response = success
//             } else {
//               return response = fail
//             }

//           });
//       })

//       ).catch(error => { return error })
//     // console.log('////////////',response)
//     return response
//   }
// }

// var emailData2
// export async function CheckEmail(emialdata1) {
//   emailData2 = emialdata1;
//   // console.log("\\\\\\\\\\\\\\\\\\\\\\\\",emialdata1)
//   if (emialdata1 != '') {
//     let fial1 = 'fail'
//     let success1 = 'success'
//     let response1

//     await firestore()
//       .collection('Users')
//       .where('Emial', '==', emialdata1)
//       .get()
//       .then(data => {
//         data
//           .docs
//           .forEach(element => {
//             var elementdata = element.exists

//             if (elementdata)
//               return response1 = success1
//             else
//               return response1 = fial1
//           });
//       }).catch(error => { return error })
//     return response1;
//   }
// }

// export async function updatePassword(newPassword) {

//   console.log('newpaswddddd', newPassword)
//   console.log('>>>>>>>>>>>>>>>>', emailData2)
//   await firestore()
//     .collection('Users')
//     .where('Emial', '==', emailData2)
//     .get()
//     .then(data => { data.forEach(docs => { docs.ref.update({ Password: newPassword }) }) })

// }

