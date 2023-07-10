const scaledKeypoints = (keypoints) => {
  const scaledMesh = keypoints?.map((cord) => {
    return [cord.x, cord.y];
  });
  return scaledMesh;
};

export const drawFace = async (ctx, keypoints) => {
  const scaledMesh = scaledKeypoints(keypoints);
  console.log(scaledMesh);
  ctx.fillStyle = "cyan";
  scaledMesh.forEach((pt) => {
    ctx.beginPath();
    ctx.ellipse(pt[0], pt[1], 3, 3, 0, 0, 2 * Math.PI);
    ctx.fill();
  });
  /*
   */
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

const clipForm = (ctx, r) => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 === 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};
