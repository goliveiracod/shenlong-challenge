export interface IUUIdProvider {
  generate(): Promise<string>;
}
