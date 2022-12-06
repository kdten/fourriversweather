// //geolocation.js
// // How to use Navigator.geolocation
// //
// let G, options, spans;

// document.addEventListener('DOMContentLoaded', init);

// function init(){
//     if(navigator.geolocation){
//         let giveUp = 1000 * 30;  //30 seconds
//         let tooOld = 1000 * 60 * 60;  //one hour
//         options ={
//             enableHighAccuracy: true,
//             timeout: giveUp,
//             maximumAge: tooOld
//         }
        
//         navigator.geolocation.getCurrentPosition(gotPos, posFail, options);
//     }else{
//         //using an old browser that doesn't support geolocation
//     }
// }

// function gotPos(position){
//     spans = document.querySelectorAll('p span');
//     spans[0].textContent = position.coords.latitude;
//     spans[1].textContent = position.coords.longitude;
//     spans[2].textContent = position.coords.accuracy;
    
//     spans[6].textContent = position.timestamp;
// }

// function posFail(err){
//     //err is a number
//     let errors = {
//         1: 'No permission',
//         2: 'Unable to determine',
//         3: 'Took too long'
//     }
//     document.querySelector('h1').textContent = errors[err];
// }


const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);