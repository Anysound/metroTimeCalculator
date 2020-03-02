(function() {
//   var names = Array.from(document.querySelectorAll('.branch__btn-wrapper span'));
//   console.log(names);
//   var beginPath = document.querySelector('.data__source');
//   var destinationPath = document.querySelector('.data__destination');

//   names.forEach(function(item) {

//     // событие выбора станций
//     item.addEventListener('mousedown', function() {

//       if (!beginPath.value) {
//         beginPath.value = item.textContent;
//         calculateTime();
//       } else {
//         destinationPath.value = item.textContent;
//         calculateTime();
//       }
      
//       // let val = beginPath.value ? item.textContent :
//       // destinationPath.value ? item.textContent : ''
//     });

// //calculateTime
//   function calculateTime() {
//     var names = Array.from(document.querySelectorAll('.branch__btn-wrapper span'));
//     var namesValues = [];
//     names.forEach(function(item) {
//       namesValues.push(item.textContent);
//     })
//     var arrIndexes = []
//     var beginIndex = namesValues.indexOf(beginPath.value);
//     arrIndexes.push(beginIndex);

//     var endIndex = namesValues.indexOf(destinationPath.value);
//     arrIndexes.push(endIndex);

//     arrIndexes.sort(function(a, b) {
//       return a - b;
//     }).reverse();
//     var count = arrIndexes[0] - arrIndexes[1];
//     var timePath = count * 5;
//     console.log(timePath);
//     document.querySelector('.data__time').textContent = 'время в пути около ' + timePath + ' мин.'
//   }
//   //calculateTime();
//   });


  var stations = Array.from(document.querySelectorAll('.station'));
  console.log(stations);

  stations.forEach(function(item) {
    var start = document.querySelector('.time-info__start-station');
    var end = document.querySelector('.time-info__end-station');

    function startStationClickHandler() {
      if (start.textContent === '') {
        start.textContent = item.textContent;
      } else {
        end.textContent = item.textContent;
      }
    };
    
    item.addEventListener('mousedown', startStationClickHandler);
    
  });
  
})();
