mapkit.init({
    authorizationCallback: function (done) {
        done('eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllRM1VOMjU1NkgifQ.eyJpc3MiOiJDQzNLQUE0RlA4IiwiaWF0IjoxNTI5NDcyODU3LCJleHAiOjE1NTYyNTY4NTd9.8s-TpNVnCeV7OtMpoON74Na58-bxv9tgq9Jz_Dej9xLK3v1eC0hTxlVQKt0kQPLb2WmLga4VfNXXemKoahNBbQ');
    }
});

var region = new mapkit.CoordinateRegion(
    new mapkit.Coordinate(-33.867012, 151.206529),
    new mapkit.CoordinateSpan(0.1, 0.1)
);

var map = new mapkit.Map("map", {
    center: new mapkit.Coordinate(-33.867012, 151.206529),
    region: region,
    showsUserLocation: true,
    showsUserLocationControl: true
});

var geoJSONParserDelegate = {
    itemForLineString: function(overlay, json) {
        overlay.style = new mapkit.Style({
            strokeColor: "#0000FF",
            strokeOpacity: 1,
            lineWidth: 2,
            fillOpacity: 1,
            fillColor: '#0000FF',
        });
        map.addOverlay(overlay);
        return overlay;
    }
};

mapkit.importGeoJSON("city2surf.geojson", geoJSONParserDelegate);

var pointA = new mapkit.MarkerAnnotation(new mapkit.Coordinate(-33.867012, 151.206529), {
    draggable: true,
    selected: true,
    title: "Drag Me",
    color: '#9966cc'
});
map.addAnnotations([pointA]);
