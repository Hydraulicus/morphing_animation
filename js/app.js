const contours = {
  headset: {
    outline: "M1710.2,184.9c85.6,46.4,171.2,127.7,188.8,286.9,25.8,234.1-73,497.9-291.9,545-180.7,38.9-327-1.1-427.1-103.8-115.5-118.6-308.6-121.6-438.8,0-104.8,97.9-246.4,142.7-427.1,103.8C95.1,969.7-3.7,705.9,22.2,471.8c17.6-159.2,106.3-235.1,188.8-286.9,300.2-188.8,1145.3-191.8,1499.2,0Z",
    outer: "M1686.3,191.8c82.9,44.9,165.8,127.8,182.8,282,25,226.6-70.6,480.5-282.6,526.2-174.9,37.7-316.6-4.1-413.5-103.6-111.8-114.8-298.8-117.7-424.8,0-101.5,94.8-238.6,141.3-413.5,103.6C122.7,954.3,27,700.4,52.1,473.7c17-154.2,102.9-231.8,182.8-282,290.6-182.8,1108.9-185.7,1451.5,0Z",
    inner: "M1660.1,213.7c79.9,43.3,159.8,113.6,176.2,262.1,24.1,218.4-68.1,449.7-272.3,493.6-168.6,36.3-305.2.8-398.6-95-107.8-110.6-288-113.5-409.5,0-97.8,91.4-230,131.3-398.6,95-204.3-44-296.5-275.2-272.3-493.6,16.4-148.6,99.2-213.7,176.2-262.1,280.1-176.2,1068.8-179,1399,0Z"
  },
  desktop: {
    outer: "M81.7,19.1h1756.5c7.3,0,12.2,6.2,12.2,12.2v1018.5c0,6.1-5,12.2-12.2,12.2H81.7c-6.8,0-12.2-5.7-12.2-12.2V31.2c0-6.6,5-12.2,12.2-12.2Z",
    inner: "M91.3,33.6h1737.5c5.5,0,8.2,3.2,8.2,8.2v998.4c0,5.3-2.6,8.2-8.2,8.2H91.3c-5.1,0-8.2-3.2-8.2-8.2V41.8c0-4.8,2.6-8.2,8.2-8.2Z"
  },
  tablet: {
    outer: "M251.7,19h1416.6c15.7,0,26.1,13.2,26.1,26.1v989.8c0,13.1-10.8,26.1-26.1,26.1H251.7c-14.7,0-26.1-12.2-26.1-26.1V45.1c0-14.1,10.8-26.1,26.1-26.1Z",
    inner: "M261.4,50.2h1397.2c11.9,0,17.6,7,17.6,17.6v957.4c0,11.3-5.5,17.6-17.6,17.6H261.4c-10.9,0-17.6-6.9-17.6-17.6V67.8c0-10.3,5.5-17.6,17.6-17.6Z"
  },
  mobile: {
    outer: "M688.7,14h542.6c15.7,0,26.1,13.2,26.1,26.1v999.8c0,13.1-10.8,26.1-26.1,26.1h-542.6c-14.7,0-26.1-12.2-26.1-26.1V40.1c0-14.1,10.8-26.1,26.1-26.1Z",
    inner: "M710.4,44.2h499.2c11.9,0,17.6,7,17.6,17.6v937.4c0,11.3-5.5,17.6-17.6,17.6h-499.2c-10.9,0-17.6-6.9-17.6-17.6V61.8c0-10.3,5.5-17.6,17.6-17.6Z"
  }
}

const interpolatorsOuter = {
  headset: {
    desktop: flubber.interpolate(contours.headset.outer, contours.desktop.outer, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.headset.outer, contours.tablet.outer, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.headset.outer, contours.mobile.outer, {maxSegmentLength: 10})
  },
  desktop: {
    headset: flubber.interpolate(contours.desktop.outer, contours.headset.outer, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.desktop.outer, contours.tablet.outer, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.desktop.outer, contours.mobile.outer, {maxSegmentLength: 10})
  },
  tablet: {
    headset: flubber.interpolate(contours.tablet.outer, contours.headset.outer, {maxSegmentLength: 10}),
    desktop: flubber.interpolate(contours.tablet.outer, contours.desktop.outer, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.tablet.outer, contours.mobile.outer, {maxSegmentLength: 10})
  },
  mobile: {
    headset: flubber.interpolate(contours.mobile.outer, contours.headset.outer, {maxSegmentLength: 10}),
    desktop: flubber.interpolate(contours.mobile.outer, contours.desktop.outer, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.mobile.outer, contours.tablet.outer, {maxSegmentLength: 10})
  },
}
const interpolatorsInner = {
  headset: {
    desktop: flubber.interpolate(contours.headset.inner, contours.desktop.inner, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.headset.inner, contours.tablet.inner, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.headset.inner, contours.mobile.inner, {maxSegmentLength: 10})
  },
  desktop: {
    headset: flubber.interpolate(contours.desktop.inner, contours.headset.inner, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.desktop.inner, contours.tablet.inner, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.desktop.inner, contours.mobile.inner, {maxSegmentLength: 10})
  },
  tablet: {
    headset: flubber.interpolate(contours.tablet.inner, contours.headset.inner, {maxSegmentLength: 10}),
    desktop: flubber.interpolate(contours.tablet.inner, contours.desktop.inner, {maxSegmentLength: 10}),
    mobile: flubber.interpolate(contours.tablet.inner, contours.mobile.inner, {maxSegmentLength: 10})
  },
  mobile: {
    headset: flubber.interpolate(contours.mobile.inner, contours.headset.inner, {maxSegmentLength: 10}),
    desktop: flubber.interpolate(contours.mobile.inner, contours.desktop.inner, {maxSegmentLength: 10}),
    tablet: flubber.interpolate(contours.mobile.inner, contours.tablet.inner, {maxSegmentLength: 10})
  },
}

