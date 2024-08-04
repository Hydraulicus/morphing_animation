class MorphAnimation {
  constructor({
                contours,
                contoursSize = {width: 1920, height: 1080},
                strokeStyle= 'rgb(155, 82, 250)',
                lineWidth = 3,
                FPS = 30,
                duration = 500,
                currentDevice = 'headset',
                autoChangeTime = 4000,

  }) {
    this.contours = contours;
    this.contoursSize = contoursSize;
    this.strokeStyle = strokeStyle;
    this.lineWidth = lineWidth;
    this.FPS = FPS;
    this.duration = duration;
    this.currentDevice = currentDevice;
    this.autoChangeTime = autoChangeTime;

    this.interpolatorsOuter = {
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
    };
    this.interpolatorsInner = {
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
    };
    this.interpolatorOuterCurrent = flubber.interpolate(contours[this.currentDevice].outer, contours[this.currentDevice].outer, {maxSegmentLength: 10});
    this.interpolatorInnerCurrent = flubber.interpolate(contours[this.currentDevice].inner, contours[this.currentDevice].inner, {maxSegmentLength: 10});

    this.iOSSafari =  isSafari();

    this.outline = document.getElementById("outline");
    this.outputOuter = document.getElementById("outer");
    this.outputInner = document.getElementById("inner");

    this.maskSVG = document.getElementById("mask")
    this.getMaskSVG = () => this.maskSVG;
    this.serializer = new XMLSerializer();
    this.maskImage = document.createElement('img');

    this.video = null;
    this.videoAspectRatio = null;

    this.stop = false;
    this.startTime = null
    this.now = null
    this.then = null
    this.elapsed = null

    this.start = null;
    this.fpsInterval = 1000 / FPS;
    this.requestAnimationFramePointer = null;

    this.init = this.init.bind(this);
    this.createButton = this.createButton.bind(this);
    this.setVideoAspectRatio = this.setVideoAspectRatio.bind(this);
    this.getVideoAspectRatio = this.getVideoAspectRatio.bind(this);
    this.startAnimating = this.startAnimating.bind(this);
    this.autoChangeDevice = this.autoChangeDevice.bind(this);
    this.changeDevice = this.changeDevice.bind(this);
    this.main = this.main.bind(this);
  }

  setVideoAspectRatio (videoAspectRatio) { this.videoAspectRatio = videoAspectRatio}
  getVideoAspectRatio () { return this.videoAspectRatio}

  changeDevice ({btn, name}) {
    const interpolatorOuter = this.interpolatorsOuter[this.currentDevice][name];
    const interpolatorInner = this.interpolatorsInner[this.currentDevice][name];
    if (name !== this.currentDevice) {
      document.getElementById(this.currentDevice).classList.remove('active');
      this.currentDevice = name;
      btn.classList.add('active');
      this.startAnimating({interpolatorOuter: interpolatorOuter, interpolatorInner: interpolatorInner});
    }

    if (this.currentDevice === 'headset') {
      this.outline.style.opacity = '1';
      this.outline.style.transform = 'scale(1)';
    } else {
      this.outline.style.opacity = '0';
      this.outline.style.transform = 'scale(1.2)';
      this.outline.style.transformOrigin = '50% 50%';
    }
  }


  autoChangeDevice () {
    if (this.autoChangeTime && this.autoChangeTime > 0) {

      const arr = Object.keys(this.contours);

      setInterval(() => {
        const newDev = nextDevice({arr, currentItem: this.currentDevice});
        this.changeDevice({btn: document.getElementById(newDev), name: newDev})
      }, this.autoChangeTime)

    }
  }

  createButton ({name, fps = this.FPS}) {
    let btn = document.getElementById(name);
    btn.addEventListener("click", () => {
      this.changeDevice({btn, name})
    })
  }

  async init () {
    this.outputInner.setAttribute("d", this.contours[this.currentDevice].inner);
    this.outputOuter.setAttribute("d", this.contours[this.currentDevice].outer);
    Object.keys(this.contours).forEach(name => {
      this.createButton({name})
    })
    if (this.currentDevice) {
      document.getElementById(this.currentDevice).classList.add('active');
    }
    this.outline.setAttribute("d", this.contours.headset.outline);

    this.video = document.createElement('video');
    this.video.muted = true;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.playsinline = true;
    this.video.poster = "img/background.jpg";

    const source1 = document.createElement("source");
    source1.setAttribute("src",
      "img/video.webm");
    source1.setAttribute("type", "video/webm");
    this.video.appendChild(source1);

    const source2 = document.createElement("source");
    source2.setAttribute("src",
      "img/video.mp4");
    source2.setAttribute("type", "video/mp4");
    this.video.appendChild(source2);

    if (!this.iOSSafari) {
      this.maskImage.src = URL.createObjectURL(new Blob([this.serializer.serializeToString(this.getMaskSVG())], {type: 'image/svg+xml'}));
      await Promise.all([
        this.video.play(),
        new Promise((resolve) => this.maskImage.addEventListener('load', resolve, {once: true})),
      ]);
    }

    this.setVideoAspectRatio(this.video.videoWidth / this.video.videoHeight);

    this.autoChangeDevice()

    return new Promise((resolve) => resolve());
  }

  startAnimating({interpolatorOuter, interpolatorInner}) {
    this.then = window.performance.now();
    this.startTime = this.then;
    this.interpolatorOuterCurrent = interpolatorOuter;
    this.interpolatorInnerCurrent = interpolatorInner;
    this.start = null;
    this.stop = false;
  }

  main() {
    const parent = document.getElementById("outputWrapper");
    const canvas = document.getElementById('theCanvas');
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    const canvasContext = canvas.getContext('2d');
    const canvasAspectRatio = canvas.width / canvas.height;

    const videoAspectRatio = this.getVideoAspectRatio();

    const [frameWidth, frameHeight] =
      canvasAspectRatio <= videoAspectRatio
        ? [canvas.height * videoAspectRatio, canvas.height]
        : [canvas.width, canvas.width / this.videoAspectRatio];

    const [frameTop, frameLeft] = [(canvas.height - frameHeight) / 2, (canvas.width - frameWidth) / 2];

    const maskAspectRatio = this.maskImage.naturalWidth / this.maskImage.naturalHeight;

    const [maskWidth, maskHeight] =
      canvasAspectRatio <= maskAspectRatio
        ? [canvas.width, canvas.width / maskAspectRatio]
        : [canvas.height * maskAspectRatio, canvas.height];

    const [maskTop, maskLeft] = [(canvas.height - maskHeight) / 2, (canvas.width - maskWidth) / 2];

    const maskScale = Math.min(canvas.width / (this.contoursSize.width + this.lineWidth), canvas.height / (this.contoursSize.height + this.lineWidth));
    canvasContext.strokeStyle = this.strokeStyle;
    canvasContext.lineWidth = this.lineWidth;

    // this.requestAnimationFramePointer = requestAnimationFrame(function frame(newtime) {
    this.requestAnimationFramePointer = requestAnimationFrame(function  frame (newtime) {
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      canvasContext.globalCompositeOperation = 'destination-over';
      this.now = newtime;
      this.elapsed = this.now - this.then;

      if (!this.start) { this.start = newtime; }
      const progress = Math.min((newtime - this.start) / this.duration, 1);
      if (this.elapsed > this.fpsInterval) {
        this.then = this.now - (this.elapsed % this.fpsInterval);
        this.outputOuter.setAttribute("d", this.interpolatorOuterCurrent(progress));
        this.outputInner.setAttribute("d", this.interpolatorInnerCurrent(progress));
        if (progress >= 1) {
          this.stop = true;
        }
      }

      const path = (this.interpolatorInnerCurrent)
        ? new Path2D(this.interpolatorInnerCurrent(progress))
        : new Path2D(contours[this.currentDevice].inner);

      if (!this.iOSSafari) {
        canvasContext.setTransform(maskScale, 0, 0, maskScale, this.lineWidth * maskScale, this.lineWidth * maskScale); // Reset current transformation matrix to the identity matrix
        canvasContext.fill(path);
        canvasContext.setTransform(1, 0, 0, 1, 0, 0); // Reset current transformation matrix to the identity matrix
        canvasContext.globalCompositeOperation = 'source-in';
        canvasContext.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight, frameLeft, frameTop, frameWidth, frameHeight);
      }

      /** draw inner outline  */
      canvasContext.globalCompositeOperation = 'source-over';
      canvasContext.setTransform(maskScale, 0, 0, maskScale, this.lineWidth * maskScale, this.lineWidth * maskScale); // Reset current transformation matrix to the identity matrix
      canvasContext.stroke(path)
      canvasContext.setTransform(1, 0, 0, 1, 0, 0); // Reset current transformation matrix to the identity matrix

      this.requestAnimationFramePointer = requestAnimationFrame(frame.bind(this));
    }.bind(this));
  }
}

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

const morphAnimation = new MorphAnimation({
  contours,
});

window.addEventListener('resize', function (event) {
  cancelAnimationFrame(morphAnimation.requestAnimationFramePointer);
  morphAnimation.main();
});

morphAnimation.init({contours}).then(morphAnimation.main)
