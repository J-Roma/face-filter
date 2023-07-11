const mouthLandmarks = [
  [0, 267],
  [267, 269],
  [269, 270],
  [270, 409],
  [409, 291],
  [291, 375],
  [375, 321],
  [321, 405],
  [405, 314],
  [314, 17],
  [17, 84],
  [84, 181],
  [181, 91],
  [91, 146],
  [146, 61],
  [61, 185],
  [185, 40],
  [40, 39],
  [39, 37],
  [37, 0],
];
const mouthLandmarksx2 = [
  [164, 393],
  [393, 391],
  [391, 322],
  [322, 410],
  [410, 287],
  [287, 273],
  [273, 335],
  [335, 406],
  [406, 313],
  [313, 18],
  [18, 83],
  [83, 182],
  [182, 106],
  [106, 43],
  [43, 57],
  [57, 185],
  [186, 92],
  [92, 165],
  [165, 167],
  [167, 164],
];
const scaledKeypoints = (keypoints) => {
  const scaledMesh = keypoints?.map((cord) => {
    return [cord.x, cord.y];
  });
  return scaledMesh;
};

export const bigMouth = (ctx, video, faces, tf) => {
  faces.forEach((element) => {
    const scaledMesh = scaledKeypoints(element.keypoints);
    /* console.log(scaledMesh[27][1]); */
    let lTop = scaledMesh[0][1];
    let lLeft = scaledMesh[57][0];
    let lBot = scaledMesh[18][1];
    let lRig = scaledMesh[287][0];
    let lWid = lRig - lLeft;
    let lHei = lBot - lTop;
    ctx.clearRect(0, 0, ctx.width, ctx.height);

    ctx.drawImage(
      video,
      lLeft,
      lTop,
      lWid,
      lHei,
      lLeft - lWid * 0.5,
      lTop - lHei * 0.5,
      2 * lWid,
      2 * lHei
    );
  });
};

export const bigMouth2 = (ctx, video, faces, tf) => {
  // We're taking the X coordinates of the upper lip (which we assume are equal with lower lip)
  // And the Y coordinates of the upper and lower lip
  /*   const TopYs = lipsUpperOuter.map((elem) => elem[1]);
  const BotYs = lipsLowerOuter.map((elem) => elem[1]); */
  ctx.drawImage(video, 0, 0, video.width, video.height);
  faces.forEach((element) => {
    const scaledMesh = scaledKeypoints(element.keypoints);
    let lTop = scaledMesh[0][1];
    let lLeft = scaledMesh[57][0];
    let lBot = scaledMesh[18][1];
    let lRig = scaledMesh[287][0];
    let lWid = lRig - lLeft;
    let lHei = lBot - lTop;

    let lips = ctx.getImageData(
      lLeft - lWid * 0.05,
      lTop - lHei * 0.05,
      lWid + lWid * 0.1,
      lHei + lHei * 0.1
    );
    const lipsUpsideDown = tf.browser.fromPixels(lips, 4).reverse(0);

    let lips2x = tf.image.resizeBilinear(lipsUpsideDown, [
      lipsUpsideDown.shape[0] * 2,
      lipsUpsideDown.shape[1] * 2,
    ]);
    lips2x = lips2x.asType("int32");
    console.log("DRAW", lips2x);

    let tmpIm = new ImageData(lips2x.shape[1], lips2x.shape[0]);
    tmpIm.data.set(lips2x.dataSync());
    ctx.putImageData(
      tmpIm,
      Math.round(lLeft - tmpIm.width * 0.25),
      Math.round(lTop - tmpIm.height * 0.25)
    );

    // Clean up the memory from our Tensors
    lipsUpsideDown.dispose();
    lips2x.dispose();
  });
};

export const elipse = (ctx, video, faces, tf) => {
  ctx.drawImage(video, 0, 0, video.width, video.height);

  faces.forEach((element) => {
    const scaledMesh = scaledKeypoints(element.keypoints);
    /* console.log(scaledMesh[27][1]); */
    let lTop = scaledMesh[0][1];
    let lLeft = scaledMesh[57][0];
    let lBot = scaledMesh[18][1];
    let lRig = scaledMesh[287][0];
    let lWid = lRig - lLeft;
    let lHei = lBot - lTop;
    ctx.beginPath();
    ctx.ellipse(
      (lRig + lLeft) / 2,
      (lTop + lBot) / 2,
      lHei,
      lWid,
      Math.PI / 2,
      0,
      2 * Math.PI
    );
    /* ctx.closePath();
     */
    ctx.stroke();
    /*  ctx.clip(); */
  });
};

export const lens = (ctx, video, faces, tf) => {
  faces.forEach((e) => {
    const scaledMesh = scaledKeypoints(e.keypoints);
    /* mouthLandmarks.forEach((cord) => {
      console.log("ML", scaledMesh[cord[1]][0], scaledMesh[cord[1]][1]);
    }); */
    ctx.beginPath();
    ctx.moveTo(
      scaledMesh[mouthLandmarksx2[0][0]][0],
      scaledMesh[mouthLandmarksx2[0][1]][1]
    );
    mouthLandmarksx2.forEach((cord) => {
      ctx.lineTo(scaledMesh[cord[0]][0], scaledMesh[cord[0]][1]);
      ctx.lineTo(scaledMesh[cord[1]][0], scaledMesh[cord[1]][1]);
    });
    ctx.closePath();
    ctx.clip();
    // TRY MOUTH
    let lTop = scaledMesh[0][1];
    let lLeft = scaledMesh[57][0];
    let lBot = scaledMesh[18][1];
    let lRig = scaledMesh[287][0];
    let lWid = lRig - lLeft;
    let lHei = lBot - lTop;

    ctx.drawImage(
      video,
      lLeft,
      lTop,
      lWid,
      lHei,
      lLeft - lWid * 0.5,
      lTop - lHei * 0.5,
      2 * lWid,
      2 * lHei
    );
  });
};