const FPS = 30;
let currentDevice = 'desktop';
const getCurDevice = () => currentDevice;
let interpolatorInnerCurrent = null;
let interpolatorOuterCurrent = null;
const getCurInterpolator = () => interpolatorOuterCurrent;


const outline = document.getElementById("outline");
let outputOuter = document.getElementById("outer");
let outputInner = document.getElementById("inner");

const createButton = ({name, fps = FPS}) => {
  let btn = document.createElement("button");
  btn.innerHTML = name;
  btn.addEventListener("click", () => {
    const interpolatorOuter = interpolatorsOuter[currentDevice][name];
    const interpolatorInner = interpolatorsInner[currentDevice][name];
    currentDevice = name;
    startAnimating({fps, interpolatorOuter: interpolatorOuter, interpolatorInner: interpolatorInner});

    if (currentDevice === 'headset') {
      outline.style.opacity = '1';
    } else {
      outline.style.opacity = '0';
    }

  })
  document.getElementById("buttons").appendChild(btn);
}

const init = ({contours}) => {
  outputOuter.setAttribute("d", contours[currentDevice].outer);
   Object.keys(contours).forEach(name => {
     createButton({name})
   })
   outline.setAttribute("d", contours.headset.outline);
   outline.style.opacity = '0.25';
}





let lastTimestamp = 0;

var stop = false;
var frameCount = 0;
var $results = document.getElementById("results");
var fpsInterval, startTime, now, then, elapsed;
let start = null;
let duration = 500;

function startAnimating({fps, interpolatorOuter, interpolatorInner}) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  interpolatorOuterCurrent = interpolatorOuter;
  interpolatorInnerCurrent = interpolatorInner;
  start = null;
  stop = false;
  animate();
}

function animate(newtime) {
  if (stop || !interpolatorOuterCurrent || !interpolatorInnerCurrent) {
    return;
  }

  requestAnimationFrame(animate);

  now = newtime;
  elapsed = now - then;

  if (elapsed > fpsInterval) {

    then = now - (elapsed % fpsInterval);

    if (!start) start = newtime;
    const progress = Math.min((newtime - start) / duration, 1);
    outputOuter.setAttribute("d", interpolatorOuterCurrent(progress));
    outputInner.setAttribute("d", interpolatorInnerCurrent(progress));
    if (progress >= 1) {
      stop = true;
    }

    // TESTING...Report #seconds since start and achieved fps.
    var sinceStart = now - startTime;
    var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
    $results.innerHTML = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.";

  }
}

