export default {
  addComma(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  shortenNumber(value) {
    if (isNaN(value)) {
      return '-'
    }
    if (value > 1000000000 || value < -1000000000) {
      return `${this.addComma(Math.abs(Math.round(value / 1000000000)))}B`
    } else if (value > 1000000 || value < -1000000) {
      return `${this.addComma(Math.abs(Math.round(value / 1000000)))}M`
    } else if (value > 1000 || value < -1000) {
      return `${this.addComma(Math.abs(Math.round(value / 1000)))}K`
    } else {
      return this.addComma(Math.abs(value))
    }
  },
  shortenWon(value) {
    if (isNaN(value)) {
      return '-'
    }
    if (value > 1000000000000 || value < -1000000000000) {
      return `${this.addComma(Math.abs((value / 1000000000000).toFixed(1)))}조`
    }
    else if (value > 100000000 || value < -100000000) {
      return `${this.addComma(Math.abs(Math.round(value / 100000000)))}억`
    } else if (value > 10000 || value < -10000) {
      return `${this.addComma(Math.abs(Math.round(value / 10000)))}만`
    } else if (value > 1000 || value < -1000) {
      return `${this.addComma(Math.abs(Math.round(value / 1000)))}천`
    } else {
      return this.addComma(Math.abs(value))
    }
  },

  // 문자열 
  // str.sort(ascending); 과 같은 형식으로 사용
  ascending(a, b) { return (a < b) ? -1 : (a === b) ? 0 : 1 },
  descending(a, b) { return (b < a) ? -1 : (a === b) ? 0 : 1 },
  shortenTime(time) {
    return time.slice(0, 10) +
      ' ' +
      time.slice(11, 16)
  },
  parseHtmlEntities(str) {
    return str.replace(/&#(\d+);/g, function (match, numStr) {
      const num = parseInt(numStr, 10) // read num as normal number
      return String.fromCharCode(num)
    })
  }
}
