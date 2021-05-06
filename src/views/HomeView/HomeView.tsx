/** @jsxRuntime classic */
// @jsx jsx
import { jsx } from "theme-ui";
import Canvas from "../../components/Canvas";
import Page from "../../components/Page";
import { drawImageProp, truncateColor } from "../../helpers/canvasHelpers";
import john from "../../assets/img/creation-of-john-small.png";
import { useEffect, useRef, useState } from "react";
import { Flex, Heading } from "@theme-ui/components";
import { absDefault } from "../../helpers/styles";

const HomeView: React.FC = () => {
  const imgRef = useRef(new Image());
  const heroRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    imgRef.current.src = john;
    imgRef.current.addEventListener("load", () => {
      setImageLoaded(true);
    });
    window.addEventListener("mousemove", setMousePosition);
    return () => {
      window.removeEventListener("mousemove", setMousePosition);
    };
  }, []);

  const setMousePosition = (e: MouseEvent) => {
    mousePos.current = { x: e.x, y: e.y };
  };

  const setupCanvas = (ctx: CanvasRenderingContext2D) => {
    let brightnessPixel: number[][][] = [];
    const canvas = ctx.canvas;
    let animateRequest: number;
    let timeoutId: NodeJS.Timeout;
    let particlesArray: Particle[] = [];
    const nrOfParticles = 3000;
    let showLog = true;

    const resizeImageData = () => {
      window.cancelAnimationFrame(animateRequest);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        imageSetup(0, 100);
        animateRequest = window.requestAnimationFrame(animate);
      }, 300);
    };
    window.addEventListener("resize", resizeImageData);

    class Particle {
      x: number;
      y: number;
      speed: number;
      velocity: number;
      size: number;
      mouseDelta: number | undefined;
      angle: number;
      constructor() {
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.x = Math.random() * canvas.width;
        this.y = canvas.height - 1;
        this.speed = 0;
        this.velocity = Math.random() * 3 + 0.5;
        this.size = Math.random() * (canvas.width / 500) + canvas.width / 1000;
        this.mouseDelta = undefined;
        this.angle = Math.random() * 360;
      }
      update() {
        const row = Math.floor(this.y);
        const col = Math.floor(this.x);
        if (brightnessPixel[row] && brightnessPixel[row][col] !== undefined) {
          this.speed = ((255 - brightnessPixel[row][col][3]) / 255) * 1.5 + 2;
        } else if (showLog) {
          console.log(brightnessPixel, row, col);
          showLog = false;
        }

        this.angle += 2;
        const angleRad = (this.angle * Math.PI) / 180;

        this.y += -this.speed;
        this.x += Math.cos(angleRad);

        if (this.y <= 0) {
          this.y = canvas.height - 1;
          this.x = Math.random() * canvas.width;
        }
        // if (this.x >= canvas.width) {
        //   this.x = 0;
        //   this.y = Math.random() * canvas.height;
        // }
      }
      draw() {
        ctx.beginPath();
        const row = Math.floor(this.y);
        const col = Math.floor(this.x);
        if (brightnessPixel[row] && brightnessPixel[row][col] !== undefined) {
          ctx.fillStyle = `rgb(${brightnessPixel[row][col][0]},${brightnessPixel[row][col][1]}, ${brightnessPixel[row][col][2]})`;
          ctx.fillStyle = `rgb(${brightnessPixel[row][col][3]}, ${brightnessPixel[row][col][3]}, ${brightnessPixel[row][col][3]})`;
        } else {
          ctx.fillStyle = "white";
        }
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /**
     *
     * @param darkness 0 to 100, will darken the pixels;
     * @param contrast -100 to 100, used for alpha value of pixel;
     */
    const imageSetup = (darkness = 0, contrast = 0) => {
      particlesArray = [];
      for (let i = 0; i < nrOfParticles; i++) {
        particlesArray.push(new Particle());
      }
      brightnessPixel = [];
      const brightness = darkness * -1;
      drawImageProp(ctx, imgRef.current);
      let scannedImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let scannedData = scannedImg.data;
      let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

      for (let y = 0; y < canvas.height; y++) {
        let row = [];
        for (let x = 0; x < canvas.width; x++) {
          const red = scannedData[y * 4 * canvas.width + x * 4];
          const green = scannedData[y * 4 * canvas.width + (x * 4 + 1)];
          const blue = scannedData[y * 4 * canvas.width + (x * 4 + 2)];
          const averageValue = truncateColor(
            factor *
              ((red + green + blue) / 3 + 255 * (brightness / 100) - 128.0) +
              128.0
          );
          // scannedData[y * 4 * canvas.width + x * 4] = averageValue;
          // scannedData[y * 4 * canvas.width + (x * 4 + 1)] = averageValue;
          // scannedData[y * 4 * canvas.width + (x * 4 + 2)] = averageValue;
          row.push([red, green, blue, averageValue]);
        }
        brightnessPixel.push(row);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      console.log(canvas.width, canvas.height, brightnessPixel);
    };

    imageSetup(0, 100);

    const animate = () => {
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = "rgb(0, 0, 0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < nrOfParticles; i++) {
        particlesArray[i].update();
        ctx.globalAlpha = (3.5 - particlesArray[i].speed + 0.1) / 5;
        particlesArray[i].draw();
      }
      animateRequest = window.requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <Page metadata={{ title: "iamjohnhult | Welcome" }}>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Flex
          ref={heroRef}
          sx={{
            height: "60%",
            width: "90%",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Flex sx={{ flexDirection: "column", alignItems: "center" }}>
            <Heading variant="h1" sx={{ color: "yellow" }}>
              I am John Hult
            </Heading>
            <Heading variant="h2" sx={{ color: "yellow" }}>
              <span>web developer</span> & <span>3d artist</span>
            </Heading>
          </Flex>
          {imageLoaded && heroRef.current && (
            <Canvas
              sx={{ ...absDefault, zIndex: "-1" }}
              draw={setupCanvas}
              size={{
                x: heroRef.current.clientWidth,
                y: heroRef.current.clientHeight,
              }}
            />
          )}
        </Flex>
      </Flex>
    </Page>
  );
};

export default HomeView;
