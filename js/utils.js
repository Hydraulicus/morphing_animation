const isSafari = () => {
  const ua = window.navigator.userAgent;
  const iOS = ua.match(/Macintosh/i) || ua.match(/iPad/i) || ua.match(/iPhone/i);
  const webkit = ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i) && !ua.match(/EdgiOS/i) && !ua.match(/Chrome/i) && !ua.match(/Edg/i);

  return iOSSafari
}

const nextDevice = ({arr, currentItem}) => arr[(arr.indexOf(currentItem)+1) % arr.length];
