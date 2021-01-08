// Parse.Cloud.beforeSave("GameScore", (request) => {
//     console.log("before save => ",request);
//     },{
//       fields: {
//         score : {
//           required:true,
//           options: score => {
//             return score >= 1 && score <= 5;
//           },
//           error: 'Your review must be between one and five score'
//         }
//       }
//     });

//     Parse.Cloud.afterSave("GameScore", (request) => {
//         console.log("after save => ",request);
//     });
    
