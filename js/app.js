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

const interpolators = {
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

const FPS = 30;
let currentDevice = 'desktop';
const getCurDevice = () => currentDevice;
let interpolatorCurrent = null;
const getCurInterpolator = () => interpolatorCurrent;


const outline = document.getElementById("outline");
let outputOuter = document.getElementById("outer");

const createButton = ({name, fps = FPS}) => {
  let btn = document.createElement("button");
  btn.innerHTML = name;
  btn.addEventListener("click", () => {
    // handler(fps);
    const interpolator = interpolators[currentDevice][name];
    currentDevice = name;
    startAnimating({fps, interpolator});

    if (currentDevice === 'headset') {
      outline.style.opacity = '1';
    } else {
      outline.style.opacity = '0';
    }

  })
  document.body.appendChild(btn);

}
// var interpolator = flubber.interpolate(contours.headset.outer, contours.desktop.outer, {maxSegmentLength: 10});
// var interpolator = interpolators.headset.desktop;

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

function startAnimating({fps, interpolator}) {
  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  interpolatorCurrent = interpolator;
  start = null;
  stop = false;
  animate();
}

function animate(newtime) {
  if (stop || !interpolatorCurrent) {
    return;
  }

  requestAnimationFrame(animate);

  now = newtime;
  elapsed = now - then;

  if (elapsed > fpsInterval) {

    then = now - (elapsed % fpsInterval);

    if (!start) start = newtime;
    const progress = Math.min((newtime - start) / duration, 1);
    outputOuter.setAttribute("d", interpolatorCurrent(progress));
    if (progress >= 1) {
      stop = true;
    }

    // TESTING...Report #seconds since start and achieved fps.
    var sinceStart = now - startTime;
    var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
    $results.innerHTML = "Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.";

  }
}

init({contours})
