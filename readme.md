1. start web server in folder `python -m SimpleHTTPServer 8000`

2. create new HTML file

3. type `!` `tab` to get emmet expand

4. paste in `<script src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js"></script>`

5. paste in div `<div id="map"></div>`

6. create a new file called `script.js`

7. in html paste `<script src="script.js"></script>`

8. in JS file paste  
  ```js
  mapkit.init({
    authorizationCallback: function (done) {
        done('JWT');
    }
  });
  ```

9. paste `var map = new mapkit.Map("map");`

10. paste in my JWT 
  ```js
  eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IllRM1VOMjU1NkgifQ.eyJpc3MiOiJDQzNLQUE0RlA4IiwiaWF0IjoxNTI5NDcyODU3LCJleHAiOjE1NTYyNTY4NTd9.8s-TpNVnCeV7OtMpoON74Na58-bxv9tgq9Jz_Dej9xLK3v1eC0hTxlVQKt0kQPLb2WmLga4VfNXXemKoahNBbQ
  ```

11. One last thing before testing this
   ```css
   <style>
     #map {
         width: 100vw;
         height: 100vh;
     }
     body {
         margin: 0;
         padding: 0;
     }
    </style>
   ```

12. Delete line `var map = new mapkit.Map("map");`

13. paste in coordinate info: (`CoordinateSpan` is measured in degrees of lat/long)

   ```js
   var region = new mapkit.CoordinateRegion(
     new mapkit.Coordinate(-33.867012, 151.206529),
     new mapkit.CoordinateSpan(0.1, 0.1)
   );
   ```

14. paste in:
   ```js
   var map = new mapkit.Map("map", {
         center: new mapkit.Coordinate(-33.867012, 151.206529),
         region: region,
         showsUserLocation: true,
         showsUserLocationControl: true
    });
   ```

15. declare a callback for the geojson:
   ```js
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
     },
     geoJSONDidComplete: function(result, geoJSON) {
         console.log('GeoJSONDelegate.geoJSONDidComplete');
         console.log(result);
         console.log(geoJSON);
     },
     geoJSONDidError: function(error, geoJSON) {
         console.log('GeoJSONDelegate.geoJSONDidError');
         console.log(error);
         console.log(geoJSON);
     }
   };
   ```

16. import the geojson `mapkit.importGeoJSON("city2surf.geojson", geoJSONParserDelegate);`

17. finally add a point:
   ```js
   var pointA = new mapkit.MarkerAnnotation(new mapkit.Coordinate(-33.867012, 151.206529), {
     draggable: true,
     selected: true,
     title: "Sydney Cocoaheads",
     color: '#1ecf1a'
   });
   map.addAnnotations([pointA]);
   ```









-----

compare that to google maps which gives us 100k instantiations for free *per month*

