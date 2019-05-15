$(document).ready(function() {
  $(function() {
    initialize();

    osmConfig = new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return (
          "https://bpbd.jakarta.go.id/osm_tiles/" +
          zoom +
          "/" +
          coord.x +
          "/" +
          coord.y +
          ".png"
        );
      },
      tileSize: new google.maps.Size(256, 256),
      name: "Pintu Muka Air",
      maxZoom: 16
    });

    map.mapTypes.set("OSM", osmConfig);
    map.setCenter(new google.maps.LatLng(-6.266737, 106.859134));

    var marker = new Array();

    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "30";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "30";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "30";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "30";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "30";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "30";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "30";
    marker[0] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.63306, 106.83667),
      title: "Bendung Katulampa",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[0].title = "Bendung Katulampa";
    marker[0].tmaProp = tmaProp;
    marker[0].setMap(map);

    google.maps.event.addListener(marker[0], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "140";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "140";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "135";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "135";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "135";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "135";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "135";
    marker[1] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.42738, 106.81595),
      title: "Pos Depok",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[1].title = "Pos Depok";
    marker[1].tmaProp = tmaProp;
    marker[1].setMap(map);

    google.maps.event.addListener(marker[1], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA III";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "760";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA III";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "790";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA III";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "800";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA III";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "810";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA III";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "810";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA III";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "795";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA III";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "785";
    marker[2] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.20733, 106.84857),
      title: "PA Manggarai",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[2].title = "PA Manggarai";
    marker[2].tmaProp = tmaProp;
    marker[2].setMap(map);

    google.maps.event.addListener(marker[2], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "370";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "420";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "450";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA III";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "470";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA III";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "480";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA III";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "480";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA III";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "470";
    marker[3] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.19806, 106.81),
      title: "PA Karet",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[3].title = "PA Karet";
    marker[3].tmaProp = tmaProp;
    marker[3].setMap(map);

    google.maps.event.addListener(marker[3], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "100";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "100";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "90";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "90";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "90";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "80";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "80";
    marker[4] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.34435, 106.79903),
      title: "Pos Krukut Hulu",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[4].title = "Pos Krukut Hulu";
    marker[4].tmaProp = tmaProp;
    marker[4].setMap(map);

    google.maps.event.addListener(marker[4], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "125";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "125";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "125";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "125";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "115";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "110";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "100";
    marker[5] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.39718, 106.77233),
      title: "Pos Pesanggrahan",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[5].title = "Pos Pesanggrahan";
    marker[5].tmaProp = tmaProp;
    marker[5].setMap(map);

    google.maps.event.addListener(marker[5], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "150";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "140";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "140";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "140";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "135";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "135";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "130";
    marker[6] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.21833, 106.69427),
      title: "Pos Angke Hulu",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[6].title = "Pos Angke Hulu";
    marker[6].tmaProp = tmaProp;
    marker[6].setMap(map);

    google.maps.event.addListener(marker[6], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "-185";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "-190";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "-190";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "-190";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "-190";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "-190";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "-190";
    marker[7] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.11118, 106.7978),
      title: "Waduk Pluit",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[7].title = "Waduk Pluit";
    marker[7].tmaProp = tmaProp;
    marker[7].setMap(map);

    google.maps.event.addListener(marker[7], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA III";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "192";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA III";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "185";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA III";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "186";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA III";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "185";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA III";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "188";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA III";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "190";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA III";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "190";
    marker[8] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.12733, 106.80943),
      title: "Pasar Ikan",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[8].title = "Pasar Ikan";
    marker[8].tmaProp = tmaProp;
    marker[8].setMap(map);

    google.maps.event.addListener(marker[8], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "120";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "120";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "120";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "120";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "120";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "120";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "95";
    marker[9] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.3397, 106.87294),
      title: "Pos Cipinang Hulu",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[9].title = "Pos Cipinang Hulu";
    marker[9].tmaProp = tmaProp;
    marker[9].setMap(map);

    google.maps.event.addListener(marker[9], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "120";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "120";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "120";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "120";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "120";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "120";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "120";
    marker[10] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.31758, 106.92153),
      title: "Pos Sunter Hulu",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[10].title = "Pos Sunter Hulu";
    marker[10].tmaProp = tmaProp;
    marker[10].setMap(map);

    google.maps.event.addListener(marker[10], "click", showPintuAirInfo);
    var tmaProp = new Array();
    tmaProp[0] = new Object();
    tmaProp[0].status = "SIAGA IV";
    tmaProp[0].time = "00:00";
    tmaProp[0].level = "330";
    tmaProp[1] = new Object();
    tmaProp[1].status = "SIAGA IV";
    tmaProp[1].time = "01:00";
    tmaProp[1].level = "330";
    tmaProp[2] = new Object();
    tmaProp[2].status = "SIAGA IV";
    tmaProp[2].time = "02:00";
    tmaProp[2].level = "330";
    tmaProp[3] = new Object();
    tmaProp[3].status = "SIAGA IV";
    tmaProp[3].time = "03:00";
    tmaProp[3].level = "330";
    tmaProp[4] = new Object();
    tmaProp[4].status = "SIAGA IV";
    tmaProp[4].time = "04:00";
    tmaProp[4].level = "330";
    tmaProp[5] = new Object();
    tmaProp[5].status = "SIAGA IV";
    tmaProp[5].time = "05:00";
    tmaProp[5].level = "330";
    tmaProp[6] = new Object();
    tmaProp[6].status = "SIAGA IV";
    tmaProp[6].time = "06:00";
    tmaProp[6].level = "330";
    marker[11] = new google.maps.Marker({
      position: new google.maps.LatLng(-6.19056, 106.90417),
      title: "PA Pulo Gadung",
      icon: "../../assets/images/icon_lainnya.png"
    });
    marker[11].title = "PA Pulo Gadung";
    marker[11].tmaProp = tmaProp;
    marker[11].setMap(map);

    google.maps.event.addListener(marker[11], "click", showPintuAirInfo);
    drawOverlayRiver("");
  });
});
