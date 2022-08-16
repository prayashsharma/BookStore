type Nullable<T> = T | null;

export default interface DeleteConfirmationModel {
  show: boolean;
  entityId: Nullable<string>;
}
