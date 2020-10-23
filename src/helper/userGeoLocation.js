export const handleGeoPermission = () => {
    let userLocation = [];

    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            userLocation.push({ lat: lat}, {lng: lng});
          });
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(function (position) {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            userLocation.push({ lat: lat}, {lng: lng});
          });
        } else if (result.state === "denied") {
           userLocation = null;
        }
      });

      return userLocation;
  }