const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images[key] = r(key)));
}

importAll(require.context('./', false, /\.jpg$/));

export default images;