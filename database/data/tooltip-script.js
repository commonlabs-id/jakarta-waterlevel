$(document).ready(function() {
  $(function() {
    $("#datepicker-example1").Zebra_DatePicker({
      format: "d-m-Y",
      days: "Minggu Senin Selasa Rabu Kamis Jumat Sabtu".split(" ")
    });
    $(".table2")[0].scrollLeft = 3000;
    $("#chartContainer").highcharts({
      title: {
        text: "Grafik Tinggi Muka Air",
        x: -20 //center
      },
      subtitle: {
        text: "BPBD Provinsi DKI Jakarta",
        x: -20
      },
      xAxis: {
        categories: [
          "00:00",
          "01:00",
          "02:00",
          "03:00",
          "04:00",
          "05:00",
          "06:00",
          "07:00"
        ]
      },
      yAxis: {
        title: {
          text: "Ketinggian (Cm)"
        },
        plotLines: [
          {
            value: 0,
            width: 1,
            color: "#808080"
          }
        ]
      },
      tooltip: {
        valueSuffix: "Cm"
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        borderWidth: 1
      },
      series: [
        { name: "Bendung Katulampa", data: [30, 30, 30, 30, 30, 30, 30, 30] },
        { name: "Pos Depok", data: [140, 140, 135, 135, 135, 135, 135, 135] },
        {
          name: "PA Manggarai",
          data: [760, 790, 800, 810, 810, 795, 785, 755]
        },
        { name: "PA Karet", data: [370, 420, 450, 470, 480, 480, 470, 460] },
        { name: "Pos Krukut Hulu", data: [100, 100, 90, 90, 90, 80, 80, 70] },
        {
          name: "Pos Pesanggrahan",
          data: [125, 125, 125, 125, 115, 110, 100, 96]
        },
        {
          name: "Pos Angke Hulu",
          data: [150, 140, 140, 140, 135, 135, 130, 130]
        },
        {
          name: "Waduk Pluit",
          data: [-185, -190, -190, -190, -190, -190, -190, -190]
        },
        { name: "Pasar Ikan", data: [192, 185, 186, 185, 188, 190, 190, 193] },
        {
          name: "Pos Cipinang Hulu",
          data: [120, 120, 120, 120, 120, 120, 95, 95]
        },
        {
          name: "Pos Sunter Hulu",
          data: [120, 120, 120, 120, 120, 120, 120, 120]
        },
        {
          name: "PA Pulo Gadung",
          data: [330, 330, 330, 330, 330, 330, 330, 330]
        }
      ]
    });
  });

  // set the wrapper width and height to match the img size
  $("#wrapper").css({
    width: $("#wrapper div").width(),
    height: $("#wrapper div").height()
  });
  //
  //        //tooltip direction
  //        var tooltipDirection;
  //
  //        for (i=0; i<$(".pin").length; i++)
  //        {
  //            // set tooltip direction type - up or down
  //            if ($(".pin").eq(i).hasClass('pin-down')) {
  //                tooltipDirection = 'tooltip-down';
  //            } else {
  //                tooltipDirection = 'tooltip-up';
  //            }
  //
  //            // append the tooltip
  //            $("#wrapper").append("<div style='left:"+$(".pin").eq(i).data('xpos')+"px;top:"+$(".pin").eq(i).data('ypos')+"px' class='" + tooltipDirection +"'>\
  //                                                                                                        <div class='tooltip'>//" + $(".pin").eq(i).html() + "</div>\
  //                                                                                        </div>//");
  //        }
  //
  //        // show/hide the tooltip
  //        $('.tooltip-up, .tooltip-down').mouseenter(function(){
  //            $(this).children('.tooltip').fadeIn(100);
  //        }).mouseleave(function(){
  //            $(this).children('.tooltip').fadeOut(100);
  //        })
});

function refresh() {
  with (waterlevelform) {
    submit();
  }
}

function getOverlayRiver(url) {
  var mapquery = "";
  mapquery += '{"name":"Just overlay","ids": [ id:all ]}';

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //console.log(xmlhttp.responseText);
      drawOverlayRiver(xmlhttp.responseText);
    }
  };

  xmlhttp.open("GET", url, true);

  xmlhttp.send(mapquery);
}

function showRiverInfo(event) {
  var contentString =
    "<div>\n\
              <h2>" +
    this.name +
    " (Siaga " +
    this.status +
    ")</h2><hr>\n\
              <p>Ketinggian: " +
    this.depth +
    "</p>\n\
           </div>";

  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}

function showPintuAirInfo(event) {
  var contentString =
    '<div style="width: 150px;">\n\
              <h2>' +
    this.title +
    '</h2><hr>\n\
              <table width="100%" border="0" cellspacing="0" cellpadding="2">\n\
                  <colgroup>\n\
                      <col width="35%">\n\
                      <col width="20%">\n\
                      <col width="45%">\n\
                  </colgroup>';

  var tmaProp = this.tmaProp;

  for (var i = 0; i < tmaProp.length; i++) {
    contentString += "<tr>";
    contentString += "<td><b>" + tmaProp[i].time + "</b></td>";
    contentString += "<td>" + tmaProp[i].level + "</td>";
    contentString += "<td><b>" + tmaProp[i].status + "</b></td>";
    contentString += "</tr>";
  }

  contentString += "</table>\n\
           </div>";

  var latlong = event.latLng;

  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}
