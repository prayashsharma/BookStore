interface SearchModel {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchModel) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
