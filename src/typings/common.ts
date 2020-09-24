export interface StatsRow {
  metric: string;
  total: number;
  color: 'red' | 'yellow' | 'green' | 'white' | 'magenta' | 'cyan';
  items?: Set<string>;
}

export type StatsName = 'operations' | 'refs' | 'tags' | 'externalDocs' | 'pathItems' | 'links' | 'schemas' | 'parameters';
export type StatsCount = Record<StatsName, StatsRow>;
