export type ExperienceParams = {
  tapwowId: string
  deviceId: string
  timestamp: string
  location: { [k: string]: any }
}

export const getExperienceParams = (): ExperienceParams => {
  const params = new URLSearchParams(window.location.search);
  const location = params.get('location');
  const expanded = {
    tapwowId: params.get('tapWowTagId'),
    deviceId: params.get('deviceId'),
    timestamp: params.get('timestamp'),
    location: location ? JSON.parse(location) : null
  };
  return expanded as ExperienceParams;
}

const dirx2 = {
  getExperienceParams
}

export default dirx2