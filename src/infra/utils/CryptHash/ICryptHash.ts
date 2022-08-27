export default interface ICryptHash {
    create(payload: string): Promise<string>;
    compare(payload: string, hashCompare: string): Promise<boolean>;
  }
  