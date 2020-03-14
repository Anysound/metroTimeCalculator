(function () {
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

  var start = document.querySelector('.time-info__start-station-title');
  var end = document.querySelector('.time-info__end-station-title');

  var deleteStartStation = document.querySelector('.time-info__start .time-info__delete');
  var deleteEndStation = document.querySelector('.time-info__end .time-info__delete');

  // массивы станций
  var redStations = Array.from(document.querySelectorAll('#M1_stname .station'));
  var blueStations = Array.from(document.querySelectorAll('#M2_stname .station'));
  var greenStations = Array.from(document.querySelectorAll('#M3_stname .station'));
  var orangeStations = Array.from(document.querySelectorAll('#M4_stname .station'));
  var violetStations = Array.from(document.querySelectorAll('#M5_stname .station'));

  function getTitles(item) {
    return item.textContent;
  }

  redStations = redStations.map(getTitles);
  blueStations = blueStations.map(getTitles);
  greenStations = greenStations.map(getTitles);
  orangeStations = orangeStations.map(getTitles);
  violetStations = violetStations.map(getTitles);

  var stations = Array.from(document.querySelectorAll('.station'));
  console.log(stations);

  stations.forEach(function (item) {
    return new Promise(function () {
      function stationClickHandler() {
        if (start.textContent === '') {
          start.textContent = item.textContent;
          deleteStartStation.classList.add('time-info__delete--show');

        } else {
          end.textContent = item.textContent;
          deleteEndStation.classList.add('time-info__delete--show');

        }
      }
      item.addEventListener('mousedown', stationClickHandler);

    });

  });

  function deleteStartStationHandler() {
    start.textContent = '';
    deleteStartStation.classList.remove('time-info__delete--show');
  }

  function deleteEndStationHandler() {
    end.textContent = '';
    deleteEndStation.classList.remove('time-info__delete--show');
  }

  deleteStartStation.addEventListener('mousedown', deleteStartStationHandler);
  deleteEndStation.addEventListener('mousedown', deleteEndStationHandler);


  var mutationConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
    characterDataOldValue: true
  };


  var observer = new MutationObserver(calcTime);

  observer.observe(end, mutationConfig)
  // функция расчета времени
  function calcTime() {
    var branches = [redStations, blueStations, greenStations, orangeStations, violetStations]
    var startTitle = start.textContent;
    var endTitle = end.textContent;

    function getTimeSameBranch(branch) {
      var INTERVAL = 5;
      var totalTime = document.querySelector('.time-info__total');
      var time = (branch.indexOf(startTitle) - branch.indexOf(endTitle)) * INTERVAL
      totalTime.textContent = 'Время поездки около ' + Math.abs(time) + ' минут'
    }

    branches.forEach(function (branch) {
      // branch.forEach(function(station) {
      //   if (branch.includes(startTitle) && branch.includes(endTitle)) {
      //     getTimeSameBranch(branch);
      //   }
      // })
      if (branch.includes(startTitle) && branch.includes(endTitle)) {
        getTimeSameBranch(branch);
      }
    })
  }


  // calcTime([redStations, blueStations, greenStations, orangeStations, violetStations]);
})();
