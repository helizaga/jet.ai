export interface Jet {
  id: number;
  name: string;
  wingspan: number;
  numberOfEngines: number;
  manufacturingYear: number;
}

export interface ComparisonResultsProps {
  results: { [key: string]: string };
}
