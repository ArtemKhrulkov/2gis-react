export const showOrHidePoints = (params) => {
  if (params.length < 4) {
    params[0].show();
  } else {
    params.forEach((p, idx) => idx !== 0 && p.hide())
  }
}
