const time = {
  handleTransTime: (timeSec) => {
    const sec = Math.floor(timeSec % 60);
    const min = Math.floor((timeSec - sec)/60);
    return {
      sec,
      min
    }
  },

  handleTransCreateTime: (timeStr) => {
    const transTime = new Date(timeStr);
    const passTime = (transTime.getTime() - Date.now())/1000;
    const time = {
      day: -Math.floor(passTime/60/60/24),
      hour: -Math.floor(passTime/60/60),
      minute: -Math.floor(passTime/60)
    }
    if(time.minute < 60) return {unit: 'minutes', time: time.minute}
    if(time.minute >= 60 && time.hour < 24) return {unit: 'hours', time: time.hour}
    if(time.hour >= 24) return {unit: 'days', time: time.day}
  }
}

export default time;

