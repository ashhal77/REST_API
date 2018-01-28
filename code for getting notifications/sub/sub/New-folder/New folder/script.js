//var myApp = angular.module("myModule", []);

var myApp = angular.module("myModule", []).controller("myController", function($scope,$http){

   // $scope.message = "Hello AngularJS";

  
    var pallets = [
    
   {Pallets: "Class A", Count:0},
     {Pallets: "Class B", Count:0},
     {Pallets: "Class C", Count:0},
     {Pallets: "Class D", Count:0},
     {Pallets: "Class E", Count:0}
 

    ];

    var status = [
    
    {Pallets: "Class A", Progressed:2, Inprogress: 8},
    {Pallets: "Class B", Progressed:0, Inprogress: 4},
    {Pallets: "Class C", Progressed:0, Inprogress: 7},
    {Pallets: "Class D", Progressed:0, Inprogress: 4},
    {Pallets: "Class E", Progressed:0, Inprogress: 4}

    ];

    $scope.pallets = pallets;
    $scope.status = status;






   palletdata = [];


   $scope.Submit = function(frame,framecolor,screen,screencolor,keypad,keypadcolor) {

       var pallet= {
    "SelectFrame":"" ,
    "SelectFrameColor":"",
    "SelectScreen":"" ,
    "SelectScreenColor":"" ,
    "SelectKeypad":"" ,
    "SelectKeypadColor":"" 

   };
     pallet.SelectFrame = frame;
     pallet.SelectFrameColor = framecolor;
     pallet.SelectScreen = screen;
     pallet.SelectScreenColor = screencolor;
     pallet.SelectKeypad = keypad;
     pallet.SelectKeypadColor = keypadcolor;
     palletdata.push(pallet);
     console.log(palletdata);
   };

   

   

   


     $scope.SendOrder = function() {
   $scope.statusMsg = 'Sending data to server...';
   $http({
      url: 'http://localhost:2999/getPalletInfo', // IP address replaced with ##'s
      method: 'POST',
      data: palletdata,
      headers: {'Content-Type': 'application/json'}
      
  });
  }




////////////




});

   