async function main() {
  const canvas = document.querySelector('canvas');
  const canvasContext = canvas.getContext('2d');
  const canvasAspectRatio = canvas.width / canvas.height;

  const video = document.createElement('video');
  video.muted = true;
  video.autoplay = true;
  video.loop = true;
  video.playsinline = true;
  video.src = "img/video.webm";

  const maskSVG = document.getElementById("mask")
  const maskImage = document.createElement('img');
  const XML = new XMLSerializer().serializeToString(maskSVG);

  const SVG64 = btoa(XML);


  maskImage.src = URL.createObjectURL(new Blob([XML], {type: 'image/svg+xml'}));



  // maskImage.src = URL.createObjectURL(new Blob([`<svg xmlns="http://www.w3.org/2000/svg" width="432" height="432"><path fill="#fff" d="M364 318l35 4-21-29-24-2-4-2 19-5a4 4 0 00-2-9l-27 7-33-19 7-2 24 14a4 4 0 104-7l-16-10 4-1 24 4 28-22-35-6-20 16-3 1 9-17a4 4 0 10-7-4l-14 24-16 4-64-37h33l20 20a4 4 0 106-6l-14-14h4l23 10 32-14-32-14-23 10h-4l14-14a4 4 0 10-6-6l-20 20h-33l64-37 16 4 14 24a4 4 0 107-4l-9-17 3 1 20 16 35-6-28-22-24 4-4-1 16-10a4 4 0 00-4-7l-24 13-7-1 33-19 27 7a4 4 0 102-9l-19-5 4-2 24-2 21-29-35 4-15 20-3 2 5-18a4 4 0 10-8-3l-8 27-32 19 1-7 24-14a4 4 0 00-4-8l-16 10 1-4 15-19-5-35-23 28 4 24-1 4-9-17a4 4 0 10-8 5l14 24-4 15-64 37 16-28 27-7a4 4 0 00-2-9l-19 5 2-3 20-15 4-35-29 21-2 24-2 4-5-19a4 4 0 10-8 3l7 26-17 29v-74l12-12h27a4 4 0 000-8h-19l3-3 23-9 13-33-33 13-9 23-3 3V81a4 4 0 10-8 0v27l-6 6V76l20-20a4 4 0 10-6-6l-14 13v-4l10-22-14-33-14 33 10 22v4l-14-13a4 4 0 10-6 6l20 20v38l-6-6V81a4 4 0 00-8 0v19l-3-3-9-23-33-13 13 33 23 9 3 3h-19a4 4 0 000 8h27l12 12v74l-17-29 7-26a4 4 0 00-8-3l-5 19-2-4-2-24-29-21 4 35 20 15 2 3-19-5a4 4 0 10-2 9l27 7 16 28-64-37-4-15 14-24a4 4 0 00-8-5l-9 17-1-4 4-24-23-28-5 35 15 19 1 4-16-10a4 4 0 10-4 8l24 14 1 7-32-19-8-27a4 4 0 10-8 3l5 18-3-2-15-20-35-4 21 29 24 2 4 2-19 5a4 4 0 002 9l27-7 33 19-7 1-24-13a4 4 0 10-4 7l16 10-4 1-24-4-28 22 35 6 20-16 3-1-9 17a4 4 0 107 4l14-24 16-4 64 37h-33l-20-20a4 4 0 10-6 6l14 14h-4l-23-10-32 14 32 14 23-10h4l-14 14a4 4 0 106 6l20-20h33l-64 37-16-4-14-24a4 4 0 00-7 4l9 17-3-1-20-16-35 6 28 22 24-4 4 1-16 10a4 4 0 004 7l24-14 7 2-33 19-27-7a4 4 0 00-2 9l19 5-4 2-24 2-21 29 35-4 15-20 3-2-5 18a4 4 0 008 3l8-27 32-19-1 7-24 14a4 4 0 004 8l16-10-1 4-15 19 5 35 23-28-4-24 1-4 9 17a4 4 0 008-5l-14-24 4-15 64-37-16 28-27 7a4 4 0 102 9l19-5-2 3-20 15-4 35 29-21 2-24 2-4 5 19a4 4 0 108-3l-7-26 17-29v74l-12 12h-27a4 4 0 100 8h19l-3 3-23 9-13 33 33-13 9-23 3-3v19a4 4 0 008 0v-27l6-6v38l-20 20a4 4 0 006 6l14-13v4l-10 22 14 33 14-33-10-22v-4l14 13a4 4 0 006-6l-20-20v-38l6 6v27a4 4 0 008 0v-19l3 3 9 23 33 13-13-33-23-9-3-3h19a4 4 0 000-8h-27l-12-12v-74l17 29-7 26a4 4 0 008 3l5-19 2 4 2 24 29 21-4-35-20-15-2-3 19 5a4 4 0 102-9l-27-7-16-28 64 37 4 15-14 24a4 4 0 108 5l9-17 1 4-4 24 23 28 5-35-15-19-1-4 16 10a4 4 0 004-8l-24-14-1-7 32 19 8 27a4 4 0 108-3l-5-18 3 2 15 20z"/></svg>`], {type: 'image/svg+xml'}));
  //
  // console.log(' maskSVG=',  typeof maskSVG, maskSVG)
  // console.log('maskImage=', typeof maskImage, maskImage)

  await Promise.all([
    video.play(),
    new Promise((resolve) => maskImage.addEventListener('load', resolve, {once: true})),
  ]);

  const videoAspectRatio = video.videoWidth / video.videoHeight;

  const [frameWidth, frameHeight] =
    canvasAspectRatio <= videoAspectRatio
      ? [canvas.height * videoAspectRatio, canvas.height]
      : [canvas.width, canvas.width / videoAspectRatio];

  const [frameTop, frameLeft] = [(canvas.height - frameHeight) / 2, (canvas.width - frameWidth) / 2];

  const maskAspectRatio = maskImage.naturalWidth / maskImage.naturalHeight;

  const [maskWidth, maskHeight] =
    canvasAspectRatio <= maskAspectRatio
      ? [canvas.width, canvas.width / maskAspectRatio]
      : [canvas.height * maskAspectRatio, canvas.height];

  const [maskTop, maskLeft] = [(canvas.height - maskHeight) / 2, (canvas.width - maskWidth) / 2];

  requestAnimationFrame(function frame() {
    canvasContext.globalCompositeOperation = 'destination-over';
    canvasContext.drawImage(maskImage, maskLeft, maskTop, maskWidth, maskHeight);

    canvasContext.globalCompositeOperation = 'source-in';
    canvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, frameLeft, frameTop, frameWidth, frameHeight);

    requestAnimationFrame(frame);
  });
}

init({contours})
setTimeout(() => main(), 1200)
