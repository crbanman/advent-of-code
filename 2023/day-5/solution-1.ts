const input = Bun.file(Bun.argv[2]);

main(await input.text());

function main(text: string): void {
  const valueText = text.split("\n");

  let seeds: number[] = [];
  const resourceMaps: ResourceMap[] = [];
  let resourceMapIndex = 0;
  valueText.forEach((line, index) => {
    const parsed = line.split(" ").reduce((prev: number[], curr: string) => {
      const val = Number(curr);
      if (isNaN(val)) {
        return prev;
      }

      prev.push(val);
      return prev;
    }, []);

    if (index === 0) {
      seeds = parsed;
      return;
    }

    if (parsed.length === 1) {
      if (resourceMaps.length > 0) {
        resourceMapIndex++;
      }
      resourceMaps.push(new ResourceMap());
      return;
    }
    if (parsed.length === 0) {
      return;
    }

    resourceMaps[resourceMapIndex].addResourceRange(
      new ResourceRange(parsed[0], parsed[1], parsed[2])
    );
  });

  let lowest = Infinity;
  for (const seed of seeds) {
    let destination = seed;
    for (const resourceMap of resourceMaps) {
      destination = resourceMap.getSourceDestination(destination);
    }
    if (destination < lowest) {
      lowest = destination;
    }
  }

  console.log(lowest);
}

class ResourceMap {
  private resourceRanges: ResourceRange[] = [];

  public addResourceRange(resourceRange: ResourceRange): void {
    this.resourceRanges.push(resourceRange);
  }

  public getSourceDestination(source: number): number {
    for (const resourceRange of this.resourceRanges) {
      const destination = resourceRange.getDestination(source);
      if (destination !== null) {
        return destination;
      }
    }

    return source;
  }
}

class ResourceRange {
  constructor(
    private destinationRangeStart: number,
    private sourceRangeStart: number,
    private rangeLength: number
  ) {}

  public getDestination(source: number): number | null {
    if (
      source < this.sourceRangeStart ||
      source > this.sourceRangeStart + this.rangeLength - 1
    ) {
      return null;
    }

    return this.destinationRangeStart + source - this.sourceRangeStart;
  }
}
