import SortColumnModel from "../../models/sortColumnModel";

interface SortIconProps {
  column: string;
  currentSortColumnModel: SortColumnModel;
}

const SortIcon = ({ column, currentSortColumnModel }: SortIconProps) => {
  if (column !== currentSortColumnModel.Column) return null;

  return currentSortColumnModel.Order === "asc" ? (
    <i className="bi bi-sort-down-alt mx-2" />
  ) : (
    <i className="bi bi-sort-up-alt mx-2" />
  );
};

export default SortIcon;
