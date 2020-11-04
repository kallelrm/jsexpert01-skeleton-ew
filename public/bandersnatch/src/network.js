class Network {
  constructor({ host }) {
    this.host = host
  }

  parseManifestURL({ url, fileResolution, fileResolutionTag, hostTag }) {
    return url.replace(fileResolutionTag, fileResolution).replace(hostTag, this.host);
  }

  async getProperResolution(url) {
    const startMs = Date.now();
    const response = await fetch(url);
    await response.arrayBuffer();
    const endMs = Date.now();
    const durationInMs = (endMs - startMs);
    console.log({durationInMs})

    // ao invés de calcular o throughput, é calculado o tempo
    const resolutions = [
      // pior cenário, 20 segundos
      { start: 0, end: 0, resolution: 144 },
      // entre 1 e 3 segundo
      { start: 901, end: 3000, resolution: 360 },
      // menos de 1 segundo
      { start: 0, end: 900, resolution: 720 },
    ]

    const item = resolutions.find(item => {
      return item.start <= durationInMs && item.end >= durationInMs;
    })

    const LOWEST_RESOLUTION = 144;
    if (!item) return LOWEST_RESOLUTION;

    return item.resolution;
  }

  async fetchFile(url) {
    const response = await fetch(url)
  
    return response.arrayBuffer()
  }
}