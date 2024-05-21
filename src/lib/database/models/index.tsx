export abstract class Model {
  abstract save(): Promise<this>;
  abstract delete(): Promise<void>;
}
